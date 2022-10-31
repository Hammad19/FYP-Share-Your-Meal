import { StyleSheet, Text, View, TouchableOpacity,StatusBar ,FlatList} from "react-native";
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
import { deleteuserlisting, getlistingsofUser, setissharepage } from "../store/slices/userlistingSlice";
import FoodItem from "../components/FoodItem";
import { useFocusEffect } from "@react-navigation/native";
import { resetmessage } from "../store/slices/foodSlice";
const AddFoodScreen = ({navigation}) => {
  const [delivery, setDelivery] = useState(true);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state.auth.user.email)
  let requestBody = {food_shared_by: "/"+state.auth.user.email};
 //dispatch the function only once
  
  useFocusEffect(
    useCallback(() => {
      dispatch(resetmessage());
      dispatch(setissharepage(true));
      dispatch(getlistingsofUser(requestBody));
      
    }, [])
  );

  
  useEffect(() => {
    dispatch(getlistingsofUser(requestBody));
  }, [state.userlisting.isupdated]);
  

  return (
    fontsLoaded && (
      <View style={styles.container}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor="transparent"
          translucent></StatusBar>
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
          <Text style={styles.headertitle}>Add Listings</Text>
        </View>
      
        
         {state.userlisting.foodlist.length > 0 ? (
          <FlatList
          style={{ flex: 1 }}
          data={state.userlisting.foodlist}
          renderItem={({ item }) => <FoodItem post={item} />}
        />):(
          <><Separator height={50} />
          <Text style={styles.content}>
           You Currently Have No Listings Please Click on Plus Button to Add Listings
         </Text></>
         )}

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
    )
  );
};

export default AddFoodScreen;

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
  content: {
    fontSize: 22,
    fontFamily: "Poppins_500Medium",
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 20,
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
   
    //plus button at the bottom right corner
    position: "absolute",
    bottom: 20,
    right: 20,

    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
      //shadow opacity
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 20,

  },
});
