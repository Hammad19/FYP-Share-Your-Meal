import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Colors } from "../content";
import { Display } from "../utils";
import { getFormatedDate } from "../utils/authservice";

const OrderMediumCard = (props) => {
  console.log(props.order.order_image);
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: props.order.order_image }}
          style={styles.posterStyle}
        />
      </View>
      <View style={styles.labelContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{props.order.order_name}</Text>
          <View style={styles.rowAndCenter}>
            <FontAwesome />
            <Text style={styles.ratingText}>4.2</Text>
            <Text style={styles.reviewsText}>({233})</Text>
          </View>
        </View>
        <Text style={styles.tagsText}>{" • "}</Text>
        <View style={styles.deliveryDetailsContainer}>
          <View style={styles.rowAndCenter}>
            <Image source={""} style={styles.deliveryDetailsIcon} />
            <Text style={styles.deliveryDetailsText}>Free Delivery</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Image
              source={"Images.DELIVERY_TIME"}
              style={styles.deliveryDetailsIcon}
            />
            <Text style={styles.deliveryDetailsText}>
              {getFormatedDate(props.order.created_at)} min
            </Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Image style={styles.deliveryDetailsIcon} />
            <Text style={styles.deliveryDetailsText}>
              {props.order.order_quantity}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    elevation: 1,
    borderRadius: 8,
    backgroundColor: Colors.DEFAULT_WHITE,
    marginTop: 8,
  },
  posterStyle: {
    width: Display.setWidth(20),
    height: Display.setWidth(20),
    borderRadius: 10,
    margin: 5,
  },
  labelContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deliveryDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: "Poppins-Bold",
    color: Colors.DEFAULT_BLACK,
    marginBottom: 5,
  },
  tagsText: {
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: "Poppins-Medium",
    color: Colors.DEFAULT_GREY,
    marginBottom: 7,
  },
  deliveryDetailsText: {
    marginLeft: 3,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: "Poppins-Medium",
    color: Colors.DEFAULT_BLACK,
  },
  deliveryDetailsIcon: {
    height: 16,
    width: 16,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins-Medium",
    color: Colors.DEFAULT_BLACK,
  },
  reviewsText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins-Medium",
    color: Colors.DEFAULT_BLACK,
  },
});

export default OrderMediumCard;
