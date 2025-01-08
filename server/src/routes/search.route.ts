import { Router } from "express";
import { validateParam } from "../middlewares/validation";
import { searchRestaurants } from "../controllers/search.controller";

const router = Router();

router.route("/:city").get(validateParam("city"), searchRestaurants);

export default router;
