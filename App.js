import React from "react";
import Navigators from "./src/navigators";
import store from "./src/store/store";
import { Provider } from "react-redux";

export default () => (
  <Provider store={store}>
    <Navigators />
  </Provider>
);
