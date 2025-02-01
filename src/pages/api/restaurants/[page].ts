// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Restaurant } from "../../../types";

import fs from "fs";

type ResponseType = {
  page: number;
  length: number;
  length_all_data: number;
  list_restaurant: Restaurant[];
};

const fetchRestaurantData = () => {
  const dataPath = "./src/data/restaurant.json";
  const rawData = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(rawData) as Restaurant[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const restaurantData = fetchRestaurantData();
  const lengthAllData = restaurantData.length;

  const page = typeof req.query.page === "string" ? req.query.page : "1";
  const limit = 10;
  const offset = (parseInt(page) - 1) * limit;

  const maxLengthData = offset + limit;
  const resData = restaurantData.slice(offset, maxLengthData);
  res.status(200).json({
    page: parseInt(page),
    length: limit,
    length_all_data: lengthAllData,
    list_restaurant: resData,
  });
}
