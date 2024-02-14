import { prisma } from "../initializer/initprisma.js";
import crud from "../utils/crud.js"

let include ={};

const get = async (req, res, next) => crud.get(req,res,next,prisma.verification,include);
const getbyid = async (req, res, next) => crud.getbyid(req,res,next,prisma.verification,include);
const deletebyid = async (req, res, next) => crud.deletebyid(req,res,next,prisma.verification,include);
const put = async (req, res, next) => crud.update(req,res,next,prisma.verification,required,include);

const post = async (req, res, next) => {
    let { user_id,v_code,ipaddress,useragent,devicetype,operatingsystem,browser } = req.body;
    let required = { name };
    crud.create(req,res,next,prisma.verification,required,include);
}

export default{ get, getbyid, post, put, deletebyid };