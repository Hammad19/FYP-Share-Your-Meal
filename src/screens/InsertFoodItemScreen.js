import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
  ToastAndroid,
  ImagePickerIOS,
} from "react-native";
import { useValidation } from "react-native-form-validator";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { React, useEffect, useState } from "react";
import { Colors, Images } from "../content";
import { Separator } from "../components";
import { Display } from "../utils";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";
import ImagePicker from "expo-image-picker";
import expoImagePicker from "expo-image-picker";
import { launchImageLibrary } from "react-native-image-picker";
import { PermissionsAndroid } from 'react-native';

import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Avatar } from "react-native-paper";

const InsertFoddItemScreen = () => {
  const [foodName, setfoodName] = useState("");
  const [foodPrice, setfoodPrice] = useState("");
  const [foodQuantity, setfoodQuantity] = useState("");
  const [foodDescription, setfoodDescription] = useState("");
  const [foodImage, setfoodImage] = useState("");
  const [foodCategory, setfoodCategory] = useState("");
  const [accounttype, setaccounttype] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Giveaway", value: "Giveaway" },
    { label: "Sell", value: "sell" },
  ]);

  const [delivery, setDelivery] = useState(true);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const setToastmsg = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs write permission",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else {
      return true;
    }
  };

  const setImage = async() => {
    let options = {
      mediaType: "photo",
      quality: 1,
      includeBase64: true,
    };
    let isCameraPermitted = await requestExternalWritePermission();
    if (isCameraPermitted) { 
      launchImageLibrary(options, (response) => {
        console.log("Response = ", response);
        if (response.didCancel) {
          alert("User cancelled image picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          alert(response.errorMessage);
          return;
        }
        setfoodImage(response.assets[0].base64);
      });
    }
  };

  //   expoImagePicker.launchImageLibraryAsync(options, (response) => {
  //   if (response.didCancel) {
  //     setToastmsg("User cancelled image picker");
  //   } else if (response.errorCode == "permission") {
  //     setToastmsg("Permission not satisfied");
  //   }  else if (response.errorCode == "others") {
  //     setToastmsg(response.errorMessage);
  //   } else {
  //     setfoodImage(response.assets[0].base64);
  //   }
  // // });

  return (
    fontsLoaded && (
      <>
        <View style={styles.container}>
          <StatusBar
            barStyle={"dark-content"}
            backgroundColor={Colors.DEFAULT_WHITE}
            translucent
          ></StatusBar>
          <Separator height={StatusBar.currentHeight} />
          <View style={styles.headerContainer}>
            <IonIcons
              name="chevron-back-outline"
              size={30}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={styles.headertitle}>Add Your Food</Text>
          </View>
          <View style={styles.inputImageContainer}>
            <TouchableHighlight
              underlayColor="rgba(0,0,0,0)"
              onPress={() => setImage()}
            >
              <View style={styles.inputImageSubContainer}>
                <IonIcons
                  name="image-outline"
                  size={22}
                  color={Colors.DEFAULT_GREY}
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.inputImageText}>Select Food Image</Text>
              </View>
              {/* <TextInput
              onChangeText={(text) => {
                setfoodImage(text);
              }}
              // onEndEditing={() => }
              value={foodImage}
              placeholder="Select Food Image"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            /> */}
            </TouchableHighlight>
          </View>
          <Separator height={15} />
          <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
              <IonIcons
                name="md-fast-food-outline"
                size={22}
                color={Colors.DEFAULT_GREY}
                style={{ marginRight: 10 }}
              />
              <TextInput
                onChangeText={(text) => {
                  setfoodName(text);
                }}
                // onEndEditing={() => }
                value={foodName}
                placeholder="Food Name"
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={styles.inputText}
              />
            </View>
          </View>
          <Separator height={15} />
          <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
              <IonIcons
                name="pricetags-outline"
                size={22}
                color={Colors.DEFAULT_GREY}
                style={{ marginRight: 10 }}
              />
              <TextInput
                onChangeText={(text) => {
                  setfoodPrice(text);
                }}
                // onEndEditing={() => }
                value={foodPrice}
                placeholder="Food Price"
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={styles.inputText}
              />
            </View>
          </View>
          <Separator height={15} />
          <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
              <MaterialIcons
                name="details"
                size={22}
                color={Colors.DEFAULT_GREY}
                style={{ marginRight: 10 }}
              />
              <TextInput
                onChangeText={(text) => {
                  setfoodDescription(text);
                }}
                // onEndEditing={() => }
                value={foodDescription}
                placeholder="Food Description"
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={styles.inputText}
              />
            </View>
          </View>
          <Separator height={15} />
          <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
              <MaterialIcons
                name="format-list-numbered"
                size={22}
                color={Colors.DEFAULT_GREY}
                style={{ marginRight: 10 }}
              />
              <TextInput
                onChangeText={(text) => {
                  setfoodQuantity(text);
                }}
                // onEndEditing={() => }
                value={foodQuantity}
                placeholder="Food Quantity"
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={styles.inputText}
              />
            </View>
          </View>
          <Separator height={15} />
          <DropDownPicker
            style={styles.inputContainer}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholderStyle={styles.dropdownstyles}
            listParentLabelStyle={styles.dropdownstyles}
            dropDownContainerStyle={styles.dropdowncontainerstyle}
            labelStyle={styles.dropdownstyles}
            placeholder="Select Food Category"
            onSelectItem={(item) => {
              // setError(true);
              // setFieldName("accounttype");
              // console.log(item.value);
              setfoodCategory(item.value);
            }}
          />
          <TouchableOpacity style={styles.signinButton}>
            <Text style={styles.signinButtonText}>Upload Food</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  );
};

export default InsertFoddItemScreen;

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
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputImageSubContainer: {
    flexDirection: "column",
    marginVertical: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    height: Display.setHeight(8),
    marginHorizontal: 20,
    width: Display.setWidth(90),
    borderRadius: 8,
    borderWidth: 0.5,
    justifyContent: "center",
    borderColor: Colors.LIGHT_GREY2,
  },
  inputImageContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    paddingTop: 20,
    height: Display.setHeight(20),
    marginHorizontal: 20,
    width: Display.setWidth(90),
    borderRadius: 8,
    borderWidth: 0.5,

    justifyContent: "center",
    flexDirection: "row",
    borderColor: Colors.LIGHT_GREY2,
  },

  dropdownstyles: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  dropdowncontainerstyle: {
    width: Display.setWidth(90),
    marginLeft: 20,
    justifyContent: "center",
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: "Poppins_700Bold",
  },
  inputImageText: {
    fontSize: 18,
    color: Colors.DEFAULT_GREY,
  },
});
