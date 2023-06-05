import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
  ToastAndroid,
  ImagePickerIOS,
  ScrollView,
  Alert,
  Image,
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
import * as ImagePicker from "expo-image-picker";
import { PermissionsAndroid } from "react-native";

import { addFood } from "../store/slices/foodSlice";

import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Avatar } from "react-native-paper";
import { updateuserlisting } from "../store/slices/userlistingSlice";
import axios from "axios";

const UpdateFoodScreen = ({ navigation, route }) => {
  const { post } = route.params;

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [foodName, setfoodName] = useState("");
  const [foodPrice, setfoodPrice] = useState("");
  const [foodQuantity, setfoodQuantity] = useState("");
  const [foodDescription, setfoodDescription] = useState("");
  const [foodImage, setfoodImage] = useState(null);
  const [foodCategory, setfoodCategory] = useState("");
  const [foodType, setFoodType] = useState("");
  const [accounttype, setaccounttype] = useState("");
  const [fieldname, setFieldName] = useState("");
  const [isAllValuesNull, setisAllValuesNull] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Giveaway", value: "Free Food" },
    { label: "Sell", value: "Paid Food" },
  ]);
  const [imageToSend, setImageToSend] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState();
  const [items1, setItems1] = useState([
    { label: "Chinese", value: "Chinese" },
    { label: "Desi Food", value: "Desi Food" },
    { label: "Sea Food", value: "Sea Food" },
    { label: "Fast Food", value: "Fast Food" },
    { label: "Vegetables", value: "Vegetables" },
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

  const setImage = async () => {
    let options = {
      mediaType: "photo",
      quality: 1,
      includeBase64: true,
    };

    let isCameraPermitted = await requestExternalWritePermission();
    if (isCameraPermitted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      }).catch((error) => console.log(error));

      if (!result.cancelled) {
        setImageToSend(result);
        setfoodImage(result.uri);
      } else {
        Alert.alert("You Cancelled an Image");
      }
    }
  };

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { foodName, foodPrice, foodQuantity, foodDescription, foodCategory },
  });

  const validateNull = () => {
    if (
      foodName?.length < 1 ||
      foodPrice?.length < 1 ||
      foodQuantity?.length < 1 ||
      foodDescription?.length < 1 ||
      foodCategory?.length < 1
    ) {
      setisAllValuesNull(true);
    } else {
      setisAllValuesNull(false);
    }
  };

  function ShowError(textfieldname) {
    return (
      isFieldInError(textfieldname) && (
        <Text style={{ color: "red", fontSize: 12, marginLeft: 25 }}>
          {getErrorsInField(textfieldname)[0]}
        </Text>
      )
    );
  }

  useEffect(() => {
    validateField();
  }, [foodName, foodPrice, foodQuantity, foodDescription, foodCategory]);

  useEffect(() => {
    setValue(post.is_free == true ? "Free Food" : "Paid Food");
    setValue1(post.food_category);
    setfoodImage(post.food_image);
    setfoodName(post.food_name);
    setfoodPrice(post.food_price.toString());
    setfoodQuantity(post.food_quantity.toString());
    setfoodDescription(post.food_description);
    setfoodCategory(post.food_category);
    setFoodType(value);
  }, []);

  const validateField = () => {
    if (fieldname == "foodName") {
      validate({
        foodName: { required: true, minlength: 2, maxlength: 30 },
      });
    } else if (fieldname == "foodPrice") {
      validate({
        foodPrice: {
          required: true,
          minlength: 1,
          maxlength: 10,
          numbers: true,
        },
      });
    } else if (fieldname == "foodQuantity") {
      validate({
        foodQuantity: {
          required: true,
          minlength: 1,
          maxlength: 10,
          numbers: true,
        },
      });
    } else if (fieldname == "foodDescription") {
      validate({
        foodDescription: { required: true, minlength: 20, maxlength: 300 },
      });
    } else if (fieldname == "foodCategory") {
      validate({
        foodCategory: { required: true },
      });
    }
  };

  const handleUpdateFood = () => {
    setError(false);
    if (foodType == "Free Food") {
      validate({
        foodName: { required: true, minlength: 2, maxlength: 30 },
        foodPrice: {
          required: true,
          minlength: 1,
          maxlength: 10,
          numbers: true,
        },
        foodQuantity: {
          required: true,
          minlength: 1,
          maxlength: 10,
          numbers: true,
        },
        foodDescription: { required: true, minlength: 20, maxlength: 300 },
        foodCategory: { required: true },
      });
    } else if (foodType == "Paid Food") {
      setfoodPrice("0");
      validate({
        foodName: { required: true, minlength: 2, maxlength: 30 },
        // foodPrice: { required: true, minlength: 1, maxlength: 10, numbers: true },
        foodQuantity: {
          required: true,
          minlength: 1,
          maxlength: 10,
          numbers: true,
        },
        foodDescription: { required: true, minlength: 20, maxlength: 300 },
        foodCategory: { required: true },
      });
    }

    console.log(isFormValid());
    setTimeout(() => {
      setisAllValuesNull(false);
    }, 2000);

    validateNull();

    if (
      isFormValid() &&
      foodName.length > 0 &&
      foodDescription.length > 0 &&
      foodPrice.length > 0 &&
      foodQuantity.length > 0 &&
      foodCategory.length > 0
    ) {
      var name = foodImage.split("/").pop();
      console.log("name", name);
      var type = "image/" + name.split(".").pop();
      console.log("type", type);
      //dispattch the action and then print the state
      const formData = new FormData();

      formData.append("profileImg", {
        uri: foodImage,
        type: type,
        name: name,
      });
      axios
        .post("http://192.168.18.40:8080/api/images/food-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          let requestBody = {
            _id: post._id,
            food_name: foodName,
            food_description: foodDescription,
            food_price: foodPrice,
            food_image: response.data.userCreated.profileImg,
            food_category: foodCategory,
            food_quantity: foodQuantity,
            food_shared_by: state.auth.user.email,
            is_free: value == "Free Food" ? true : false,
            phone_number: state.auth.user.phone_number,
          };
          dispatch(updateuserlisting(requestBody));
        })
        .catch((err) => console.log(err));

      // Alert.alert(state.food.message);
    }
  };

  useEffect(() => {
    if (state.userlisting.error.message == "Food updated successfully") {
      Alert.alert("Success", state.userlisting.error.message);
      navigation.goBack();
    }
  }, [state.userlisting.error.message]);

  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={Colors.DEFAULT_WHITE}
          translucent></StatusBar>
        <Separator height={StatusBar.currentHeight} />
        <View style={styles.headerContainer}>
          <IonIcons
            name="chevron-back-outline"
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headertitle}>Update Your Food</Text>
        </View>
        <View style={styles.inputImageContainer}>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0)"
            onPress={() => setImage()}>
            {foodImage == null ? (
              <View style={styles.inputImageSubContainer}>
                <IonIcons name="image-outline" size={50} color="grey" />
                <Text style={styles.inputImageText}>Select Food Image</Text>
              </View>
            ) : (
              <Image
                source={{ uri: foodImage }}
                style={styles.imageContainer}
              />
            )}
          </TouchableHighlight>
        </View>
        <Separator height={15} />
        <View
          style={
            isFieldInError("foodName") ? styles.error : styles.inputContainer
          }>
          <View style={styles.inputSubContainer}>
            <IonIcons
              name="md-fast-food-outline"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              onChangeText={(text) => {
                setError(true);
                setFieldName("foodName");
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
        {error && ShowError("foodName")}
        <Separator height={15} />
        <View
          style={
            isFieldInError("foodPrice") ? styles.error : styles.inputContainer
          }>
          <View style={styles.inputSubContainer}>
            <IonIcons
              name="pricetags-outline"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              //disable this feild when food type is free
              editable={value == "Free Food" ? false : true}
              onChangeText={(text) => {
                setError(true);
                setFieldName("foodPrice");
                setfoodPrice(text);
              }}
              // onEndEditing={() => }
              value={foodPrice.toString()}
              placeholder="Food Price"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            />
          </View>
        </View>
        {error && ShowError("foodPrice")}
        <Separator height={15} />
        <View
          style={
            isFieldInError("foodDescription")
              ? styles.error
              : styles.inputContainer
          }>
          <View style={styles.inputSubContainer}>
            <MaterialIcons
              name="details"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              onChangeText={(text) => {
                setError(true);
                setFieldName("foodDescription");
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
        {error && ShowError("foodDescription")}
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
                setError(true);
                setFieldName("foodQuantity");
                setfoodQuantity(text);
              }}
              // onEndEditing={() => }
              value={foodQuantity.toString()}
              placeholder="Food Quantity"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            />
          </View>
        </View>
        {error && ShowError("foodQuantity")}
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
          dropDownContainerStyle={styles.dropdowncontainer1style}
          labelStyle={styles.dropdownstyles}
          placeholder="Select Food Type"
          onSelectItem={(item) => {
            // setError(true);
            // setFieldName("accounttype");
            // console.log(item.value);
            setFoodType(item.value);
            if (item.value == "Free Food") {
              setfoodPrice("0");
            } else {
              setfoodPrice("");
            }
          }}
        />

        {error && ShowError("foodCategory")}
        <Separator height={15} />

        <DropDownPicker
          style={styles.inputContainer}
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
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
        {isAllValuesNull ? (
          <Text style={{ color: "red", fontSize: 15, marginLeft: 25 }}>
            All fields are required
          </Text>
        ) : null}
        <TouchableOpacity
          onPress={handleUpdateFood}
          style={styles.signinButton}>
          <Text style={styles.signinButtonText}>Update Food</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default UpdateFoodScreen;

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
    marginHorizontal: 20,
    width: Display.setWidth(90),
    marginLeft: 20,
    justifyContent: "center",
  },

  dropdowncontainer1style: {
    //open this dropdowncontainer on top
    top: -80,
    marginHorizontal: 20,
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
    marginTop: 15,
    marginBottom: 15,
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
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  error: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    width: Display.setWidth(90),
    borderRadius: 8,
    borderColor: Colors.DEFAULT_RED,
    borderWidth: 1,
    justifyContent: "center",
  },
});
