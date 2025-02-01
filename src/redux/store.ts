import { configureStore } from "@reduxjs/toolkit";

import restaurantSlice from "./slices/restaurant-slice";
import chartSlice from "./slices/chart-slice";
import themeSlice from "./slices/theme-slice";

const store = configureStore({
  reducer: {
    restaurants: restaurantSlice,
    chart: chartSlice,
    theme: themeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
