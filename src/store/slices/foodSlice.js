import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { addData } from "../../utils/api/api";
import API_ENDPOINTS from "../../utils/endpoints";

export const addFood = createAsyncThunk(
  API_ENDPOINTS.FOOD_ADD,
  async (requestBody, thunkAPI) => {
    try {
      const result = await addData(API_ENDPOINTS.FOOD_ADD, requestBody);
      if (result.success == true) {
        return result;
      } else {
        console.log(result, "<-- result");
        return thunkAPI.rejectWithValue({
          status: "error",
          message: result.message,
        });
      }
    } catch (e) {
      thunkAPI.rejectWithValue({
        status: "error",
        message: "Unable to signup",
      });
    }
  }
);

/// User Login
export const userLogin = createAsyncThunk(
  API_ENDPOINTS.USER_LOGIN,
  async (requestBody, thunkAPI) => {
    try {
      const result = await addData(API_ENDPOINTS.USER_LOGIN, requestBody);
      if (result.success == true) {
        return result;
      } else {
        console.log(result, "<-- result");
        return thunkAPI.rejectWithValue({
          status: "error",
          message: result.message,
        });
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({
        status: "error",
        message: "Unable to Login",
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
    //change the initial state when userlogins
    userLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    reset: (state,action) => {
      state.user = {};
      state.isLoggedIn = false;
      state.token = "";
      state.error.status = "idle";
      state.error.message = "";
      console.log(state,"<-- state")
    },
    //change the initial state when userlogouts

    userLoggedOut: (state) => {
      
      state.isLoggedIn = false;
      state.user = {};
    },
    updateUserData: (state, action) => {
      state.user = action.payload.data.user;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignup.fulfilled, (state, action) => {
      state.error.status = "signupsuccess";
      state.isLoggedIn = false;
      console.log(state, "<--state usersignup fulfilled");
    }),
      builder.addCase(userSignup.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.error.status = "loginsuccess";
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log(state,  "<-- state userlogin fulfilled");
    }),
      builder.addCase(userLogin.rejected, (state, action) => {
        // console.log(action.payload, "<-- Login rejected");
        state.error.status = "loginerror";
        state.error.message = action.payload.message;
        state.isLoggedIn = false;
      });
  },
});

export const { updateUserData, updateToken, userLoggedIn, userLoggedOut,reset } =
  authSlice.actions;

export default authSlice.reducer;
