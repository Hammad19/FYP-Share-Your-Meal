import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../content";
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

const FlagItem = ({ code, name, dial_code, onPress }) => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress({ code, name, dial_code })}
    >
      <CountryFlag
        isoCode={CountryCode.code}
        size={16}
        style={styles.flagImage}
      />
      <Text style={styles.flagText}>{dial_code}</Text>
      <Text style={styles.flagText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  flagImage: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  flagText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: "POPPINS_MEDIUM",
    marginRight: 10,
  },
});

export default FlagItem;
