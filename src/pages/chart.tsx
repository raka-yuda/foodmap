import { useEffect, useRef, useState } from "react";
import { BarChart, MainTable, PieChart } from "../components";

import {
  fetchRestaurants,
  RestaurantState,
} from "../redux/slices/restaurant-slice";

import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../layouts/dashboard-layout";
import { fetchChart, ChartState } from "../redux/slices/chart-slice";
import { ThemeState } from "@/redux/slices/theme-slice";

const Chart = () => {
  const { themeVariant }: ThemeState = useSelector(
    (state: RootState) => state.theme
  );

  const { chart }: ChartState = useSelector((state: RootState) => state.chart);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchChart({ group_by: "rating" }));
  }, [dispatch]);

  return (
    <>
      {themeVariant === "default" &&   
        <DashboardLayout titlePage={"chart | Foodmap"} variant={"default"}>
          <div className={`flex flex-col`}>
            <div className="md:grid md:grid-cols-4 md:gap-3 my-2">
              <figure className="col-span-2 shadow-2xl bg-white rounded-md my-2 bg-cover h-auto w-auto p-4">
                <p className={`text-lg font-bold p-4`}>
                  Chart of Restaurant Overall Rating
                </p>
                {chart && (
                  <PieChart
                    data={chart.data}
                    title={`Restaurants`}
                    unit={`Restaurants`}
                  />
                )}
              </figure>
              <figure className="col-span-2 shadow-2xl bg-white rounded-md my-2 bg-cover h-auto w-auto p-4">
                <p className={`text-lg font-bold p-4`}>
                  Chart of Restaurant Overall Rating
                </p>
                {chart && (
                  <BarChart
                    data={chart.data}
                    title={`Restaurants`}
                    unit={`Restaurants`}
                  />
                )}
              </figure>
            </div>
          </div>
        </DashboardLayout>
      }

      {themeVariant === "rounded" &&    
        <DashboardLayout titlePage={"Chart | Foodmap"} variant={"rounded"}>
          <div className={`w-full md:p-8 p-4`}>
            <div className="grid grid-cols-4 md:gap-6 gap-4">
              <figure className="col-span-4 md:col-span-2 shadow-2xl bg-white rounded-2xl my-2 bg-cover h-auto w-auto p-4">
                <p className={`text-lg font-bold p-4`}>
                  Chart of Restaurant Overall Rating
                </p>
                {chart && (
                  <PieChart
                    data={chart.data}
                    title={`Restaurants`}
                    unit={`Restaurants`}
                  />
                )}
              </figure>
              <figure className="col-span-4 md:col-span-2 shadow-2xl bg-white rounded-2xl my-2 bg-cover h-auto w-auto p-4">
                <p className={`text-lg font-bold p-4`}>
                  Chart of Restaurant Overall Rating
                </p>
                {chart && (
                  <BarChart
                    data={chart.data}
                    title={`Restaurants`}
                    unit={`Restaurants`}
                  />
                )}
              </figure>
            </div>
          </div>
        </DashboardLayout>
      }
    </>

    // <DashboardLayout titlePage={"Chart | Foodmap"}>
    //   <div className={`flex flex-col`}>
    //     <div className="md:grid md:grid-cols-4 md:gap-3 my-2">
    //       <figure className="col-span-2 shadow-2xl bg-white rounded-md my-2 bg-cover h-auto w-auto p-4">
    //         <p className={`text-lg font-bold p-4`}>
    //           Chart of Restaurant Overall Rating
    //         </p>
    //         {chart && (
    //           <PieChart
    //             data={chart.data}
    //             title={`Restaurants`}
    //             unit={`Restaurants`}
    //           />
    //         )}
    //       </figure>
    //       <figure className="col-span-2 shadow-2xl bg-white rounded-md my-2 bg-cover h-auto w-auto p-4">
    //         <p className={`text-lg font-bold p-4`}>
    //           Chart of Restaurant Overall Rating
    //         </p>
    //         {chart && (
    //           <BarChart
    //             data={chart.data}
    //             title={`Restaurants`}
    //             unit={`Restaurants`}
    //           />
    //         )}
    //       </figure>
    //     </div>
    //   </div>
    // </DashboardLayout>
  );
};

export default Chart;
