import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  TextInput,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Colors, Images } from "../content";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import FoodItem from "../components/FoodItem";
import food from "../assets/data/dummydata";
import { Separator } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { Display } from "../utils";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import { getFood,getfoodforcharitableorganization } from "../store/slices/foodSlice";
import { setissharepage } from "../store/slices/userlistingSlice";
import { useFocusEffect } from "@react-navigation/native";
const HomeScreen = ({ navigation }) => {
  const [foodType, setFoodType] = useState(true);
  const [delivery, setDelivery] = useState(true);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  //whenever the user comes in this page set issharepage to false
  
  

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const FetchFoodData = () => {


    let requestBody = {
      food_quantity: 5,
      is_free: true
    }

    console.log(requestBody);

    if(state.auth.user.accounttype === "User"){

      dispatch(getFood());
    }
    else if(state.auth.user.accounttype === "Charitable Organization")

    {

      console.log("Hello in charitable")

      dispatch(getfoodforcharitableorganization(requestBody));
    }
  };

  
  useFocusEffect(
    useCallback(() => {
      dispatch(setissharepage(false));
      FetchFoodData();
    }, [])
  );

  
  

  return (
    fontsLoaded && (
      
      <>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <Separator height={StatusBar.currentHeight} />
          <View style={styles.backgroundCurvedContainer} />
          <View style={styles.headerContainer}>
            <View style={styles.locationContainer}>
              <Ionicons
                name="person-outline"
                size={15}
                color={Colors.DEFAULT_WHITE}
              />
              <Text style={styles.locationText}>Welcome</Text>
              <Text style={styles.selectedLocationText}>Hammad Waseem</Text>
              {/* <MaterialIcons
                name="keyboard-arrow-down"
                size={16}
                color={Colors.DEFAULT_YELLOW}
              /> */}
              <Feather
                name="bell"
                size={24}
                color={Colors.DEFAULT_WHITE}
                style={{ position: "absolute", right: 0 }}
              />
              <View style={styles.alertBadge}>
                <Text style={styles.alertBadgeText}>12</Text>
              </View>
            </View>
            <View style={styles.searchContainer}>
              <View style={styles.searchSection}>
                <Ionicons
                  name="search-outline"
                  size={25}
                  color={Colors.DEFAULT_GREY}
                />
                <TextInput
                  style={styles.searchText}
                  placeholderTextColor={Colors.DEFAULT_GREY}
                  placeholder="Search.."
                />
              </View>
              <Feather
                name="sliders"
                size={20}
                color={Colors.DEFAULT_YELLOW}
                style={{ marginRight: 10 }}
              />
            </View>

            {state.auth.user.accounttype === "User" && (<View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: 20,
                width: Display.setWidth(100),
              }}>
              <TouchableOpacity
                onPress={() => setFoodType("free")}
                style={styles.category()}>
                <Ionicons
                  name={foodType == "free" ? "fast-food" : "fast-food-outline"}
                  size={35}
                  color={
                    foodType == "free"
                      ? Colors.DEFAULT_WHITE
                      : Colors.DEFAULT_GREY
                  }
                />
                <Text style={styles.categoryText(foodType === "free")}>
                  FREE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFoodType("buy")}
                style={styles.category()}>
                <MaterialCommunityIcons
                  name={foodType == "buy" ? "food" : "food-outline"}
                  size={35}
                  color={
                    foodType == "buy"
                      ? Colors.DEFAULT_WHITE
                      : Colors.DEFAULT_GREY
                  }
                />
                <Text style={styles.categoryText(foodType === "buy")}>
                  Order
                </Text>
              </TouchableOpacity>
            </View>
            )}
          </View>

          <Separator height={15} />
          <FlatList
            style={{ flex: 1 ,zIndex:-1, paddingTop: 100}}
            data={state.food.foodlist}
            renderItem={({ item }) => <FoodItem post={item} />}
            //
          />
        </View>
      </>
    )
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: 1685,
    position: "absolute",
    top: -1 * (1700 - 240),
    width: 1700,
    borderRadius: 1700,
    alignSelf: "center",
  },
  headerContainer: {
    justifyContent: "space-evenly",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  locationText: {
    color: Colors.DEFAULT_WHITE,
    marginLeft: 5,
    fontSize: 15,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins_500Medium",
  },
  selectedLocationText: {
    color: Colors.DEFAULT_YELLOW,
    marginLeft: 5,
    fontSize: 18,
    lineHeight: 14 * 1.4,
    fontFamily: "Poppins_500Medium",
  },
  alertBadge: {
    borderRadius: 32,
    backgroundColor: Colors.DEFAULT_YELLOW,
    justifyContent: "center",
    alignItems: "center",
    height: 16,
    width: 16,
    position: "absolute",
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins_700Bold",
  },
  searchContainer: {
    // marginTop: 100,
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 45,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  searchText: {
    color: Colors.DARK_THREE,
    fontSize: 18,
    lineHeight: 16 * 1.4,
    fontFamily: "Poppins_500Medium",
    marginLeft: 10,
  },
  category: (marginTop = 0) => ({
    alignItems: "center",
    marginTop,
  }),
  categoryIcon: (isActive) => ({
    height: 40,
    width: 40,
    opacity: isActive ? 1 : 0.5,
  }),
  categoryText: (isActive) => ({
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: "Poppins_500Medium",
    color: Colors.DEFAULT_WHITE,
    opacity: isActive ? 1 : 0.5,
  }),
});
