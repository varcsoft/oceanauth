import usercontroller from "../controllers/user.js"
import auth from "../middlewares/checkAuth.js";
import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router()

router
.post("/register", usercontroller.register)
.post("/login", usercontroller.login)
.post("/restartserver", usercontroller.restartserver)
.post("/generateapptoken",usercontroller.generateapptoken)

export default router;