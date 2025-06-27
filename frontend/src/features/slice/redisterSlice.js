import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../axiosInstance";

export const createUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      console.log(import.meta.env.VITE_BASE_URL, "url");

      const res = await axiosInstance.post(`/auth/register`, data);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "registration failed"
      );
    }
  }
);

const registerSlice = createSlice({
  name: "createUser",
  initialState: {
    user: "",
    error: null,
    isLoading: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, action) => {
      state.isLoading = true;
      console.log(state.isLoading);
    }),
      builder.addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      }),
      builder.addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const registerReducer = registerSlice.reducer;
