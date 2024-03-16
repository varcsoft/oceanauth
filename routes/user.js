import usercontroller from "../controllers/user.js"
import express from "express";
import auth from "../middlewares/checkAuth.js";

const router = express.Router();

router
  .get('/',auth.checkapptoken, usercontroller.get)
  .get('/profile/:id',auth.checkapptoken, usercontroller.getprofile)
  .put("/profile/:id",auth.checkapptoken, usercontroller.updateprofile)
  .delete("/profile/:id",auth.checkapptoken, usercontroller.deleteprofile)
  .get('/verifytoken',auth.checkToken, usercontroller.verifyuser)
  .put('/:id',auth.checkapptoken, usercontroller.put)
  .delete('/:id',auth.checkapptoken, usercontroller.deletebyid)

export default router;