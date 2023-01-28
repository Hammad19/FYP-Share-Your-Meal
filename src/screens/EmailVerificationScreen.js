import React, { useRef, useState } from "react";
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
import { Colors } from "../content";
import { Display } from "../utils";
import {useSelector, useDispatch } from "react-redux";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import { resetstatus, sendOtpforEmailVerification, verifyOtp, verifyOtpforEmailVerification } from "../store/slices/authSlice";

const EmailVerificationScreen = ({navigation
}) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: ""});
  const state = useSelector((state) => state);
  const[checkchanged,setcheckchanged] = useState(false);
  const dispatch = useDispatch();

useEffect(() => {
    let requestBody = {
        email: state.auth.user.email,
        };
        dispatch(sendOtpforEmailVerification(requestBody));
    }, [])


  useEffect(() => {
    NavigateToHome();
  }, [checkchanged])

 

  const NavigateToHome = () => {
    
    if(state.auth.isOtpVerified)
    {
      Alert.alert("Success", state.auth.error.message);
      navigation.navigate("CustomTabNavigator");
    }
    else if(state.auth.error.status == "otpverifiedError")
    {
      Alert.alert("Error", state.auth.error.message);
    }
  };
  const handleVerifyButton = () => 
  {
      const value = Object.entries(otp).map(([k, v]) => (`${v}`)).join('')
      console.log(value)

      let requestBody = {
        email: state.auth.user.email,
        otp: value,
      };

      dispatch(verifyOtpforEmailVerification(requestBody)).then(() => {setcheckchanged(!checkchanged)});
      
  }

  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
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
              //dispatch(resetstatus());
              navigation.goBack()
                        
                          }}
          />
          <Text style={styles.headerTitle}>OTP Verification</Text>
        </View>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.content}>
          For Account Verification We have Just Sent You an OTP. Enter the OTP number just sent you at{" "}
          <Text style={styles.phoneNumberText}>{state.auth.user.email}</Text>
        </Text>
        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 1: text });
                text && secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={secondInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 2: text });
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 3: text });
                text
                  ? fourthInput.current.focus()
                  : secondInput.current.focus();
              }}
            />
          </View>

          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 4: text });
                text
                  ? fifthInput.current.focus()
                  : thirdInput.current.focus();
              }}
            />
          </View>


          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fifthInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 5: text });
                !text && fourthInput.current.focus();
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.signinButton}
          onPress={handleVerifyButton}>
          <Text style={styles.signinButtonText}>Verify</Text>
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
  phoneNumberText: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_YELLOW,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    borderRadius: 5,
    borderColor: Colors.DEFAULT_GREEN,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
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
});

export default EmailVerificationScreen;
