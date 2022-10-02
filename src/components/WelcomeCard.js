import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors, Images } from "../content";
import { Display } from "../utils";
import {
  useFonts,
  Poppins_300Light,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const WelcomeCard = ({ title, content, image }) => {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,

    Poppins_700Bold,
  });
  return (
    fontsLoaded && (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={Images[image]}
          resizeMode="contain"
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    )
  );
};

export default WelcomeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Display.setWidth(100),
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
  },
  content: {
    fontSize: 18,
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    marginHorizontal: 20,
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
});
