import usercontroller from "../controllers/user.js"
import express from "express";
import auth from "../middlewares/checkAuth.js";

const router = express.Router();

router
  .get('/', usercontroller.get)
  .get('/profile/:id',auth.checkapptoken, usercontroller.getprofile)
  .put("/profile/:id",auth.checkapptoken, usercontroller.updateprofile)
  .delete("/profile/:id",auth.checkapptoken, usercontroller.deleteprofile)
  .get('/verifytoken', usercontroller.verifyuser)
  .put('/:id', usercontroller.put)
  .delete('/:id', usercontroller.deletebyid)

export default router;