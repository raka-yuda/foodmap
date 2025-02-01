import type { NextApiRequest, NextApiResponse } from "next";
import { Restaurant } from "../../../types";

import fs from "fs";

type ResponseType = {
  length: number;
  length_all_data: number;
  list_restaurant: Restaurant[];
};

type RequestType = {
  page: number;
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

  res.status(200).json({
    length: lengthAllData,
    length_all_data: lengthAllData,
    list_restaurant: restaurantData,
  });
}
