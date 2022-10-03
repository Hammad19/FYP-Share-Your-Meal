import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import React from "react";
import { Colors } from "../content";
import { Separator } from "../components";
import { Display } from "../utils";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StaticImageService } from "../services";

const RegisterPhoneScreen = ({ navigation }) => {
  return (
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
        <Text style={styles.headertitle}>Login into Share Your Meal</Text>
      </View>
      <Separator height={StatusBar.currentHeight} />
      <Text style={styles.content}>
        Enter Your Registered Phone Number to Log in
      </Text>
      <View style={styles.inputsContainer}>
        <TouchableOpacity style={styles.countryListContainer}>
          <Image source={{uri: StaticImageService.getFlagIcon('CA')}} style={styles.flagIcon} />
          <Text></Text>
          <MaterialIcons/>
        </TouchableOpacity>
        <View style={styles.phoneInputContainer}>
          <TextInput/>
        </View>
      </View>
    </View>  
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
  inputsContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 50,
  },
  countryListContainer:{
    backgroundColor: Colors.LIGHT_GREY,
    width: Display.setWidth(22),
    marginRight: 10,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent:'space-evenly',
    alignItems:'center',
    borderWidth: 0.5,
    borderColor:Colors.LIGHT_GREY2,
    flexDirection:"row",
  },
  phoneInputContainer:{
    backgroundColor: Colors.LIGHT_GREY,
    height: Display.setHeight(6),
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent:'center',
    borderWidth: 0.5,
    borderColor:Colors.LIGHT_GREY2,
    flex: 1,
  },
  flagIcon:{
    height: 20,
    width: 20,
  }
});
