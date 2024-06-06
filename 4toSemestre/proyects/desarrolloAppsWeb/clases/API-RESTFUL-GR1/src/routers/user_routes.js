import Router from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/user_controller.js";

const router = Router();

router.post("/users/register", registerUserController); //TODO (PATH, CONTROLLER)

router.post("/users/login", loginUserController); //TODO (PATH, CONTROLLER)

export default router;
