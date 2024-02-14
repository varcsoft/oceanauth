import usercontroller from "../controllers/user.js"
import express from "express";
const router = express.Router()

router
  .get('/', usercontroller.get)
  .get('/profile', usercontroller.getprofile)
  .put("/profile", usercontroller.updateprofile)
  .delete("/profile", usercontroller.deleteprofile)
  .put('/:id', usercontroller.put)
  .delete('/:id', usercontroller.deletebyid)

export default router;