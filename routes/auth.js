import usercontroller from "../controllers/user.js"
import auth from "../middlewares/checkAuth.js";
import express from "express";
const router = express.Router()

router
.post("/register", usercontroller.register)
.post("/login", usercontroller.login)
.post("/generateapptoken",usercontroller.generateapptoken)

export default router;