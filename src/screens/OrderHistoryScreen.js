import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../utils/api/axiosInstance";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../content";
import { ButtonGroup } from "react-native-elements";
import OrderMediumCard from "../components/OrderMediumCard";
import { useFocusEffect } from "@react-navigation/native";

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const state = useSelector((state) => state);
  const [type, setType] = useState("ACTIVE");

  const FetchData = async () => {
    console.log(state.auth.user.email);
    try {
      const response = await axiosInstance.get(
        "/orders/getorderedfood/" + state.auth.user.email
      );

      console.log(response.data);

      if (response.data) {
        setActiveOrders(
          response.data.order.filter((order) => order.is_active === true)
        );
        setPastOrders(
          response.data.order.filter((order) => order.is_active === false)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      FetchData();
    }, [])
  );

  const filterByType = (index) => {
    if (index === 0) {
      setType("ACTIVE");
    } else {
      setType("INACTIVE");
    }
  };

  const buttons = ["ACTIVE", "INACTIVE"];
  return (
    //create two tabs active and inactive
    <View style={styles.container}>
      <ButtonGroup
        buttons={buttons}
        containerStyle={{ height: 40 }}
        buttonContainerStyle={{ backgroundColor: Colors.DEFAULT_GREEN }}
        textStyle={{ color: "#fff" }}
        onPress={(index) => {
          filterByType(index);
        }}
      />
      {type === "ACTIVE" ? (
        activeOrders.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              No Active Orders
            </Text>
          </View>
        ) : (
          activeOrders?.map((order, key) => {
            return <OrderMediumCard order={order} />;
          })
        )
      ) : pastOrders.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            No Past Orders
          </Text>
        </View>
      ) : (
        pastOrders?.map((order, key) => {
          return <OrderMediumCard order={order} />;
        })
      )}
    </View>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
});
