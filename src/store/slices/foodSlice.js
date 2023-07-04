import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { addData, getAllData, getData } from "../../utils/api/api";
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

export const getfoodbytype = createAsyncThunk(
  API_ENDPOINTS.FOOD_GET_BY_TYPE,
  async (requestBody, thunkAPI) => {
    try {
      const result = await getData(
        API_ENDPOINTS.FOOD_GET_BY_TYPE + requestBody.is_free
      );
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
  async (requestBody, thunkAPI) => {
    try {
      const result = await getData(
        API_ENDPOINTS.FOOD_GET_FOR_CHARITABLE_ORGANIZATION +
          "/" +
          requestBody.food_quantity +
          "/" +
          requestBody.is_free
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
        message: "Unable to signup",
      });
    }
  }
);

export const getFoodsByName = createAsyncThunk(
  API_ENDPOINTS.FOOD_GET_BY_NAME,
  async (requestBody, thunkAPI) => {
    try {
      const result = await getData(
        API_ENDPOINTS.FOOD_GET_BY_NAME +
          "/" +
          requestBody.food_name +
          "/" +
          requestBody.is_free
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
        message: "Unable to signup",
      });
    }
  }
);

//get filtered food
export const getFilteredFood = createAsyncThunk(
  API_ENDPOINTS.FOOD_GET_FILTERED,
  async (requestBody, thunkAPI) => {
    try {
      const result = await getData(
        API_ENDPOINTS.FOOD_GET_FILTERED +
          "/" +
          requestBody.food_category +
          "/" +
          requestBody.is_free +
          "/" +
          requestBody.food_price +
          "/" +
          requestBody.food_rating +
          "/" +
          requestBody.food_quantity
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
        message: "Unable to get filtered food",
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
  isLoading: false,
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    //change the initial state when userlogouts
    reset: (state) => {
      state.food = {};
      state.foodlist = [];
      state.isAdded = false;
      state.error.status = "idle";
      state.error.message = "";
    },

    resetmessage: (state) => {
      state.error.status = "idle";
      state.error.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addFood.fulfilled, (state, action) => {
      state.error.status = "success";
      state.error.message = action.payload.message;
      state.food.isAdded = true;
      state.isLoading = false;

      console.log(action.payload.message, "<--food added fulfilled");
    }),
      builder.addCase(addFood.pending, (state, action) => {
        console.log(action.payload, "<-- action.payload food pending");
        state.isLoading = true;
      }),
      builder.addCase(addFood.rejected, (state, action) => {
        console.log(action.payload, "<-- action.payload food rejected");
        state.isLoading = false;
      });

    builder.addCase(getFood.fulfilled, (state, action) => {
      state.foodlist = action.payload.food.reverse();
      state.isLoading = false;
      console.log(state.foodlist, "<--food get fulfilled");
    }),
      //getfood pending
      builder.addCase(getFood.pending, (state, action) => {
        console.log("<--food get pending");
        state.isLoading = true;
      });
    builder.addCase(getFood.rejected, (state, action) => {
      console.log("<--food get rejected");
      state.isLoading = false;
    });
    builder.addCase(
      getfoodforcharitableorganization.fulfilled,
      (state, action) => {
        console.log(action.payload.food);
        state.foodlist = action.payload.food.reverse();
        console.log(
          state.foodlist,
          "<--food get for charitable organization fulfilled"
        );
        state.isLoading = false;
      }
    );
    //pending case for getfoodforcharitableorganization

    builder.addCase(
      getfoodforcharitableorganization.rejected,
      (state, action) => {
        state.error = action.payload;

        console.log(state.error.message);
      }
    );
    builder.addCase(getfoodbytype.fulfilled, (state, action) => {
      state.foodlist = action.payload.food.reverse();
      console.log(state.foodlist, "<--food get by type fulfilled");
    });
    builder.addCase(getfoodbytype.rejected, (state, action) => {
      state.error = action.payload;
      console.log(state.error.message);
    });

    builder.addCase(getFoodsByName.fulfilled, (state, action) => {
      state.foodlist = action.payload.food.reverse();
    });

    builder.addCase(getFoodsByName.rejected, (state, action) => {
      console.log(action);
    });
    builder.addCase(getFilteredFood.fulfilled, (state, action) => {
      console.log(action.payload);
      state.foodlist = action.payload.food.reverse();
    });
    builder.addCase(getFilteredFood.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const { resetmessage } = foodSlice.actions;

export default foodSlice.reducer;
