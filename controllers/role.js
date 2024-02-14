import { prisma } from "../initializer/initprisma.js";
import crud from "../utils/crud.js"

let include ={};

const get = async (req, res, next) => {
    crud.get(req,res,next,prisma.role,include);
}

const getbyid = async (req, res, next) => {
    crud.getbyid(req,res,next,prisma.role,include);
}

const post = async (req, res, next) => {
    let { name } = req.body;
    let required = { name };
    crud.create(req,res,next,prisma.role,required,include);
}

const put = async (req, res, next) => {
    crud.update(req,res,next,prisma.role,include);
}

const deletebyid = async (req, res, next) => {
    crud.deletebyid(req,res,next,prisma.role,include);
}

export default{ get, getbyid, post, put, deletebyid };