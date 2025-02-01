import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ChartData } from "../../types";
import { client } from "../../helpers/api/client";

const path = "/restaurants/";
const url = "http://localhost:3000/api" + path;

interface ChartResponseType {
  group_by: string | string[];
  data: ChartData[];
}

interface ChartRequestType {
  group_by: string;
}

export interface ChartState {
  chart: ChartResponseType;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState = {
  chart: {
    data: [],
    group_by: "",
  },
  status: "idle",
  error: null,
} as ChartState;

export const fetchChart = createAsyncThunk<ChartResponseType, ChartRequestType>(
  "restaurant/fetchChart",
  async (group) => {
    const { group_by } = group;
    const apiUrl = url + "chart/?group_by=" + group_by;
    const response: any = await client.get(apiUrl, {
      headers: { "Content-Type": "application/json" },
    });
    return response as ChartResponseType;
  }
);

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchChart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chart = { ...state.chart, ...action.payload };
      })
      .addCase(fetchChart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default chartSlice.reducer;
