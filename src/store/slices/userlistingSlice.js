import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { addData,getData } from "../../utils/api/api";
import API_ENDPOINTS from "../../utils/endpoints";

export const getlistingsofUser = createAsyncThunk(
    API_ENDPOINTS.FOOD_GET_BY_SHARED_BY,
    
    async (requestBody,thunkAPI) => {

        try {
            const result = await getData(API_ENDPOINTS.FOOD_GET_BY_SHARED_BY+requestBody.food_shared_by);
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

const initialState = {
    food: {},
    foodlist: [],
    isSharePage: false,
    isloaded: false,
    error: {
        status: "idle",
        message: "",
    },
};

const userlistingSlice = createSlice({
  name: "userlisting",
  initialState,
  reducers: {
    //change the initial state when userlogins
    reset: (state,action) => {
        state.foodlist = [];
        state.isloaded = false;
    },
    setissharepage: (state,action) => {
        state.isSharePage = action.payload;
  },
    },
  extraReducers: (builder) => {
    builder.addCase(getlistingsofUser.fulfilled, (state, action) => {
        state.foodlist = action.payload.food;
        state.isloaded = true;
        console.log(action.payload,"<-- state.foodlist");
    });
    builder.addCase(getlistingsofUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isloaded = false;
        console.log(state.error,"<-- state.error");
    });
},
});


export const { setissharepage,reset } =userlistingSlice.actions;

export default userlistingSlice.reducer;
