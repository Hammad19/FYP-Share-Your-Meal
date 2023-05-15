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
          <Text style={styles.descText}>{props.order.order_quantity}</Text>
          <View style={styles.priceView}>
            {/* <Text style={styles.priceText}>{"$" + item.data.discountPrice}</Text> */}
            <Text style={styles.priceText}>{props.order.created_at}</Text>
          </View>
        </View>
        <View style={styles.addRemoveView}>
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
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
              Rate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Rate the Food</Text>
          <View style={styles.ratingContainer}>
            <AirbnbRating
              count={5}
              reviews={reviews}
              defaultRating={5}
              size={20}
              onFinishRating={handleRating}
            />
          </View>
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
            onPress={handleReview}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  itemView: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: "30%",
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
});

export default OrderMediumCard;
