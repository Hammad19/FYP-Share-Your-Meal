import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Colors } from "../content";
import Icon from "react-native-vector-icons/FontAwesome";
import { Separator } from "../components";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import {
  deleteuserlisting,
  getlistingsofUser,
  resetupdate,
  setissharepage,
} from "../store/slices/userlistingSlice";
import { getFilteredFood, resetmessage } from "../store/slices/foodSlice";
import { Display } from "../utils";
import { axiosInstance } from "../utils/api/axiosInstance";
//import RangeSlider from 'react-native-range-slider'
//import Slider from 'rn-range-slider';
const Filter = ({ route, navigation }) => {
  const { foodType } = route.params;
  const [cuisines, setCuisines] = useState("all");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0.0);
  const dispatch = useDispatch();
  const [free, setFree] = useState(foodType === "Free Food" ? true : false);
  const [filteredFood, setFilteredFood] = useState([]);

  useFocusEffect(
    useCallback(() => {
      dispatch(resetmessage());
      dispatch(setissharepage(true));
      // dispatch(getlistingsofUser(requestBody));
      dispatch(resetupdate());
    }, [])
  );
  // apply filter
  const applyFilter = async () => {
    console.log(cuisines, quantity, price, rating, free, "filter data");
    let requestBody = {
      food_category: cuisines,
      food_quantity: quantity,
      food_price: price,
      food_rating: rating,
      food_type: free,
    };
    try {
      dispatch(getFilteredFood(requestBody));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor="transparent"
        translucent
      ></StatusBar>
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <IonIcons
          name="chevron-back-outline"
          size={30}
          onPress={() => {
            dispatch(setissharepage(false));
            navigation.goBack();
          }}
        />
        <Text style={styles.headertitle}>Reviews</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.item}>
            <Text style={styles.title}>Food Quantitiy</Text>
            <TextInput
              value={quantity}
              placeholder="How much quantity do you want ?"
              style={styles.input}
              //set type only number
              keyboardType="numeric"
              onChangeText={(text) => {
                setQuantity(text);
              }}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>CUISINES</Text>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  setCuisines("all");
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      cuisines === "all"
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        cuisines === "all"
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCuisines("desi food");
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      cuisines === "desi food"
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        cuisines === "desi food"
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Desi Food
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCuisines("burger");
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      cuisines === "burger"
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        cuisines === "burger"
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Burger
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCuisines("chinese");
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      cuisines === "chinese"
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        cuisines === "chinese"
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Chineese
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCuisines("Fast Food");
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      cuisines === "Fast Food"
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        cuisines === "Fast Food"
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Fast Food
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCuisines("Sea Food");
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      cuisines === "Sea Food"
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        cuisines === "Sea Food"
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Sea Food
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Price</Text>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  setPrice(300);
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      price === 300
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        price === 300
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Under 300Rs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPrice(600);
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      price === 600
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        price === 600
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Under 600Rs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPrice(1000);
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      price === 1000
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        price === 1000
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Under 1000Rs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPrice(2000);
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      price === 2000
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        price === 2000
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Under 2000Rs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPrice(5000);
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      price === 5000
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        price === 5000
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Under 5000Rs
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Rating</Text>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  setRating(1.0);
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      rating === 1.0
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        rating === 1.0
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Above 1.0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRating(2.0);
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      rating === 2.0
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        rating === 2.0
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Above 2.0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRating(3.0);
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      rating === 3.0
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        rating === 3.0
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Above 3.0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRating(4.0);
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      rating === 4.0
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        rating === 4.0
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Above 4.0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRating(5.0);
                }}
                style={[
                  styles.category,
                  {
                    borderColor:
                      rating === 5.0
                        ? Colors.DEFAULT_YELLOW
                        : Colors.DEFAULT_GREY,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color:
                        rating === 5.0
                          ? Colors.DEFAULT_YELLOW
                          : Colors.DEFAULT_GREY,
                    },
                  ]}
                >
                  Above 5.0
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>FILTER</Text>

            <View style={styles.line} />
            <TouchableOpacity
              onPress={() => {
                setFree(!free);
              }}
              style={styles.rowFilter}
            >
              <Text style={styles.text}>Free Food</Text>
              {free && (
                <Icon name="check" size={20} color={Colors.DEFAULT_YELLOW} />
              )}
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
          <TouchableOpacity style={styles.button} onPress={applyFilter}>
            <Text style={styles.buttonTxt}>Apply Filters</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  item: {
    marginVertical: 9,
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
  title: {
    color: Colors.DEFAULT_YELLOW,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 5,
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.DEFAULT_GREY,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  subtitle: {
    color: Colors.LIGHT_GREEN,
    fontWeight: "700",
    fontSize: 15,
  },
  category: {
    margin: 3,
    borderRadius: 15,
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 10,
  },
  text: {
    color: Colors.DEFAULT_GREEN,
    fontSize: 18,
  },
  line: {
    backgroundColor: Colors.DEFAULT_GREY,
    height: 1,
    marginVertical: 10,
  },
  rowFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 15,
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTxt: {
    color: Colors.DEFAULT_WHITE,
    fontWeight: "bold",
    fontSize: 20,
  },
});
