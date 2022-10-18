import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { addData } from "../../utils/api/api";
import API_ENDPOINTS from "../../utils/endpoints";

export const userSignup = createAsyncThunk(
  API_ENDPOINTS.USER_SIGNUP,
  async (requestBody, thunkAPI) => {
    try {
      const result = await addData(API_ENDPOINTS.USER_SIGNUP, requestBody)
      if(result.success == true){
        return result;
      }
      else
      {
        console.log(result, "<-- result");
        return thunkAPI.rejectWithValue
        ({
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
      const result = await addData(API_ENDPOINTS.USER_LOGIN, requestBody)
      if(result.success == true){
        return result;
      }
      else
      {
        console.log(result, "<-- result");
        return thunkAPI.rejectWithValue
        ({
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
    //change the initial state when userlogouts

    userLoggedOut: (state, action) => {
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
    builder.addCase(userSignup.pending, (state, action) => {
      //console.log(action.payload, "<--rejected");
    }),

    builder.addCase(userSignup.fulfilled, (state, action) => {
      state.error.status = "idle";
      console.log(action.payload, "<--fulfilled");
      
      
    }),
      builder.addCase(userSignup.rejected, (state, action) => {
        state.error = action.payload;
      });
      builder.addCase(userLogin.pending, (state, action) => {
        // console.log(action.payload, "<--Pending");
      }),
        builder.addCase(userLogin.fulfilled, (state, action) => {
          // console.log(action, "<--fulfilled");
          state.error.status = "idle";
          state.isLoggedIn = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          console.log(state.user, "<--state.user");

        }),
        builder.addCase(userLogin.rejected, (state, action) => {
          // console.log(action.payload, "<-- Login rejected");
          state.error = action.payload;
          state.isLoggedIn = false;
          console.log(state.error, "<-- state.error");
        });
  },
});

export const { updateUserData, updateToken ,userLoggedIn,userLoggedOut} = authSlice.actions;

export default authSlice.reducer;
