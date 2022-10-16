import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { addData } from "../../utils/api/api";
import API_ENDPOINTS from "../../utils/endpoints";

export const userSignup = createAsyncThunk(
  API_ENDPOINTS.USER_SIGNUP,
  async (requestBody, thunkAPI) => {
    try {
      console.log(requestBody, "<-- requestBody");
      await addData(API_ENDPOINTS.USER_SIGNUP, requestBody).then((response) => {
        console.log(response);
        if(response.success == false){
          Alert.alert("Error", response.message);
        }
        else if(response.success == true){
          Alert.alert("Success", response.message);
        }

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

/// User Login
export const userLogin = createAsyncThunk(
  API_ENDPOINTS.USER_LOGIN,
  async (requestBody, thunkAPI) => {
    try {
      console.log(requestBody, "<-- requestBody");
      await addData(API_ENDPOINTS.USER_LOGIN, requestBody).then((response) => {
        if(response.success == false){
          Alert.alert("Error", response.message);
        }
        else if(response.success == true){
          Alert.alert("Success", response.message);
        }
        return response;
      });
    } catch (e) {
      thunkAPI.rejectWithValue({
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
      builder.addCase(userSignup.rejected, (state, action) => {
        console.log(action.payload, "<--rejected");
      });
      builder.addCase(userLogin.pending, (state, action) => {
        console.log(action.payload, "<--Pending");
      }),
        builder.addCase(userLogin.fulfilled, (state, action) => {}),
        builder.addCase(userLogin.rejected, (state, action) => {
          console.log(action.payload, "<-- Login rejected");
        });
  },
});

export const { updateUserData, updateToken ,userLoggedIn,userLoggedOut} = authSlice.actions;

export default authSlice.reducer;
