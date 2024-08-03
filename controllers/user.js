import { sendresponse } from "../utils/utils.js";
import userservice from "../service/user.js";

const get = async (req, res, next) => {
    try {
        let data = await userservice.getallusers(req);
        return sendresponse(res, data, 200,req);
    } catch (e) {
        next(e);
    }
}

const put = async (req, res, next) => {
    try {
        let data = await userservice.updateuser(req, req.params.id);
        return sendresponse(res, data, 200,req);
    } catch (e) {
        next(e);
    }
}

const deletebyid = async (req, res, next) => {
    try {
        let data = await userservice.deleteuser(req, req.params.id);
        return sendresponse(res, data, 200,req);
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const data=await userservice.login(req);
        return sendresponse(res, data, 200,req);
    } catch (e) {
        next(e);
    }
}

const register = async (req, res, next) => {
    try {
        let data= await userservice.createuser(req);
        return sendresponse(res, data, 200,req);
    } catch (e) {
        next(e);
    }
}

const forgotpassword = async (req, res, next) => {
    try {
        let { email } = req.body;
        const reset_token=await userservice.forgotpassword(email);
        return sendresponse(res, { reset_token }, 200,req);
    } catch (e) {
        next(e);
    }
}

const resetpassword = async (req, res, next) => {
    try {
        let { password } = req.body;
        await userservice.resetpassword(password, req.user.id);
        return sendresponse(res, {}, 200,req);
    } catch (e) {
        next(e);
    }
}

const getprofile = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const data = await userservice.getuser(req.params.id);
        return sendresponse(res, data, 200,req);
    } catch (e) {
        next(e);
    }
}

const updateprofile = async (req, res, next) => {
    try {
        let data = await userservice.updateuser(req, req.params.id);
        return sendresponse(res, data, 200,req);
    } catch (e) {
        next(e);
    }
}

const deleteprofile = async (req, res, next) => {
    try {
        let data = await userservice.deleteuser(req, req.params.id);
        return sendresponse(res, data, 200,req);
    } catch (e) {
        next(e);
    }
}

const verifyuser = async (req, res, next) => {
    try {
        console.log("hii");
        const data = await userservice.getuser(req.user.id);
        return sendresponse(res, data, 200,req);
    } catch (e) {
        next(e);
    }
}

const generateapptoken = async (req, res, next) => {
    try {
        const data = await userservice.generateapptoken(req);
        return sendresponse(res, data, 200,req);
    } catch (e) {
        next(e);
    }
}

export default { generateapptoken,verifyuser,get, put, deletebyid, getprofile, updateprofile, deleteprofile, register, login, forgotpassword, resetpassword };