import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  StatusBar,
  Alert,
  Image,
  FlatList,
} from "react-native";

import { useTheme } from "react-native-paper";
import IonIcons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { launchImageLibrary } from "react-native-image-picker";
import { PermissionsAndroid } from "react-native";
import { FlagItem, Separator } from "../components";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { Colors, CountryCode } from "../content";
import { Display } from "../utils";
import * as ImagePicker from "expo-image-picker";
import { useValidation } from "react-native-form-validator";
import CountryFlag from "react-native-country-flag";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { axiosInstance } from "../utils/api/axiosInstance";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/slices/authSlice";
import { useEffect } from "react";
// import ImagePicker from 'react-native-image-crop-picker';

const EditProfileScreen = ({ navigation }) => {
  const [foodImage, setfoodImage] = useState(null);
  const [imageToSend, setImageToSend] = useState(null);
  const [fieldname, setFieldName] = useState("");

  //FirstName
  const [firstName, setFirstName] = useState("");
  //lastname
  const [lastName, setLastName] = useState("");
  //phone number
  const [phoneNumber, setPhoneNumber] = useState("");

  const [error, setError] = useState("");

  const getDropdownStyle = (y) => ({ ...styles.countryDropdown, top: y + 60 });
  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find((country) => country.name === "Pakistan")
  );

  //add useeffect and set food image
  useEffect(() => {
    if (state.auth.user.user_avatar != null) {
      setfoodImage(state.auth.user.user_avatar);

      setFirstName(state.auth.user.first_name);

      setLastName(state.auth.user.last_name);
    }
  }, []);

  const [inputsContainerY, setInputsContainerY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});
  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Share Your Meal App Camera Permission",
            message:
              "App needs access to your camera " +
              "so you can upload awesome food.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };

  const setImagee = async () => {
    let options = {
      mediaType: "photo",
      quality: 1,
      includeBase64: true,
    };

    let isCameraPermitted = await requestExternalWritePermission();
    if (isCameraPermitted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        //let cameraResult = await ImagePicker.launchCameraAsync({
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
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const updateProfileAction = () => {
    setError(false);

    // console.log(isFormValid());
    // setTimeout(() => {
    //   setisAllValuesNull(false);
    // }, 2000);

    // validateNull();

    if (firstName.length > 0 && lastName.length > 0) {
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
        .post("http://192.168.10.10:8080/api/images/food-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          let requestBody = {
            email: state.auth.user.email,
            first_name: firstName,
            last_name: lastName,
            user_avatar: response.data.userCreated.profileImg,
          };

          dispatch(updateProfile(requestBody));
          Alert.alert("Profile Updated Successfully");
          navigation.navigate("ProfileScreen");
        })
        .catch((err) => console.log(err));

      // Alert.alert(state.food.message);
    } else {
      console.log("sfsdsd");
    }
  };

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { firstName, lastName, phoneNumber },
  });

  // const [image, setImage] = useState(
  //   "https://api.adorable.io/avatars/80/abott@adorable.png"
  // );
  const { colors } = useTheme();
  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     console.log(image);
  //     setImage(image.path);
  //     this.bs.current.snapTo(1);
  //   });
  // }

  const choosePhotoFromLibrary = () => {
    setImagee();
  };

  // const renderInner = () => (
  //   <View style={styles.panel}>
  //     <View style={{ alignItems: "center" }}>
  //       <Text style={styles.panelTitle}>Upload Photo</Text>
  //       <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
  //     </View>
  //     <TouchableOpacity
  //       style={styles.panelButton}
  //       // onPress={takePhotoFromCamera}
  //     >
  //       <Text style={styles.panelButtonTitle}>Take Photo</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       style={styles.panelButton}
  //       onPress={choosePhotoFromLibrary}
  //     >
  //       <Text style={styles.panelButtonTitle}>Choose From Library</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       style={styles.panelButton}
  //       onPress={() => console.log("Hello World")}
  //     >
  //       <Text style={styles.panelButtonTitle}>Cancel</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  // const renderHeader = () => (
  //   <View style={styles.header}>
  //     <View style={styles.panelHeader}>
  //       <View style={styles.panelHandle} />
  //     </View>
  //   </View>
  // );

  // const bs = React.createRef();
  // const fall = new Animated.Value(1);

  function ShowError(textfieldname) {
    return (
      isFieldInError(textfieldname) && (
        <Text style={{ color: "red", fontSize: 12, marginLeft: 25 }}>
          {getErrorsInField(textfieldname)[0]}
        </Text>
      )
    );
  }

  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.headertitle}>Update Profile</Text>
      </View>
      <View style={styles.inputImageContainer}>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0)"
          onPress={() => setImagee()}
        >
          {foodImage == null ? (
            <View style={styles.inputImageSubContainer}>
              <IonIcons name="image-outline" size={50} color="grey" />
              <Text style={styles.inputImageText}>Select Your Profile</Text>
            </View>
          ) : (
            <Image source={{ uri: foodImage }} style={styles.imageContainer} />
          )}
        </TouchableHighlight>
      </View>
      <Separator height={15} />
      <View
        style={
          isFieldInError("firstName") ? styles.error : styles.inputContainer
        }
      >
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            onChangeText={(text) => {
              setError(true);
              setFieldName("firstName");
              setFirstName(text);
            }}
            // onEndEditing={() => }

            value={firstName}
            placeholder="First Name"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
          />
        </View>
      </View>
      {error && ShowError("firstName")}
      <Separator height={15} />

      <View
        style={
          isFieldInError("lastName") ? styles.error : styles.inputContainer
        }
      >
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            onChangeText={(text) => {
              setError(true);
              setFieldName("lastName");
              setLastName(text);
            }}
            // onEndEditing={() => }

            value={lastName}
            placeholder="Last Name"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
          />
        </View>
      </View>
      {error && ShowError("lastName")}
      <Separator height={15} />

      <TouchableOpacity
        onPress={updateProfileAction}
        style={styles.signinButton}
      >
        <Text style={styles.signinButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

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
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    width: Display.setWidth(90),
    borderRadius: 8,
    borderWidth: 0.5,
    justifyContent: "center",
    borderColor: Colors.LIGHT_GREY2,
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
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
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
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    imageSizeMode: "cover",
  },
  inputImageText: {
    fontSize: 18,
    color: Colors.DEFAULT_GREY,
  },
  inputImageSubContainer: {
    flexDirection: "column",
    marginVertical: 35,
    alignItems: "center",
    justifyContent: "center",
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

  inputsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  countryCodeText: {
    fontSize: 13,
    lineHeight: 13 * 1.3,
    color: Colors.DEFAULT_BLACK,
    fontFamily: "Poppins_500Medium",
  },
  countryListContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    width: Display.setWidth(22),
    marginRight: 10,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    flexDirection: "row",
  },
  phoneInputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    height: Display.setHeight(6),
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    flex: 1,
  },
  flagIcon: {
    height: 18,
    width: 27,
    marginLeft: 4,
  },
  // inputText: {
  //   fontSize: 18,
  //   textAlignVertical: "center",
  //   padding: 0,
  //   height: Display.setHeight(6),
  //   color: Colors.DEFAULT_BLACK,
  // },
  countryDropdown: {
    backgroundColor: Colors.LIGHT_GREY,
    position: "absolute",
    width: Display.setWidth(80),
    height: Display.setHeight(50),
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    zIndex: 3,
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
});
