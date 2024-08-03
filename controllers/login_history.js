import { prisma } from "../initializer/initprisma.js";
import crud from "../utils/crud.js"

let include ={};

const get = async (req, res, next) => {
    crud.get(req,res,next,prisma.login_history,include);
}

const getbyuserid = async (req, res, next) => {
    try {
        const data = await prisma.login_history.findUnique({ where: { user_id: Number(req.params.id) }, include });
        return sendresponse(res, data, 200,req);
    } catch (e) {
        next(e);
    }
}

const post = async (req, res, next) => {
    try {
        let { name,price,service,purchase_date,user_id } = req.body;
        let required = { name,price,service,purchase_date,user_id };
        crud.create(req,res,next,prisma.login_history,required,include);
    } catch (e) {
        next(e);
    }
}

export default{ get, getbyuserid, post };