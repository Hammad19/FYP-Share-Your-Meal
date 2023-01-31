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
import {
  getFood,
  getfoodbytype,
  getfoodforcharitableorganization,
} from "../store/slices/foodSlice";
import { setissharepage } from "../store/slices/userlistingSlice";
import { useFocusEffect } from "@react-navigation/native";
import Animated, { color } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
//import { black } from "react-native-paper/lib/typescript/styles/colors";

const HomeScreen = ({ navigation }) => {
  const [foodType, setFoodType] = useState(true);
  const [delivery, setDelivery] = useState(true);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

    bs = React.createRef();
    fall = new Animated.Value(1);
  //whenever the user comes in this page set issharepage to false
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const FetchFoodData = () => {
    let requestBody = {
      food_quantity: 5,
      is_free: true,
    };

    console.log(requestBody);

    if (state.auth.user.accounttype === "User") {
      dispatch(getFood());
    } else if (state.auth.user.accounttype === "Charitable Organization") {
      console.log("Hello in charitable");

      dispatch(getfoodforcharitableorganization(requestBody));
    }
  };

  const FetchFoodByType = () => {
    if (foodType === "Free Food") {
      let requestBody = {
        is_free: "true",
      };
      dispatch(getfoodbytype(requestBody));
    } else if (foodType === "Paid Food") {
      let requestBody = {
        is_free: "false",
      };
      dispatch(getfoodbytype(requestBody));
    }
  };
  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  renderInner = () => (
    <View style={styles.panel}>
      <TouchableOpacity style={styles.panelLocationButton} >
        <Text style={styles.panelButtonTitle} onPress={() => navigation.navigate("GoogleMapScreen")}>+ Add location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(0)}>
        <Text style={styles.panelButtonTitle}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    FetchFoodByType();
  }, [foodType]);

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
        <BottomSheet 
            ref={bs}
            snapPoints={[0, 280]}
            renderContent={renderInner}
            renderHeader={renderHeader}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
          />
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
                onPress={() => navigation.navigate("FilterScreen")}
              />
            </View>
            {state.auth.user.accounttype === "User" && (
              <View
                style={{
                  top: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: Display.setWidth(100),
                }}
              >
                <TouchableOpacity
                  onPress={() => setFoodType("Free Food")}
                  style={styles.category()}
                >
                  <Ionicons
                    name={
                      foodType == "Free Food"
                        ? "fast-food"
                        : "fast-food-outline"
                    }
                    size={35}
                    color={
                      foodType == "Free Food"
                        ? Colors.DEFAULT_WHITE
                        : Colors.DEFAULT_GREY
                    }
                  />
                  <Text style={styles.categoryText(foodType === "Free Food")}>
                    FREE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setFoodType("Paid Food")}
                  style={styles.category()}
                >
                  <MaterialCommunityIcons
                    name={foodType == "Paid Food" ? "food" : "food-outline"}
                    size={35}
                    color={
                      foodType == "Paid Food"
                        ? Colors.DEFAULT_WHITE
                        : Colors.DEFAULT_GREY
                    }
                  />
                  <Text style={styles.categoryText(foodType === "Paid Food")}>
                    Order
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <FlatList
            style={{ flex: 1, zIndex: -1, paddingTop: 55 }}
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
  header: {
    backgroundColor: Colors.LIGHT_YELLOW,
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    //paddingTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 30,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginTop: 20,
  },
  panelButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.DEFAULT_YELLOW,
    alignItems: 'center',
    marginTop: 120,
  },
  panelLocationButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.DEFAULT_YELLOW,
    borderLeftColor: 'black',
    alignItems: 'center',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panel: {
    padding: 10,
    backgroundColor: Colors.LIGHT_YELLOW,
    paddingTop: 20,
    paddingBottom: 0,
    height: 265,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },

});
