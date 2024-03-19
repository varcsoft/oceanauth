import { log } from "../utils/utils.js";
const errorHandler = (err, req, res, next) => {
    let { statusCode, message,isOperational } = err;
    // message=isOperational ? message : "Internal Server Error";
    statusCode=statusCode ? statusCode : 500;
    if(req) log(req.method,req.originalUrl);
    log(req.method,req.originalUrl,"Error",statusCode);
    console.log(err);
    res.status(statusCode).json({ message:"Error",data:message });
}

export default errorHandler;