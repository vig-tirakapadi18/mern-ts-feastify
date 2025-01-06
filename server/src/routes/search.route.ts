import { Router } from "express";
import { validateCityParam } from "../middlewares/validation";
import { searchRestaurants } from "../controllers/search.controller";

const router = Router();

router.route("/:city").get(validateCityParam, searchRestaurants);

export default router;
