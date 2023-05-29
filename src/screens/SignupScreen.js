"use strict";

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from "react-native";
import { useValidation } from "react-native-form-validator";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { React, useEffect, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { reset, userSignup } from "../store/slices/authSlice";
import { Colors, CountryCode } from "../content";
import { FlagItem, Separator } from "../components";
import { Display } from "../utils";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CountryFlag from "react-native-country-flag";

const getDropdownStyle = (y) => ({ ...styles.countryDropdown, top: y + 60 });
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accounttype, setaccounttype] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isAllValuesNull, setisAllValuesNull] = useState(false);
  const [fieldname, setFieldName] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState([
    { label: "Standard User", value: "User" },
    { label: "Charitable Organization", value: "Charitable Organization" },
  ]);

  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find((country) => country.name === "Pakistan")
  );

  const [inputsContainerY, setInputsContainerY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const closeDropdown = (pageX, pageY) => {
    if (isDropdownOpen) {
      if (
        pageX < dropdownLayout?.x ||
        pageX > dropdownLayout?.x + dropdownLayout?.width ||
        pageY < dropdownLayout?.y ||
        pageY > dropdownLayout?.y + dropdownLayout?.height
      ) {
        setIsDropdownOpen(false);
      }
    }
  };
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: {
      userName,
      email,
      password,
      confirmPassword,
      accounttype,
      phoneNumber,
    },
  });

  const validateNull = () => {
    if (
      userName?.length < 1 ||
      email?.length < 1 ||
      password?.length < 1 ||
      confirmPassword?.length < 1 ||
      accounttype?.length < 1 ||
      phoneNumber?.length < 1
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
    NavigatetoSignInScreen();
  }, [state]);

  const NavigatetoSignInScreen = () => {
    if (state.auth.error.status == "error") {
      Alert.alert("Error", state.auth.error.message);
    } else if (state.auth.error.status == "signupsuccess") {
      Alert.alert("Success", "Account Created Successfully Please Login");
      navigation.navigate("SigninScreen");
    }
  };

  useEffect(() => {
    validateField();
  }, [
    userName,
    email,
    password,
    confirmPassword,
    accounttype,
    fieldname,
    phoneNumber,
  ]);

  //function which takes field name and validates it
  const validateField = () => {
    if (fieldname == "userName") {
      validate({ userName: { minlength: 3, maxlength: 10, required: true } });
    } else if (fieldname == "email") {
      validate({ email: { email: true, required: true } });
    } else if (fieldname == "password") {
      validate({ password: { minlength: 8, maxlength: 16, required: true } });
    } else if (fieldname == "confirmPassword") {
      validate({
        confirmPassword: {
          equalPassword: password,
          minlength: 8,
          maxlength: 16,
          required: true,
        },
      });
    } else if (fieldname == "accounttype") {
      validate({
        accounttype: { required: true },
      });
    } else if (fieldname == "phoneNumber") {
      validate({
        phoneNumber: { minlength: 10, maxlength: 10, required: true },
      });
    }
  };

  const createAccount = () => {
    setError(false);
    validate({
      userName: { minlength: 3, maxlength: 10, required: true },
      email: { email: true, required: true },
      password: { minlength: 8, maxlength: 16, required: true },
      confirmPassword: {
        equalPassword: password,
        minlength: 8,
        maxlength: 16,
        required: true,
      },
      accounttype: { required: true },
      phoneNumber: { minlength: 13, maxlength: 13, required: true },
    });

    console.log(phoneNumber);

    console.log(isFormValid(), "isFormValid()");
    setTimeout(() => {
      setisAllValuesNull(false);
    }, 2000);

    validateNull();

    let requestBody = {
      first_name: userName,
      email,
      password,
      confirm_password: confirmPassword,
      accounttype: accounttype,
      phone_number: phoneNumber,
    };
    //if i dont get any errors then i will dispatch the action
    if (
      isFormValid() &&
      accounttype.length > 0 &&
      userName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      phoneNumber.length > 0
    ) {
      //dispattch the action and then print the state
      console.log(state, "state");
      console.log(requestBody, "requestBody");
      dispatch(userSignup(requestBody));
    }
  };

  const [isPasswordShown, setisPasswordShown] = useState(false);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });
  return (
    fontsLoaded && (
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
              dispatch(reset());
              navigation.goBack();
            }}
          />
          <Text style={styles.headertitle}>Sign Up</Text>
        </View>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.content}>
          Enter Your email, choose a username and password
        </Text>
        <View
          style={
            isFieldInError("userName") ? styles.error : styles.inputContainer
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
                setFieldName("userName");
                setUserName(text);
              }}
              // onEndEditing={() => }

              value={userName}
              placeholder="Name"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            />
          </View>
        </View>
        {error && ShowError("userName")}
        <Separator height={15} />
        <View
          style={isFieldInError("email") ? styles.error : styles.inputContainer}
        >
          <View style={styles.inputSubContainer}>
            <Feather
              name="mail"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              onChangeText={(text) => {
                setError(true);
                setFieldName("email");
                setEmail(text);
              }}
              value={email}
              placeholder="Email"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            />
          </View>
        </View>

        {error && ShowError("email")}
        <Separator height={15} />
        <View
          style={
            isFieldInError("password") ? styles.error : styles.inputContainer
          }
        >
          <View style={styles.inputSubContainer}>
            <Feather
              name="lock"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              onChangeText={(password) => {
                setError(true);
                setFieldName("password");
                setPassword(password);
              }}
              value={password}
              secureTextEntry={isPasswordShown ? false : true}
              placeholder="Password"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            />
            <Feather
              onPress={() => {
                setisPasswordShown(!isPasswordShown);
              }}
              name={isPasswordShown ? "eye" : "eye-off"}
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 100 }}
            />
          </View>
        </View>
        {error && ShowError("password")}
        <Separator height={15} />
        <View
          style={
            isFieldInError("confirmPassword")
              ? styles.error
              : styles.inputContainer
          }
        >
          <View style={styles.inputSubContainer}>
            <Feather
              name="lock"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              onChangeText={(pass) => {
                setError(true);
                setFieldName("confirmPassword");
                setConfirmPassword(pass);
              }}
              value={confirmPassword}
              secureTextEntry={isPasswordShown ? false : true}
              placeholder="Confirm Password"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            />

            <Feather
              onPress={() => {
                setisPasswordShown(!isPasswordShown);
              }}
              name={isPasswordShown ? "eye" : "eye-off"}
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
          </View>
        </View>
        {error && ShowError("confirmPassword")}
        <Separator height={15} />
        <View
          style={styles.inputsContainer}
          onLayout={({
            nativeEvent: {
              layout: { y },
            },
          }) => setInputsContainerY(y)}
        >
          <TouchableOpacity
            style={styles.countryListContainer}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <CountryFlag
              isoCode={selectedCountry.code}
              size={12}
              style={styles.flagIcon}
            />
            <Text style={styles.countryCodeText}>
              {selectedCountry.dial_code}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={18} />
          </TouchableOpacity>
          <View style={styles.phoneInputContainer}>
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              keyboardType="number-pad"
              onFocus={() => setIsDropdownOpen(false)}
              style={styles.inputText}
              onChangeText={(text) => {
                setPhoneNumber(selectedCountry?.dial_code + text);
                console.log(selectedCountry?.dial_code + text);
              }}
            />
          </View>
        </View>
        {isDropdownOpen && (
          <View
            style={getDropdownStyle(inputsContainerY)}
            onLayout={({
              nativeEvent: {
                layout: { x, y, height, width },
              },
            }) => setDropdownLayout({ x, y, height, width })}
          >
            <FlatList
              data={CountryCode}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                // <Text>{item.name}</Text>
                <FlagItem
                  {...item}
                  onPress={(country) => {
                    setSelectedCountry(country);
                    setIsDropdownOpen(false);
                  }}
                />
              )}
            />
          </View>
        )}
        {error && ShowError("phoneNumber")}
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
          placeholder="Select Account Type"
          onSelectItem={(item) => {
            setError(true);
            setFieldName("accounttype");
            console.log(item.value);
            setaccounttype(item.value);
          }}
        />
        {error && ShowError("accounttype")}
        {isAllValuesNull ? (
          <Text style={{ color: "red", fontSize: 15, marginLeft: 25 }}>
            All fields are required
          </Text>
        ) : null}

        <TouchableOpacity onPress={createAccount} style={styles.signinButton}>
          <Text style={styles.signinButtonText}>Create Account</Text>
        </TouchableOpacity>
        {/* <Text>{getErrorMessages()}</Text> */}
        {/* <Text style={styles.orText}>OR</Text> */}
        {/* <TouchableOpacity style={styles.facebookButton}>
          <View style={styles.socialButtonsContainer}>
            <View style={styles.signinButtonLogoContainer}>
              <Image style={styles.signinButtonLogo} source={Images.FACEBOOK} />
            </View>
            <Text style={styles.socialSigninButtonText}>
              Connect with FaceBook
            </Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.googleButton}>
          <View style={styles.socialButtonsContainer}>
            <View style={styles.signinButtonLogoContainer}>
              <Image style={styles.signinButtonLogo} source={Images.GOOGLE} />
            </View>
            <Text style={styles.socialSigninButtonText}>
              Connect with Google
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
    )
  );
};

export default SignupScreen;

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
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 20,
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
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: "Poppins_700Bold",
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: "Poppins_500Medium",
    marginLeft: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  facebookButton: {
    backgroundColor: Colors.FABEBOOK_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: Colors.GOOGLE_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  signinButtonLogo: {
    height: 18,
    width: 18,
  },
  signinButtonLogoContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 2,
    borderRadius: 3,
    position: "absolute",
    left: 25,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  socialSigninButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins_500Medium",
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
