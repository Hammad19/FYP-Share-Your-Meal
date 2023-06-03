import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Separator } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Fonts } from "../content";
import { Display } from "../utils";
import { useValidation } from "react-native-form-validator";

import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { resetPassword, resetstatus, sendOtp } from "../store/slices/authSlice";

const ChangePasswordScreen = ({ navigation }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordShown, setisPasswordShown] = useState(false);
  const [checkchanged, setcheckchanged] = useState(false);
  const [isAllValuesNull, setisAllValuesNull] = useState(false);
  const [fieldname, setFieldName] = useState("");
  const [error, setError] = useState("");

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { password, confirmPassword },
  });
  const validateField = () => {
    if (fieldname == "password") {
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
    }
  };

  useEffect(() => {
    validateField();
  }, [password, confirmPassword]);

  const validateNull = () => {
    if (password?.length < 1 || confirmPassword?.length < 1) {
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

  const HandleOnPress = () => {
    setError(false);

    validate({
      password: { minlength: 8, maxlength: 16, required: true },
      confirmPassword: {
        equalPassword: password,
        minlength: 8,
        maxlength: 16,
        required: true,
      },
    });

    setTimeout(() => {
      setisAllValuesNull(false);
    }, 2000);

    validateNull();

    let requestBody = {
      email: state.auth.verificationemail,
      otp: state.auth.otp,
      password,
      confirm_password: confirmPassword,
    };

    if (isFormValid() && password.length > 0 && confirmPassword.length > 0) {
      dispatch(resetPassword(requestBody)).then(() => {
        setcheckchanged(!checkchanged);
      });
    }
  };

  useEffect(() => {
    NavigateToHome();
  }, [checkchanged]);

  const NavigateToHome = () => {
    if (state.auth.isPasswordChanged) {
      Alert.alert("Success", state.auth.error.message);
      navigation.navigate("SigninScreen");
    } else if (state.auth.error.status == "resetpassworderror") {
      Alert.alert("Error", state.auth.error.message);
    }
  };

  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });
  return (
    fontsLoaded && (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.DEFAULT_WHITE}
          translucent
        />
        <Separator height={StatusBar.currentHeight} />
        <View style={styles.headerContainer}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            onPress={() => {
              dispatch(resetstatus());
              navigation.goBack();
            }}
          />
          <Text style={styles.headerTitle}>Change Password</Text>
        </View>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.content}>
          Enter your New Password, so that we can help you to recover your
          Account.
        </Text>
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
        {isAllValuesNull ? (
          <Text style={{ color: "red", fontSize: 15, marginLeft: 25 }}>
            All fields are required
          </Text>
        ) : null}
        <TouchableOpacity style={styles.signinButton} onPress={HandleOnPress}>
          <Text style={styles.signinButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

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
  headerTitle: {
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
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
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
    fontFamily: "Poppins_500Medium",
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
  content: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 20,
  },
});

export default ChangePasswordScreen;
