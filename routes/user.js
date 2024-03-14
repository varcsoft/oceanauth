import usercontroller from "../controllers/user.js"
import express from "express";
const router = express.Router()

router
  .get('/', usercontroller.get)
  .get('/profile/:id', usercontroller.getprofile)
  .put("/profile/:id", usercontroller.updateprofile)
  .delete("/profile/:id", usercontroller.deleteprofile)
  .get('/verifytoken', usercontroller.verifyuser)
  .put('/:id', usercontroller.put)
  .delete('/:id', usercontroller.deletebyid)

export default router;