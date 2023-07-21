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
const NotificationScreen = ({ navigation }) => {
  const [delivery, setDelivery] = useState(true);
  const [notification, setNotification] = useState([]);
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
    getNotification();
  }, [state.userlisting.isupdated]);
  // get notification by user email
  const getNotification = async () => {
    try {
      const response = await axiosInstance.get(
        "notifications/" + state.auth.user.email
      );
      console.log(response.data, "notification screen");
      setNotification(response.data.notification);
      console.log(notification, "notification screen from state ");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getNotification();
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  //get food image where notification._id
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
            <Text style={styles.headertitle}>Notification</Text>
          </View>
          <FlatList
            data={notification}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.innerContainer}>
                  <View style={styles.HeaderLeftImageView}>
                    <Image
                      style={styles.HeaderLeftImage}
                      source={{ uri: item.notification_image }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      //backgroundColor: "#fff",
                      paddingLeft: 10,
                      width: Display.setWidth(75),
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Colors.DEFAULT_GREEN,
                          //width: Display.setWidth(40),
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Colors.DARK_FOUR,
                          width: Display.setWidth(65),
                        }}
                      >
                        {item.message}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: Colors.DEFAULT_GREEN }}>
                        {item.createdAt.slice(0, 10)}
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

export default NotificationScreen;

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
    width: Display.setWidth(100),
    height: "100%",
    padding: 15,
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#c7c7c7",
    borderBottomWidth: 1,
  },
  HeaderLeftImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  HeaderLeftImageView: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginLeft: 3,
  },
});
