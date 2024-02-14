import { log } from "../utils/utils.js";
const errorHandler = (err, req, res, next) => {
    let { statusCode, message,isOperational } = err;
    console.log(err);
    message=isOperational ? message : "Internal Server Error";
    statusCode=statusCode ? statusCode : 500;
    statusCode=statusCode ? statusCode : 500;
    if(req) log(req.method,req.originalUrl);
    res.json({ message: message, status: statusCode });
}

export default errorHandler;