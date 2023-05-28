import React, { useState } from "react";
import {
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";

import { Colors, Images } from "../content";
import { Display } from "../utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import { axiosInstance } from "../utils/api/axiosInstance";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    marginTop: -132,
    overflow: "hidden",
    // padding: 16,
  },

  // headercontainer code
  headerContainer: {
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 50,

    backgroundColor: "transparent",
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: "Poppins_600SemiBold",
    marginTop: 20,
    marginBottom: 16,
    paddingLeft: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: "Poppins_400Regular ",
    overflow: "hidden",
    paddingLeft: 10,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 10,
  },
  whatsappButton: {
    backgroundColor: "lightgray",
    borderRadius: 50,
    width: Display.setWidth(11),
    height: Display.setHeight(6),
    //height: Display.setWidth(13),
    marginTop: Display.setHeight(1),
    marginRight: Display.setWidth(3),
    justifyContent: "center",

    padding: 10,
    elevation: 2,
  },
  detailText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "grey",
    marginLeft: 4,
    marginRight: 16,
  },
  smallDivider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16,
    width: width * 0.25,
  },
  divider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16,
  },
  host: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 76 / 2,
  },
  mediumText: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: "Poppins_500Medium",
    paddingLeft: 10,
  },

  image: {
    //lie image in between the headercontainer

    height: Display.setHeight(40),
    width: Display.setWidth(100),
    resizeMode: "cover",
    top: 0,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    paddingHorizontal: Display.setWidth(5),
    justifyContent: "space-between",
    backgroundColor: "transparent",
    width: Display.setWidth(100),
    paddingVertical: Display.setWidth(2.5),
  },
  itemAddContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_GREY2,
    height: Display.setHeight(6),
    width: Display.setWidth(30),
    justifyContent: "center",
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: "Poppins_600SemiBold",
    marginHorizontal: 8,
  },
  cartButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: Display.setHeight(6),
    width: Display.setWidth(58),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cartButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: "Poppins_500Medium",
  },
});

const FoodDetailScreen = ({ route, navigation }) => {
  const state = useSelector((state) => state);
  const [itemCount, setItemCount] = useState(0);

  const { post } = route.params;

  const openWhatsAppChat = () => {
    // Replace the "XXXXXXXXXXXX" with the phone number of the person you want to chat with
    const phoneNumber = post.phone_number;
    console.log(phoneNumber, "phone number");
    const url = `whatsapp://send?phone=${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`WhatsApp is not installed on the device.`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const OrderFood = async () => {
    try {
      console.log(post._id);
      let requestBody = {
        order_food_id: post._id,
        order_quantity: itemCount,
        ordered_by: state.auth.user.email,
      };

      console.log(requestBody);
      //post request to the backend
      const response = await axiosInstance.post(
        "/orders/orderfood",
        requestBody
      );
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Icon
          name="chevron-left"
          size={30}
          color={Colors.DEFAULT_WHITE}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{ uri: post.food_image }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.title}>{post.food_name}</Text>
          <TouchableOpacity
            onPress={openWhatsAppChat}
            style={styles.whatsappButton}
          >
            <Icon name="whatsapp" size={30} color="#25D366" />
          </TouchableOpacity>
        </View>
        <View style={styles.details}>
          <Icon name="star" color="rgb(255, 56, 92)" size={18} />
          <Text style={styles.detailText}>{post.food_rating}</Text>
        </View>
        <View>
          <View style={styles.divider} />
          <View style={styles.host}>
            <View>
              <Text style={styles.mediumText}>{post.food_name}</Text>
              <Text style={styles.mediumText}>
                Givesaway by {post.food_shared_by}
              </Text>
            </View>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/people19.png",
              }}
            />
          </View>
          <View style={styles.divider} />
          <Text style={styles.text}>{post.food_description} </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <View style={styles.itemAddContainer}>
          <AntDesign
            name="minus"
            color={Colors.DEFAULT_YELLOW}
            size={18}
            onPress={() => setItemCount(itemCount - 1)}
          />
          <Text style={styles.itemCountText}>{itemCount ? itemCount : 0}</Text>
          <AntDesign
            name="plus"
            color={Colors.DEFAULT_YELLOW}
            size={18}
            onPress={() => setItemCount(itemCount + 1)}
          />
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            OrderFood(post, itemCount);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.cartButtonText}>
            {post.is_free ? "Request" : "Order"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FoodDetailScreen;
