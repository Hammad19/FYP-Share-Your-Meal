import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Entypo as Icon, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Card, Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Colors } from "../content";
import { Display } from "../utils";
import { Rating, AirbnbRating } from "react-native-ratings";
import { useState } from "react";
import { axiosInstance } from "../utils/api/axiosInstance";

const RequestOrderCard = (props) => {
  const reviews = ["Worst", "Bad", "Average", "Good", "Excellent"];
  const handleRating = (value) => {
    setRating(value); // Update the state variable with the selected rating value
  };
  const handleReview = () => {
    const count = reviews.length;
    const text = reviews[rating - 1];

    console.log("raiting", rating);
    console.log("Review Text:", text);
    setModalVisible(false);
    axiosInstance
      .post("/reviews", {
        review: text,
        rating: rating,
        order: props.order._id,
        user_email: props.order.order_shared_by,
        food: props.order.order_food_id,
        ratedBy_email: props.order.ordered_by,
      })
      .then((res) => {
        console.log(res.data, "review added");
        alert("Review Added");
      })
      .catch((err) => {
        console.log(err.response.data, "review not added");
        if (err.response.data.success === false) {
          alert(err.response.data.message);
        }
      });
  };

  // handleAccept button
  const handleAcceptButton = () => {
    axiosInstance
      .put("/orders/acceptorder", {
        order_id: props.order._id,
        order_food_id: props.order.order_food_id,
        order_quantity: props.order.order_quantity,
      })
      .then((res) => {
        console.log(res.data, "order accepted");
        FetchRequestedOrders();
        alert("Order Accepted");
      })
      .catch((err) => {
        console.log(err.response.data, "order not accepted");
        if (err.response.data.success === false) {
          alert(err.response.data.message);
        }
      });
  };
  // handleReject button
  const handleRejectButton = () => {
    axiosInstance
      .put("/orders/rejectorder", {
        order_id: props.order._id,
        order_food_id: props.order.order_food_id,
        order_quantity: props.order.order_quantity,
      })
      .then((res) => {
        console.log(res.data, "order rejected");
        FetchRequestedOrders();
        alert("Order Rejected");
      })
      .catch((err) => {
        console.log(err.response.data, "order not rejected");
        if (err.response.data.success === false) {
          alert(err.response.data.message);
        }
      });
  };
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
  const [modalVisible, setModalVisible] = useState(false);

  const [rating, setRating] = useState(0);
  console.log(props.order.order_image);
  console.log(props);
  return (
    <>
      <View style={styles.itemView}>
        <Image
          source={{ uri: props.order.order_image }}
          style={styles.itemImage}
        />
        <View style={styles.nameView}>
          <Text style={styles.nameText}>{props.order.order_name}</Text>
          <Text style={styles.priceText}>{props.order.ordered_by}</Text>
          <Text style={styles.priceText}>{props.order.order_description}</Text>
          <Text style={styles.priceText}>
            Quantity :{props.order.order_quantity}
          </Text>
          <View style={styles.priceView}>
            {/* <Text style={styles.priceText}>{"$" + item.data.discountPrice}</Text> */}
            <Text style={styles.priceText}>{props.order.created_at}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={styles.cartAcceptButton}
              onPress={() => handleAcceptButton()}
              activeOpacity={0.8}
            >
              <Text style={styles.cartButtonText}>
                <Ionicons
                  name="checkmark-done-circle"
                  size={24}
                  color="white"
                />
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cartRejectButton}
              onPress={() => handleRejectButton()}
              activeOpacity={0.8}
            >
              <Text style={styles.cartButtonText}>
                <MaterialIcons name="delete" size={20} />
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemView: {
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: "auto",
    marginBottom: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: "60%",
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 10,
    height: "auto",
    //backgroundColor: "red",
  },
  priceView: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
  },
  descText: {
    fontSize: 14,
    fontWeight: "600",
  },
  priceText: {
    fontSize: 15,
    color: "gray",
    fontWeight: "700",
  },
  discountText: {
    fontSize: 17,
    fontWeight: "600",
    textDecorationLine: "line-through",
    marginLeft: 5,
  },
  addRemoveView: {
    flexDirection: "row",
    alignItems: "flex-end",
    // backgroundColor: "blue",
    marginLeft: 50,
  },
  addToCartBtn: {
    backgroundColor: Colors.DEFAULT_GREEN,
    padding: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFF",
  },

  ratingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  cartAcceptButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    flexDirection: "row",

    height: Display.setHeight(4),
    width: Display.setWidth(28),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cartRejectButton: {
    backgroundColor: Colors.DEFAULT_GREY,
    flexDirection: "row",
    marginLeft: 5,
    height: Display.setHeight(4),
    width: Display.setWidth(28),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cartButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
    lineHeight: 16 * 1.5,
    fontFamily: "Poppins_500Medium",
    padding: 3,
  },
});

export default RequestOrderCard;
