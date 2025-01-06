import { Request, Response } from "express";
import {
  CODE_200,
  CODE_404,
  ERROR_SEARCH_RESTAURANTS,
  RESTAURANT_GET_SUCCESS,
} from "../utils/constants";
import { FilterQuery } from "mongoose";
import Restaurant from "../models/restaurant.model";

export const searchRestaurants = async (req: Request, res: Response) => {
  const { city } = req.params;

  const searchQuery = (req.query.searchQuery as string) || "";
  const selectedCuisines = (req.query.selectedCuisines as string) || "";
  const sortOption = (req.query.sortOption as string) || "lastUpdated";
  const page = parseInt(req.query.page as string) || 1;

  let query: FilterQuery<typeof Restaurant> = {};

  query["city"] = new RegExp(city, "i");

  try {
    const cityCheck = await Restaurant.countDocuments(query);

    if (cityCheck === 0) {
      res.status(CODE_404).json({
        success: true,
        response: {
          data: [],
          pagination: {
            totalRestaurants: 0,
            page: 1,
            pages: 1,
          },
        },
        message: `No restaurants found for ${city}!`,
      });
      return;
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        {
          restaurantName: searchRegex,
        },
        {
          cuisines: { $in: [searchRegex] },
        },
      ];
    }

    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const totalRestaurants = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        totalRestaurants,
        page,
        pages: Math.ceil(totalRestaurants / pageSize),
      },
    };

    res
      .status(CODE_200)
      .json({ success: true, response, message: RESTAURANT_GET_SUCCESS });
  } catch (error) {
    console.log("SEARCH RESTAURANT", error);
    res.status(500).json({ message: ERROR_SEARCH_RESTAURANTS });
  }
};
