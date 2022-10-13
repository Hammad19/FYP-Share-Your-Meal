import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addData } from "../../utils/api/api";
import API_ENDPOINTS from "../../utils/endpoints";

export const userSignup = createAsyncThunk(
  API_ENDPOINTS.USER_SIGNUP,
  async (requestBody, thunkAPI) => {
    try {
      console.log(requestBody, "<-- requestBody");
      await addData(API_ENDPOINTS.USER_SIGNUP, requestBody).then((response) => {
        console.log(JSON.parse(response));

        return response;
      });
    } catch (e) {
      thunkAPI.rejectWithValue({
        status: "error",
        message: "Unable to signup",
      });
    }
  }
);

const initialState = {
  user: {},
  isLoggedIn: false,
  token: "",
  error: {
    status: "idle",
    message: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.user = action.payload.data.user;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignup.pending, (state, action) => {
      console.log(action.payload, "<--rejected");
    }),
      builder.addCase(userSignup.fulfilled, (state, action) => {}),
      builder.addCase(userSignup.rejected, (state, action) => {
        console.log(action.payload, "<--rejected");
      });
  },
});

export const { updateUserData, updateToken } = authSlice.actions;

export default authSlice.reducer;
