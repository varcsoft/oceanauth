import usercontroller from "../controllers/user.js"
import express from "express";
import auth from "../middlewares/checkAuth.js";

const router = express.Router();
router.use(auth.checkapptoken);

router
  .get('/', usercontroller.get)
  .get('/profile/:id', usercontroller.getprofile)
  .put("/profile/:id", usercontroller.updateprofile)
  .delete("/profile/:id", usercontroller.deleteprofile)
  .get('/verifytoken', usercontroller.verifyuser)
  .put('/:id', usercontroller.put)
  .delete('/:id', usercontroller.deletebyid)

export default router;