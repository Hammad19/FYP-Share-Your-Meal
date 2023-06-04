import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../utils/api/axiosInstance";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Colors } from "../content";
import { ButtonGroup } from "react-native-elements";
import OrderMediumCard from "../components/OrderMediumCard";
import RequestOrderCard from "../components/RequestOrderCard";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { Display } from "../utils";
import { StatusBar } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
//import { ScrollView } from "react-native-web";

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [requestedOrders, setRequestedOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const state = useSelector((state) => state);
  const [type, setType] = useState("ACTIVE");

  // Get the device height
  const deviceHeight = Dimensions.get("window").height;

  // Calculate the margin based on the device height
  const marginTop = deviceHeight * 0.05;

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
  // get requested orders
  const FetchRequestedOrders = async () => {
    try {
      const response = await axiosInstance.get(
        "/orders/getpendingrequests/" + state.auth.user.email
      );

      console.log(response.data);

      if (response.data) {
        setRequestedOrders(response.data.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      FetchData();
      FetchRequestedOrders();
    }, [])
  );

  const filterByType = (index) => {
    if (index === 0) {
      setType("ACTIVE");
    } else if (index === 1) {
      setType("INACTIVE");
    } else {
      setType("Your Orders");
    }
  };

  const buttons = ["ACTIVE", "INACTIVE", "Your Orders"];
  return (
    //create two tabs active and inactive

    <ScrollView>
      <View style={styles.container}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={Colors.DEFAULT_WHITE}
          translucent
        ></StatusBar>
        <View style={styles.headerContainer}>
          <IonIcons
            name="chevron-back-outline"
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headertitle}>Order</Text>
        </View>
        <ButtonGroup
          buttons={buttons}
          containerStyle={{ height: 40, marginTop: 10 }}
          buttonContainerStyle={{ backgroundColor: Colors.DEFAULT_GREEN }}
          textStyle={{ color: "#fff" }}
          onPress={(index) => {
            filterByType(index);
          }}
        />
        {type === "ACTIVE" ? (
          activeOrders.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: Display.setHeight(40),
                }}
              >
                No Active Orders
              </Text>
            </View>
          ) : (
            activeOrders?.map((order, key) => {
              return <OrderMediumCard order={order} />;
            })
          )
        ) : type === "INACTIVE" ? (
          pastOrders.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: Display.setHeight(40),
                }}
              >
                No Past Orders
              </Text>
            </View>
          ) : (
            pastOrders?.map((order, key) => {
              return <OrderMediumCard order={order} />;
            })
          )
        ) : requestedOrders.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: Display.setHeight(40),
              }}
            >
              you don't have any order request
            </Text>
          </View>
        ) : (
          requestedOrders?.map((order, key) => {
            return <RequestOrderCard order={order} />;
          })
        )}
      </View>
    </ScrollView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headertitle: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: "center",
  },
});
