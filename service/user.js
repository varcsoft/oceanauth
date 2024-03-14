import { prisma } from "../initializer/initprisma.js";
import bcrypt from "bcrypt";
import ApiError from '../utils/ApiError.js';
import { checkvalues, generaterandomcode } from "../utils/utils.js";
import auth from "../middlewares/checkAuth.js";
import UAParser from 'ua-parser-js';
import { sendemails } from '../utils/sendemail.js';
import constants from '../utils/constants.js';

const salt = bcrypt.genSaltSync(10);
const include = { role: { select: { name: true } } };
async function getbyemail(email) {
    const data = await prisma.users.findUnique({ where: { email }, include });
    return data;
}

async function deleteproperties(user) {
    delete user.password;
    delete user.role_id;
    delete user.token;
    return user;
}

async function createuser(req) {
    let { email, password, address, name, status, profile_pic, role_id } = req.body;
    let user = await getbyemail(email);
    if (user) {
        throw new ApiError(400, 'user with provided email already exists in system');
    }
    const { ipaddress, useragent, devicetype, operatingsystem, browser } = getusersysdetails(req);
    const required = { email, password, name };
    checkvalues(required);
    password = bcrypt.hashSync(password, salt, null);
    status = !status ? true : status;
    role_id = !role_id ? 2 : role_id;
    const v_code = generaterandomcode();
    let data = await prisma.users.create({ data: { password, address, name, status, email, profile_pic, role_id, created_on: new Date() }, include });
    await prisma.verification.create({ data: { user_id: data.id, ipaddress, useragent, devicetype, operatingsystem, browser, v_code, date: new Date() } });
    const emaildata = {
        subject: "Verification Code By Varcsoft",
        body: constants.verificationtemplate.replace("{{v_code}}", v_code).replace("{{email}}", email).replace("{{user}}", name)
    };
    await sendemails([email], [emaildata]);
    let token;
    ({ token, data } = await gettoken(data));
    delete data.role;
    return { vtoken: token, user: data };
}

async function verify(req) {
    let { v_code, email } = req.body;
    let user = await getbyemail(email);
    if (!user) {
        throw new ApiError(400, 'user with provided email does not exist in system');
    }
    const user_id = Number(user.id);
    let data = await prisma.verification.findFirst({ where: { user_id,v_code } });
    if (!data) {
        throw new ApiError(400, 'v_code is invalid');
    }
    await prisma.verification.update({ data: { verified: true }, where: { id: data.id } });
    let token;
    ({ token, data } = await gettoken(user));
    delete data.role;
    return { vtoken: token, user: data };
}

async function gettoken(data) {
    const token = auth.getToken(data.email, data.id, data.role_id);
    data = await prisma.users.update({ where: { id: data.id }, data: { token: token } });
    data = await deleteproperties(data);
    return { token, data };
}

async function login(req) {
    const { email, password } = req.body;
    const { ipaddress, useragent, devicetype, operatingsystem, browser } = getusersysdetails(req);
    const user = await getbyemail(email);
    if (!user) {
        throw new ApiError(400, 'user with provided email does not exists in system');
    }
    if (!bcrypt.compareSync(password, user.password)) {
        throw new ApiError(400, 'password is incorrect');
    }
    await prisma.login_history.create({ data: { user_id: user.id, ipaddress, useragent, devicetype, operatingsystem, browser } });
    let token, data;
    ({ token, data } = await gettoken(user));
    return { otoken: token };
}

function getusersysdetails(req) {
    const ipaddress = req.connection.remoteAddress || req.socket.remoteAddress;
    const useragent = req.get('User-Agent');
    const parser = new UAParser(useragent);
    const result = parser.getResult();
    const operatingsystem = result.os.name || 'Unknown';
    const devicetype = result.device.type || 'Unknown';
    const browser = result.browser.name || 'Unknown';
    return { ipaddress, useragent, devicetype, operatingsystem, browser };
}

async function deleteuser(req, id) {
    let user = await getuser(id);
    checkuser(user);
    user = await prisma.users.delete({ where: { id: Number(user.id) } });
    return await deleteproperties(user);
}

async function updateuser(req, id) {
    let user = await getuser(id);
    checkuser(user);
    let { email, password, address, name, status, profile_pic, role_id } = req.body;
    if (password) {
        password = bcrypt.hashSync(password, salt, null);
    }
    user = await prisma.users.update({ where: { id: Number(user.id) }, data: { email, password, address, name, status, profile_pic, role_id } });
    return await deleteproperties(user);
}

async function getuser(id) {
    let user = await prisma.users.findUnique({ where: { id: Number(id) } });
    if (user) {
        delete user.password;
    }
    return await deleteproperties(user);
}

async function getallusers(req) {
    const data = await prisma.users.findMany({ where: { role_id:Number(req.query.role_id) } });
    for (let i = 0; i < data.length; i++) {
        data[i] = await deleteproperties(data[i]);
    }
    return data;
}

function checkuser(user) {
    if (!user) {
        throw new ApiError(400, 'user not found');
    }
}

async function forgotpassword(email) {
    if (!email) {
        throw new ApiError(400, 'Provide email to send link to reset password link');
    }
    let user = await getbyemail(email);
    if (user) {
        throw new ApiError(400, 'user with provided email does not exist in system');
    }
    const token = auth.getToken(phone, user.id, user.role_id, 10);
    await prisma.users.update({ where: { id: parseInt(user.id) }, data: { token } });
    return token;
}

async function resetpassword(password, id) {
    if (!password) {
        throw new ApiError(400, 'Provide password to reset');
    }
    password = bcrypt.hashSync(password, salt, null);
    await prisma.users.update({ where: { id: parseInt(id) }, data: { password } });
}

const generateapptoken = async (req, res, next) => {
    try {
        const token = auth.generateapptoken();
        return sendresponse(res, data, 200, req);
    } catch (e) {
        next(e);
    }
}

export default { generateapptoken,verify, getbyemail, createuser, login, deleteuser, getuser, updateuser, getallusers, forgotpassword, resetpassword };