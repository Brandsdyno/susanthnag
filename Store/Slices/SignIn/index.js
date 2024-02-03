import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  userId: "",
  status: "",
};

export const userSignin = createAsyncThunk("user/signin", async (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let response = await axios.post(`url`, payload, config);
    return response?.data;
  } catch (error) {
    console.log({ error });
  }
});

const signInSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    // omit existing reducers here
    setSignInData: (state, action) => {
      return {
        ...state,
        userId: action.payload.userId,
        status: action.payload.status,
      };
    },
  },
});

export const { setSignInData } = signInSlice.actions;
export default signInSlice.reducer;
