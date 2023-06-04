import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Colors } from "../content";

import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Separator } from "../components";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Display } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { Entypo as Icon } from "@expo/vector-icons";
import {
  deleteuserlisting,
  getlistingsofUser,
  resetupdate,
  setissharepage,
} from "../store/slices/userlistingSlice";
import FoodItem from "../components/FoodItem";
import { useFocusEffect } from "@react-navigation/native";
import { resetmessage } from "../store/slices/foodSlice";
import { axiosInstance } from "../utils/api/axiosInstance";
const ReviewScreen = ({ navigation }) => {
  const [delivery, setDelivery] = useState(true);
  const [reviews, setReviews] = useState([]);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state.auth.user.email);
  let requestBody = { food_shared_by: "/" + state.auth.user.email };
  //dispatch the function only once

  useFocusEffect(
    useCallback(() => {
      dispatch(resetmessage());
      dispatch(setissharepage(true));
      dispatch(getlistingsofUser(requestBody));
      dispatch(resetupdate());
    }, [])
  );

  useEffect(() => {
    dispatch(getlistingsofUser(requestBody));
  }, [state.userlisting.isupdated]);

  //fake data for notification
  const data = [
    {
      id: 1,
      title: "New Message",
      time: "10:00 AM",
      description: "You have a new message from John Doe.",
      image: "https://picsum.photos/200/300?random=1",
    },
    {
      id: 2,
      title: "Reminder",
      time: "11:00 AM",
      description: "Don't forget to attend the meeting at 2 PM.",
      image: "https://picsum.photos/200/300?random=2",
    },
    {
      id: 3,
      title: "Notification",
      time: "12:00 PM",
      description: "You have a new notification.",
      image: "https://picsum.photos/200/300?random=3",
    },
  ];
  //get reviews by user id
  const getReviews = async () => {
    try {
      const response = await axiosInstance.get(
        `reviews/` + state.auth.user.email
      );
      setReviews(response.data.reviews);
      console.log(reviews, "reviews data");
    } catch (error) {
      console.log(error);
    }
  };

  //get user name where email = response.data.reviews.ratedBy_email
  const getUserName = async (email) => {
    try {
      const response = await axiosInstance.get(`users/` + email);
      return response.data.user.name;
      console.log(response.data.user.name, "user name");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReviews();
  }, []);

  return (
    fontsLoaded && (
      <>
        <View style={styles.container}>
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
          <FlatList
            data={reviews}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.innerContainer}>
                  <View style={styles.HeaderLeftImageView}>
                    <Image
                      style={styles.HeaderLeftImage}
                      source={{
                        uri: "https://picsum.photos/200/300?random=1",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingLeft: 10,
                      paddingRight: 15,
                      width: Display.setWidth(80),
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{}}>
                      <Text
                        style={{ fontSize: 15, color: Colors.DEFAULT_GREEN }}
                      >
                        {item.ratedBy_email}
                      </Text>
                      <Text style={{ fontSize: 15, color: Colors.DARK_FOUR }}>
                        Comment : {item.review}
                      </Text>
                      <Text style={{ fontSize: 15, color: Colors.DARK_FOUR }}>
                        Raiting : {item.rating}
                        {/* {[...Array(item.rating)].map((_, index) => (
                          <Icon
                            key={index}
                            name="star"
                            color="orange"
                            size={18}
                          />
                        ))} */}
                      </Text>
                      <Text
                        style={{ fontSize: 15, color: Colors.DEFAULT_GREEN }}
                      >
                        {item.createdAt}
                      </Text>
                    </View>

                    <View>
                      <Text style={{ fontSize: 15, color: Colors.DARK_FOUR }}>
                        {[...Array(item.rating)].map((_, index) => (
                          <Icon
                            key={index}
                            name="star"
                            color="orange"
                            size={18}
                          />
                        ))}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </>
    )
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
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
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 15,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.DEFAULT_BLACK,
  },
  HeaderLeftImage: {
    width: "100%",
    height: "100%",
    borderRadius: 3,
  },
  HeaderLeftImageView: {
    width: 70,
    height: 70,
    borderRadius: 30,
    marginLeft: 5,
  },
});
