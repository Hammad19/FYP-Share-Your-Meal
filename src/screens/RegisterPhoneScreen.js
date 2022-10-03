import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { Colors } from "../content";
import { Separator } from "../components";
import { Display } from "../utils";
import IonIcons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const RegisterPhoneScreen = ({navigation}) => {
  return (
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
        <Text style={styles.headertitle}>Login into Share Your Meal</Text>
      </View>
      <Text style={styles.content}>
          Enter Your Registered Phone Number to Log in
        </Text>
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
});
