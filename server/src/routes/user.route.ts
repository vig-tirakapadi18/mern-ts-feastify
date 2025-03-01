import { Router } from "express";
import {
  createUser,
  getLoggedInUser,
  updateUser,
} from "../controllers/user.controller";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateUserRequest } from "../middlewares/validation";

const router = Router();

router
  .route("/")
  .get(jwtCheck, jwtParse, getLoggedInUser)
  .post(jwtCheck, createUser);

router
  .route("/update-user")
  .put(jwtCheck, jwtParse, validateUserRequest, updateUser);

export default router;
