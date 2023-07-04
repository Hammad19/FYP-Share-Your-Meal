import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Card, Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Colors } from "../content";
import { Display } from "../utils";
import { Rating, AirbnbRating } from "react-native-ratings";
import { useState } from "react";
import { axiosInstance } from "../utils/api/axiosInstance";
import {
  Entypo as Icon,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import moment from "moment/moment";
const OrderMediumCard = (props) => {
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

  const formatDate = (date) => {
    const formattedDate = moment(date).format("dddd h:mm A, MMMM D");
    return formattedDate;
  };
  // handlecancel button
  const handleCancelButton = () => {
    axiosInstance
      .put("/orders/cancelorder", {
        order_id: props.order._id,
        order_food_id: props.order.order_food_id,
        order_quantity: props.order.order_quantity,
        order_shared_by: props.order.order_shared_by,
      })
      .then((res) => {
        console.log(res.data, "order cancelled");
        FetchRequestedOrders();
        alert("Order Cancelled");
      })
      .catch((err) => {
        console.log(err.response.data, "order not cancelled");
        if (err.response.data.success === false) {
          alert(err.response.data.message);
        }
      });
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
          <Text style={styles.descText}>
            Quantity : {props.order.order_quantity}
          </Text>
          <Text style={styles.descText}>
            Status : {props.order.order_status}
          </Text>
          <View style={styles.priceView}>
            {/* <Text style={styles.priceText}>{"$" + item.data.discountPrice}</Text> */}
            <Text style={styles.priceText}>
              {formatDate(props.order.created_at)}
            </Text>
          </View>
          {props.order.is_active == false &&
          props.order.order_status === "placed" ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={styles.cartAcceptButton}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}>
                <AntDesign name="star" size={18} color="white" />
                <Text style={styles.cartButtonText}>Rate your food</Text>
              </TouchableOpacity>
            </View>
          ) : props.order.is_active == true ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={styles.cartRejectButton}
                onPress={() => handleCancelButton()}
                activeOpacity={0.8}>
                <AntDesign name="closecircle" size={18} color="white" />
                <Text style={styles.cartButtonText}>Cancel your request</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Rate the Food</Text>
          <View style={styles.ratingContainer}>
            <AirbnbRating
              count={5}
              reviews={reviews}
              defaultRating={1}
              size={20}
              onFinishRating={handleRating}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <TouchableOpacity
              style={[
                styles.addToCartBtn,
                {
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                },
              ]}
              onPress={handleReview}>
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
                Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addToCartBtn,
                {
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                },
              ]}
              onPress={() => setModalVisible(false)}>
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    margin: 10,
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
  addToRateBtn: {
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 1,
    // color: Colors.DEFAULT_GREEN,
    // borderRadius: 10,
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
    width: Display.setWidth(55),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cartRejectButton: {
    backgroundColor: Colors.DEFAULT_YELLOW,
    flexDirection: "row",
    height: Display.setHeight(4),
    width: Display.setWidth(55),
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

export default OrderMediumCard;
