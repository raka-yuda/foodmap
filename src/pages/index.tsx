import { useEffect, useState } from "react";
import {
  BarChart,
  MainTable,
  PieChart,
  SmallCard,
} from "../components";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const LeafletMap = dynamic(() => import('@/components/map/leaflet-map'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})

import {
  fetchRestaurants,
  RestaurantState,
} from "../redux/slices/restaurant-slice";


import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../layouts/dashboard-layout";
import { fetchChart, ChartState } from "../redux/slices/chart-slice";


import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { LatLngTuple } from "leaflet";
import { ThemeState } from "@/redux/slices/theme-slice";

const Dashboard = () => {
  const { themeVariant }: ThemeState = useSelector(
    (state: RootState) => state.theme
  );

  const { restaurants }: RestaurantState = useSelector(
    (state: RootState) => state.restaurants
  );

  const nameRestaurants = restaurants.list_restaurant.map(
    (restaurant: any) => restaurant.name_breadcrumb
  );

  const { chart }: ChartState = useSelector((state: RootState) => state.chart);

  const headerTable = [
    "Name",
    "Location",
    "City",
    "Province",
    "Rating",
    "Cuisine",
    "Payment",
  ];

  const [dataTable, setDataTable] = useState<any>([]);

  const [pagingtable, setPagingtable] = useState<any>({});

  const dispatch = useDispatch<AppDispatch>();

  const cuisineToEmoji: any = {
    "Barat": "🍔",
    "Italia": "🍕",
    "Jepang": "🍣",
    "India": "🍛", 
    "China": "🥡",
    "Indonesia": "🍲",
    "Bubble Tea": "🧋",
    "Dessert": "🍰",
    "Puding": "🍮",
    "Es Krim": "🍦",
    "Toko Roti dan Kue": "🍞🍰",
    "Toko Roti": "🍞🍰",
    "Arab/Timur Tengah": "🥙",
    "Snack": "🍿",
    "Minuman": "🥤", 
    "Waffle": "🧇",
    "Kafe": "☕",
    "Crepes": "🥞",
  };
  

  useEffect(() => {
    if (restaurants.list_restaurant.length !== 0) {
      let tempRestaurants: any = [];
      restaurants.list_restaurant.forEach((restaurant) => {
        let tempDataTable = {
          name: restaurant.name_breadcrumb,
          location: restaurant.location,
          city: restaurant.city,
          province: restaurant.province,
          rating: restaurant.rating.overall,
          cuisine: restaurant.cuisinetype.replace(/[\[\]]/g, "").split(",").map(item => item.trim()).map(type => cuisineToEmoji[type] || type),
          payment: restaurant.payment_method.join(", "),
        };
        tempRestaurants = tempRestaurants.concat(tempDataTable);
      });

      setPagingtable((prevState: any) => {
        return {
          ...prevState,
          page: restaurants.page,
          length: restaurants.length,
          length_all_data: restaurants.length_all_data,
        };
      });
      setDataTable([...tempRestaurants]);
    }
  }, [restaurants]);

  useEffect(() => {
    dispatch(fetchChart({ group_by: "rating" }));
  }, []);

  useEffect(() => {
    dispatch(fetchRestaurants({ page: 1 }));
  }, []);

  const fetchDataHandler = (page: number) => {
    dispatch(fetchRestaurants({ page: page }));
  };

  interface Restaurant {
    id: number
    name: string
    coords: LatLngTuple
    rating: number
  };

  const restaurantMarkers: Restaurant[] = restaurants.list_restaurant.map((restaurant, index) => ({
    id: index,
    name: restaurant.name,
    coords: [
      restaurant.geometry.lat,
      restaurant.geometry.lng,
    ] as LatLngTuple,
    rating: Number(restaurant.rating.overall),
  }));

  return (
    <>
      {themeVariant === "default" &&   
        <DashboardLayout titlePage={"Home | Foodmap"} variant={"default"}>
          <div className={`flex flex-col w-full p-4`}>
            <div className="md:grid md:grid-cols-4 md:gap-3 ">
              <figure className="col-span-3 shadow-2xl bg-white rounded-md  bg-cover h-auto w-auto p-4">
                <p className={`text-lg font-bold p-4`}>GIS MAP</p>
              </figure>
              <figure className="col-span-1 shadow-2xl bg-white rounded-md  bg-cover h-auto w-auto px-4 pt-4">
                <p className={`text-lg font-bold p-4`}>List of Restaurant</p>
                <div className={`flex h-72 flex-col overflow-auto px-2 pb-4`}>
                  {nameRestaurants &&
                    nameRestaurants.map((name, index) => {
                      return <SmallCard key={`small-card-${index}`} title={name} />;
                    })}
                </div>
              </figure>
              <figure className="col-span-4 shadow-2xl bg-white rounded-md  bg-cover overflow-auto">
                <p className={`text-lg font-bold p-4`}>
                  Table of Restaurant located in Jakarta
                </p>
                <MainTable
                  headerTable={headerTable}
                  dataTable={dataTable}
                  dataPaging={pagingtable}
                  hrefPaging={fetchDataHandler}
                />
              </figure>
              <figure className="col-span-2 shadow-2xl bg-white rounded-md  bg-cover h-auto w-auto p-4">
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
              <figure className="col-span-2 shadow-2xl bg-white rounded-md  bg-cover h-auto w-auto p-4">
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
        <DashboardLayout titlePage={"Home | Foodmap"} variant={"rounded"}>
          <div className={`w-full md:p-8 p-4`}>
            <div className="grid grid-cols-4 md:gap-6 gap-4">
              <figure className="col-span-4 md:col-span-3 min-w-[64px] h-[420px] shadow-2xl bg-white rounded-2xl  bg-cover p-4">
                <p className={`text-lg font-bold p-4`}>Map Pinpoints</p>
                <LeafletMap className={""} restaurants={restaurantMarkers}/>
              </figure>
              <figure className="col-span-4 md:col-span-1 shadow-2xl bg-white rounded-2xl h-[420px] w-auto px-4 pt-4">
                <div className="flex flex-col h-full">
                  <p className="text-lg font-bold p-4 flex-none">List of Restaurant</p>
                  <div className="flex-1 overflow-y-auto px-2 pb-4">
                    {nameRestaurants?.map((name, index) => (
                      <SmallCard key={`small-card-${index}`} title={name} />
                    ))}
                  </div>
                </div>
              </figure>
              <figure className="col-span-4 shadow-2xl bg-white rounded-2xl  bg-cover overflow-auto pt-4">
                <p className={`text-lg font-bold py-4 px-8`}>
                  Table of Restaurant located in Jakarta
                </p>
                <MainTable
                  headerTable={headerTable}
                  dataTable={dataTable}
                  dataPaging={pagingtable}
                  hrefPaging={fetchDataHandler}
                />
              </figure>
              <figure className="col-span-4 md:col-span-2 shadow-2xl bg-white rounded-2xl  bg-cover h-auto w-auto p-4">
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
              <figure className="col-span-4 md:col-span-2 shadow-2xl bg-white rounded-2xl  bg-cover h-auto w-auto p-4">
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
              {/* <div className="p-4 bg-white rounded-lg">
                <div className={`relative overflow-hidden rounded-lg bg-white`}>
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] rounded-lg z-[1]" />

                  <div className="relative z-0">
                    {chart && (
                      <BarChart
                        data={chart.data}
                        title={`Restaurants`}
                        unit={`Restaurants`}
                      />
                    )}
                  </div>
                </div>
              </div> */}
              {/* <div className="p-4 bg-white rounded-lg">
                <div className={`relative overflow-hidden rounded-lg bg-white`}>
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] rounded-lg z-[1]" />

                  <div className="relative z-0">
                    <LoadingSpinner />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </DashboardLayout>
      }
    </>

  );
};

export default Dashboard;
