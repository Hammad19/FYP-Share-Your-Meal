import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Colors, CountryCode, Images } from "../content";
import { Separator } from "../components";
import { Display } from "../utils";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StaticImageService } from "../services";
<<<<<<< HEAD
import CountryFlag from "react-native-country-flag";
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
//import {getFlagIcon} from "../services/StaticImageService"
const RegisterPhoneScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find((country) => country.name === "Pakistan")
  );
=======
import {
  useFonts, 
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

const RegisterPhoneScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });
>>>>>>> 5c08f68f770dd6acaa63660ff342bd44f1866d91
  return (
    fontsLoaded && (
      <View style={styles.container}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={Colors.DEFAULT_WHITE}
          translucent></StatusBar>

<<<<<<< HEAD
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <IonIcons
          name="chevron-back-outline"
          size={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headertitle}>Login into Share Your Meal</Text>
      </View>
      <Separator height={StatusBar.currentHeight} />
      <Text style={styles.content}>
        Enter Your Registered Phone Number to Log in
      </Text>
      <View style={styles.inputsContainer}>
        <TouchableOpacity style={styles.countryListContainer}>
          <CountryFlag isoCode={selectedCountry.code} size={16} style={styles.flagIcon} />
          <Text>{selectedCountry.dial_code}</Text>
          <MaterialIcons />
        </TouchableOpacity>
        <View style={styles.phoneInputContainer}>
          <TextInput />
        </View>
      </View>
    </View>
=======
        <Separator height={StatusBar.currentHeight} />
        <View style={styles.headerContainer}>
          <IonIcons
            name="chevron-back-outline"
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headertitle}>Login into Share Your Meal</Text>
        </View>
        <Separator height={StatusBar.currentHeight} />
        <Text style={styles.content}>
          Enter Your Registered Phone Number to Log in
        </Text>
        <View style={styles.inputsContainer}>
          <TouchableOpacity style={styles.countryListContainer}>
            <Image
              source={{ uri: StaticImageService.getFlagIcon("CA") }}
              style={styles.flagIcon}
            />
            <Text></Text>
            <MaterialIcons />
          </TouchableOpacity>
          <View style={styles.phoneInputContainer}>
            <TextInput />
          </View>
        </View>
      </View>
    )
>>>>>>> 5c08f68f770dd6acaa63660ff342bd44f1866d91
  );
};

export default RegisterPhoneScreen;

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
  content: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 50,
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
    height: 20,
<<<<<<< HEAD
    width: 30,
  },
  countryCodeText:{
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,

  fontFamily: "Poppins_500Medium"
  }
=======
    width: 20,
  },
>>>>>>> 5c08f68f770dd6acaa63660ff342bd44f1866d91
});
