import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { addData } from "../../utils/api/api";
import API_ENDPOINTS from "../../utils/endpoints";

export const userSignup = createAsyncThunk(
  API_ENDPOINTS.USER_SIGNUP,
  async (requestBody, thunkAPI) => {
    try {
      const result = await addData(API_ENDPOINTS.USER_SIGNUP, requestBody);
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

/// Verify OTP
export const verifyOtp = createAsyncThunk(
  API_ENDPOINTS.OTP_VERIFY,
  async (requestBody, thunkAPI) => {
    try {
      const result = await addData(API_ENDPOINTS.OTP_VERIFY, requestBody);
      if (result.success == true) {
        return result;
      } else {
        return thunkAPI.rejectWithValue({
          status: "error",
          message: result.message,
        });
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({
        status: "error",
        message: "Unable to verify OTP",
      });
    }
  }
);


export const verifyOtpforEmailVerification = createAsyncThunk(
  API_ENDPOINTS.OTP_VERIFY_EMAIL,
  async (requestBody, thunkAPI) => {
    try {
      const result = await addData(API_ENDPOINTS.OTP_VERIFY_EMAIL, requestBody);
      if (result.success == true) {
        return result;
      } else {
        return thunkAPI.rejectWithValue({
          status: "error",
          message: result.message,
        });
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({
        status: "error",
        message: "Unable to verify OTP",
      });
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  API_ENDPOINTS.RESET_PASSWORD,
  async (requestBody, thunkAPI) => {
    try {
      const result = await addData(API_ENDPOINTS.RESET_PASSWORD, requestBody);
      if (result.success == true) {
        return result;
      } else {
        return thunkAPI.rejectWithValue({
          status: "error",
          message: result.message,
        });
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({
        status: "error",
        message: "Unable to reset password",
      });
    }
  }
);

export const sendOtp = createAsyncThunk(
  API_ENDPOINTS.OTP_SEND,
  async (requestBody, thunkAPI) => {
    try {
      const result = await addData(API_ENDPOINTS.OTP_SEND, requestBody);
      if (result.success == true) {
        return result;
      } else {
        
        return thunkAPI.rejectWithValue({
          status: "error",
          message: result.message,
        });
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({
        status: "error",
        message: "Unable to send OTP",
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

export const sendOtpforEmailVerification = createAsyncThunk(
  API_ENDPOINTS.OTP_SEND_FOR_EMAIL_VERIFICATION,
  async (requestBody, thunkAPI) => {
    try {
      const result = await addData(
        API_ENDPOINTS.OTP_SEND_FOR_EMAIL_VERIFICATION,
        requestBody 
      );
      if (result.success == true) {
        return result;
      } else {
        return thunkAPI.rejectWithValue({
          status: "error",
          message: result.message,
        });
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({
        status: "error",
        message: "Unable to send OTP",
      });
    }
  }
);



const initialState = {
  user: {},
  verificationemail: "",
  isPasswordChanged: false,
  isLoggedIn: false,
  token: "",
  isOtpVerified: false,
  isOtpSent: false,
  otp : "",
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

    resetstatus: (state,action) => 
    {
      state.error.status = "idle";
      state.error.message = "";
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


    //buildercase for verifyotpforemail
    

    builder.addCase(verifyOtpforEmailVerification.fulfilled, (state, action) => {
      state.error.status = "otpverified";
      state.otp = action.payload.otp;
      // verificationemail = action.payload.email;
      state.error.message = action.payload.message;
      state.isOtpVerified = true;
      console.log(state.error.message, "<--state verifyOtp fulfilled");
    }),


    builder.addCase(verifyOtpforEmailVerification.rejected, (state, action) => {
      state.error.message = action.payload.message;
      state.error.status = "otpverifiedError";
      state.isOtpVerified = false;
      console.log(action.payload, "<--state verify rejected");
  }),


    builder.addCase(userSignup.fulfilled, (state, action) => {
      state.error.status = "signupsuccess";
      state.isLoggedIn = false;
      console.log(state, "<--state usersignup fulfilled");
    }),



    builder.addCase(sendOtp.fulfilled, (state, action) => {
      state.error.status = "otpsent";
      state.verificationemail = action.payload.email;
      state.error.message = action.payload.message;
      state.isOtpSent = true;
      console.log(action.payload, "<--state sendotp fulfilled");
    }),

    builder.addCase(sendOtpforEmailVerification.fulfilled, (state, action) => {
      state.error.status = "otpsent";
      state.error.message = action.payload.message;
      state.isOtpSent = true;
      console.log(action.payload, "<--state sendotp fulfilled");
    }),

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.error.status = "passwordreset";
      state.error.message = action.payload.message;
      state.isPasswordChanged = true;
      state.verificationemail = "";
      state.otp = "";
      state.isOtpSent = false;
      console.log(action.payload, "<--state sendotp fulfilled");
    }),
    
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.error.status = "otpverified";
      state.otp = action.payload.otp;
      // verificationemail = action.payload.email;
      state.error.message = action.payload.message;
      state.isOtpVerified = true;
      console.log(state.error.message, "<--state verifyOtp fulfilled");
    }),


      builder.addCase(userSignup.rejected, (state, action) => {
        state.error = action.payload;
      }),

      builder.addCase(sendOtp.rejected, (state, action) => {
        state.error = action.payload;
        state.error.status = "otpsenterror";
        state.isOtpSent = false;
        console.log(action, "<--state sendotp rejected");
      }),

      builder.addCase(sendOtpforEmailVerification.rejected, (state, action) => {
        state.error = action.payload;
        state.error.status = "otpsenterror";
        state.isOtpSent = false;
        console.log(action, "<--state sendotp rejected");
      }),

      builder.addCase(resetPassword.rejected, (state, action) => {
        state.error.status = "resetpassworderror";
        state.error.message = action.payload.message;
        state.isPasswordChanged = false;
        console.log(state.error.message, "<--state resetpassword rejected");
      }),

    builder.addCase(verifyOtp.rejected, (state, action) => {
        state.error.message = action.payload.message;
        state.error.status = "otpverifiedError";
        state.isOtpVerified = false;
        console.log(state.error, "<--state verify rejected");
    }),

  
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

    //create a builder for verifyotpforemailverification
   



  },

});

export const { updateUserData, updateToken, userLoggedIn, userLoggedOut,reset ,resetstatus} =
  authSlice.actions;

export default authSlice.reducer;
