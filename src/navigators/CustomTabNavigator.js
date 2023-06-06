import * as React from "react";
import { Settings, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Colors } from "../content";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FoodDetailScreen from "../screens/FoodDetailScreen";
import HomeTabNavigator from "./HomeTabNavigator";
import AddFoodScreen from "../screens/AddFoodScreen";
import AddFoodNavigator from "./AddFoodNavigator";
import { OrderHistoryScreen, ProfileScreen } from "../screens";
import ProfileNavigator from "./ProfileNavigator";
import { useSelector } from "react-redux";

import { StyleSheet, Text } from "react-native";
import { ButtonGroup } from "react-native-elements";

function Orders() {
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
          console.log(index);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const homeName = "Home";
const profileName = "Profile";
const settingsName = "Share";
const ordersName = "Orders";

const Tab = createBottomTabNavigator();

export default function CustomTabNavigator() {
  const state = useSelector((state) => state);
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.DEFAULT_GREEN,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 14 },
        tabBarStyle: { padding: 10, height: 65 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === profileName) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === settingsName) {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (rn === ordersName) {
            iconName = focused ? "list" : "list-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomeTabNavigator} />

      <Tab.Screen name={settingsName} component={AddFoodNavigator} />

      <Tab.Screen name={ordersName} component={OrderHistoryScreen} />

      <Tab.Screen name={profileName} component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
