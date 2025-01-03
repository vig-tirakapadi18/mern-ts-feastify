import { Router } from "express";
import { createUser, updateUser } from "../controllers/user.controller";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const router = Router();

router.route("/").post(jwtCheck, createUser);
router.route("/update-user").put(jwtCheck, jwtParse, updateUser);

export default router;
