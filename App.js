import React from "react";
import Navigators from "./src/navigators";
import store from "./src/store/store";
import { Provider } from "react-redux";

const checkAutoLogin = async () => {
  const user = await AsyncStorage.getItem("user");
  if (user) {
    //navigate to home
  } else {
    //navigate to login
  }
};

export default () => (
  <Provider store={store}>
    <Navigators />
  </Provider>
);
