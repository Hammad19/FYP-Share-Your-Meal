import React from "react";
import Navigators from "./src/navigators";
// import {Store} from './src/Store';
import { Provider } from "react-redux";
import store from "./src/store/store";

export default () => (
  <Provider store={store}>
    <Navigators />
  </Provider>
);
