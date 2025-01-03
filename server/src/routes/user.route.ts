import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { jwtCheck } from "../middlewares/auth";

const router = Router();

router.route("/").post(jwtCheck, createUser);

export default router;
