import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  contactsData: [],
  status: "",
};

export const getContacts = createAsyncThunk(
  "user/contacts",
  async (payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await axios.get(`url`, payload, config);
      return response?.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

const ContactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(getContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.status = "success";
        state.contactsData = action.payload;
        // localStorage.setItem("token", `${action.payload.token}`);
      })
      .addCase(getContacts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default ContactsSlice.reducer;
