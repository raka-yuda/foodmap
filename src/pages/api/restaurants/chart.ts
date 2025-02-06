// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChartData, Restaurant } from "../../../types";

import fs from "fs";

type ResponseType = {
  group_by: string | string[];
  data: ChartData[];
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
  const { group_by = "rating" } = req.query;
  const restaurantData = fetchRestaurantData();
  let data: ChartData[] = [];

  if (group_by === "rating") {
    for (let i = 1; i <= 5; i++) {
      const group: ChartData = {
        name: `With an overall rating of ${i - 1} - ${i}`,
        rating: i,
        value: 0,
      };
      data = data.concat(group);
    }

    restaurantData.forEach((restaurant, index) => {
      const rating = parseFloat(restaurant.rating.overall);
      data.forEach((group, indexGroup) => {
        if (rating >= 0 && rating <= 1 && group.rating === 1) {
          data[indexGroup] = { ...data[indexGroup], value: group.value + 1 };
        } else if (rating > 1 && rating <= 2 && group.rating === 2) {
          data[indexGroup] = { ...data[indexGroup], value: group.value + 1 };
        } else if (rating > 2 && rating <= 3 && group.rating === 3) {
          data[indexGroup] = { ...data[indexGroup], value: group.value + 1 };
        } else if (rating > 3 && rating <= 4 && group.rating === 4) {
          data[indexGroup] = { ...data[indexGroup], value: group.value + 1 };
        } else if (rating > 4 && rating <= 5 && group.rating === 5) {
          data[indexGroup] = { ...data[indexGroup], value: group.value + 1 };
        }
      });
    });
  }

  res.status(200).json({
    group_by,
    data,
  });
}
