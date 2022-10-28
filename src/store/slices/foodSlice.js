import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { addData, getData } from "../../utils/api/api";
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

//Update Food
export const updateFood = createAsyncThunk(
    API_ENDPOINTS.FOOD_UPDATE,
    async (requestBody, thunkAPI) => {
        try {
            const result = await addData(API_ENDPOINTS.FOOD_UPDATE, requestBody);
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
                message: "Unable to signup",
            });
        }
    }
);

//Delete Food
export const deleteFood = createAsyncThunk(
    API_ENDPOINTS.FOOD_DELETE,
    async (requestBody, thunkAPI) => {
        try {
            const result = await addData(API_ENDPOINTS.FOOD_DELETE, requestBody);
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
                message: "Unable to signup",
            });
        }
    }
);

//Get Food
export const getFood = createAsyncThunk(
    API_ENDPOINTS.FOOD_GET,
    async (thunkAPI) => {

        try {
            const result = await getData(API_ENDPOINTS.FOOD_GET);
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
                message: "Unable to signup",
            });
        }
    }
);

export const getfoodforcharitableorganization = createAsyncThunk(
    API_ENDPOINTS.FOOD_GET_FOR_CHARITABLE_ORGANIZATION,
    async (requestBody,thunkAPI) => {
        try {
            const result = await getData(API_ENDPOINTS.FOOD_GET_FOR_CHARITABLE_ORGANIZATION,requestBody);
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
                message: "Unable to signup",
            });
        }
    }
);


const initialState = {
    food: {},
    foodlist: [],
    isAdded: false,
    error: {
        status: "idle",
        message: "",
    },
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    //change the initial state when userlogins
    userLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    foodreset: (state,action) => {
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
    builder.addCase(addFood.fulfilled, (state, action) => {
      
      console.log("<--food added fulfilled");
    }),
      builder.addCase(addFood.rejected, (state, action) => {


        console.log(action.payload, "<-- action.payload");
      });

    builder.addCase(deleteFood.fulfilled, (state, action) => {
      console.log("<--food deleted fulfilled");
    }),
      builder.addCase(deleteFood.rejected, (state, action) => {
        console.log("<--food deleted rejected");
      });

      builder.addCase(updateFood.fulfilled, (state, action) => {
        console.log("<--food updated fulfilled");
      }
      ),
      builder.addCase(updateFood.rejected, (state, action) => {
        console.log("<--food updated rejected");
      }
      );
      builder.addCase(getFood.fulfilled, (state, action) => {
        state.foodlist = action.payload.food;
        console.log(state.foodlist,"<--food get fulfilled");

      }
      ),
      builder.addCase(getFood.rejected, (state, action) => {
        console.log("<--food get rejected");
      }
      );
      builder.addCase(getfoodforcharitableorganization.fulfilled, (state, action) => {
        console.log(action.payload.food)
        state.foodlist = action.payload.food;
        console.log(state.foodlist,"<--food get for charitable organization fulfilled");
      }
      );
      builder.addCase(getfoodforcharitableorganization.rejected,(state,action) =>
      {
        state.error =  action.payload;

        console.log(state.error.message)
      } )
  },

});

export const {} = foodSlice.actions;

export default foodSlice.reducer;
