import ApiError from '../utils/ApiError.js';

function checkvalues(required) {
    if (Object.values(required).includes(undefined)) {
        throw new ApiError(400, 'Please provide required values '+Object.keys(required).toString());
    }
}

function sendresponse(res, data, status,req) {
    console.log(data);
    log(req.method,req.originalUrl);
    return res.status(status).json({ "message": "success", "data": data, "count":data==null ? 0 : data.length });
}

function log(type,url) {
    type=type?type:"UNDEFINED";
    url=url?url:"UNDEFINED";
    console.log("REQUEST TYPE : "+type);
    console.log("URL : "+url);
}

function generaterandomcode() {
    const code = Math.floor(100000 + Math.random() * 900000); // Generates a 4-digit code
    return code.toString();
}

export { checkvalues, sendresponse,log,generaterandomcode };