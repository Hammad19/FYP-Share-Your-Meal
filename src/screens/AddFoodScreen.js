import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../content";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import AntDesign from "react-native-vector-icons/AntDesign";

const AddFoodScreen = ({navigation}) => {
  const [delivery, setDelivery] = useState(true);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });
  return (
    fontsLoaded && (
      <>
        <View>
          <Text >Your  jhahahahahshhshshsh  ahahshshshshhs List</Text>
          <TouchableOpacity
             onPress={() => {
              navigation.navigate("InsertFoodItemScreen");
            }}
            activeOpacity={0.8}
          >
            <AntDesign
              name="pluscircle"
              size={50}
              color={Colors.DEFAULT_YELLOW}
              style={styles.plusbutton}
            ></AntDesign>
          </TouchableOpacity>
        </View>
      </>
    )
  );
};

export default AddFoodScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  deliveryButton: {
    paddingHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 5,
  },
  deliveryText: {
    color: Colors.DEFAULT_BLACK,
    marginLeft: 5,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  plusbutton: {
    marginTop: "140%",
    paddingVertical: 20,
    paddingHorizontal: 11,
    marginLeft: "80%",
    position: "absolute",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
});
