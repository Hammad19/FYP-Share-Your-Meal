import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Colors, CountryCode } from "../content";
import { FlagItem, Separator } from "../components";
import { Display } from "../utils";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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

const getDropdownStyle = (y) => ({ ...styles.countryDropdown, top: y + 60 });

const RegisterPhoneScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find((country) => country.name === "Pakistan")
  );

  const [inputsContainerY, setInputsContainerY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});
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
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  return (
    fontsLoaded && (
      <View
        style={styles.container}
        onStartShouldSetResponder={({ nativeEvent: { pageX, pageY } }) =>
          closeDropdown(pageX, pageY)
        }
      >
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
          <Text style={styles.headertitle}>Login into Share Your Meal</Text>
        </View>
        <Separator height={StatusBar.currentHeight} />
        <Text style={styles.content}>
          Enter Your Registered Phone Number to Log in
        </Text>
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
            />
          </View>
        </View>
        <TouchableOpacity style={styles.signinButton} activeOpacity={0.8}>
          <Text style={styles.signinButtonText}>Contiue</Text>
        </TouchableOpacity>
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
      </View>
    )
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
    height: 18,
    width: 27,
    marginLeft: 4,
  },
  countryCodeText: {
    fontSize: 13,
    lineHeight: 13 * 1.3,
    color: Colors.DEFAULT_BLACK,
    fontFamily: "Poppins_500Medium",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
  },
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
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: "center",
    alignItems: "center",
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: "POPPINS_MEDIUM",
  },
});
