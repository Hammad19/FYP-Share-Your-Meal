import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState } from "react";
import IonIcons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";
import { Separator, ToggleButton } from "../components";
import { Colors, Images } from "../content";
import { useDispatch, useSelector } from "react-redux";

import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import { Display } from "../utils";
import { reset, userLogin } from "../store/slices/authSlice";
import { useValidation } from "react-native-form-validator";
import { navigateToCustomTabNavigator } from "../utils/authservice";

const SigninScreen = ({ navigation }) => {
  const [isPasswordShown, setisPasswordShown] = useState(false);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAllValuesNull, setisAllValuesNull] = useState(false);
  const [fieldname, setFieldName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    validateField();
  }, [email, password]);

  const validateField = () => {
    if (fieldname == "email") {
      validate({ email: { email: true, required: true } });
    } else if (fieldname == "password") {
      validate({ password: { minlength: 8, maxlength: 16, required: true } });
    }
  };
  const validateNull = () => {
    if (email?.length < 1 || password?.length < 1) {
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
    NavigatetoHome();
  }, [state.auth]);

  const NavigatetoHome = () => {
    if (state.auth.isLoggedIn) {
      if (state.auth.user.emailVerified) {
        Alert.alert("Success", "User Logged in Successfully ");
        navigateToCustomTabNavigator(navigation);
      } else {
        navigation.navigate("EmailVerificationScreen");
      }
    } else if (state.auth.error.status == "loginerror") {
      Alert.alert("Error", state.auth.error.message);
    }
  };

  const Login = () => {
    dispatch(reset());

    setError(false);

    validate({
      email: { email: true, required: true },
      password: { minlength: 8, maxlength: 16, required: true },
    });

    setTimeout(() => {
      setisAllValuesNull(false);
    }, 2000);

    validateNull();

    let requestBody = {
      email,
      password,
    };

    if (isFormValid() && email.length > 0 && password.length > 0) {
      dispatch(userLogin(requestBody)).then(() => {
        console.log(state, "<--state");
        //wait for the state to change
      });
    }
  };

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { email, password },
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
          <Text style={styles.headertitle}>Sign In</Text>
        </View>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.content}>
          Enter Your Username and Password and Enjoy Having Food
        </Text>
        <View
          style={
            isFieldInError("email") ? styles.error : styles.inputContainer
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
              // onFocus={(password) => {
              //   setError(true);
              //   setFieldName("password");
              //   setPassword(password)
              //   }}
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
        <Text></Text>
        <View style={styles.forgotPasswordContainer}>
          <View style={styles.toggleContainer}>
            <ToggleButton size={0.5} />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>
          <Text
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
            style={styles.forgotPasswordText}>
            Forgot Password
          </Text>
        </View>
        {isAllValuesNull ? (
          <Text style={{ color: "red", fontSize: 15, marginLeft: 25 }}>
            All fields are required
          </Text>
        ) : null}
        <TouchableOpacity onPress={Login} style={styles.signinButton}>
          <Text style={styles.signinButtonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.accountText}>Don't have an Account ?</Text>
          <Text
            onPress={() => {
              dispatch(reset());
              navigation.navigate("SignupScreen");
            }}
            style={styles.signupText}>
            Sign Up
          </Text>
        </View>
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

export default SigninScreen;

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
  forgotPasswordContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_GREY,
    fontFamily: "Poppins_500Medium",
  },
  forgotPasswordText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_GREEN,
    fontFamily: "Poppins_700Bold",
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
  signupContainer: {
    marginHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  accountText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: "Poppins_500Medium",
  },
  signupText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: Colors.DEFAULT_GREEN,
    fontFamily: "Poppins_500Medium",
    marginLeft: 5,
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: "Poppins_500Medium",
    marginLeft: 5,
    alignSelf: "center",
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
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_RED,
    fontFamily: "Poppins_500Medium",
    marginHorizontal: 20,
    marginTop: 3,
    marginBottom: 10,
  },
});
