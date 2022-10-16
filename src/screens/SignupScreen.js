"use strict";

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
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
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { userSignup } from "../store/slices/authSlice";
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
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { userName, email, password, confirmPassword, accounttype },
  });

  const validateNull = () => {
    if (
      userName?.length < 1 ||
      email?.length < 1 ||
      password?.length < 1 ||
      confirmPassword?.length < 1 ||
      accounttype?.length < 1
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
  }, [userName, email, password, confirmPassword, accounttype, fieldname]);

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
    });

    console.log(isFormValid());
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
    };
    //if i dont get any errors then i will dispatch the action
    if (
      isFormValid() &&
      accounttype.length > 0 &&
      userName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
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
          <Text style={styles.headertitle}>Sign Up</Text>
        </View>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.content}>
          Enter Your email, choose a username and password
        </Text>
        <View
          style={
            isFieldInError("userName") ? styles.error : styles.inputContainer
          }>
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
          style={
            isFieldInError("email") ? styles.error : styles.inputContainer
          }>
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
          }>
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
              style={{ marginRight: 10 }}
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
          }>
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
        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity style={styles.facebookButton}>
          <View style={styles.socialButtonsContainer}>
            <View style={styles.signinButtonLogoContainer}>
              <Image style={styles.signinButtonLogo} source={Images.FACEBOOK} />
            </View>
            <Text style={styles.socialSigninButtonText}>
              Connect with FaceBook
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <View style={styles.socialButtonsContainer}>
            <View style={styles.signinButtonLogoContainer}>
              <Image style={styles.signinButtonLogo} source={Images.GOOGLE} />
            </View>
            <Text style={styles.socialSigninButtonText}>
              Connect with Google
            </Text>
          </View>
        </TouchableOpacity>
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
