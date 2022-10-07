import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../content";
import CountryCode from "../content";
import CountryFlag from "react-native-country-flag";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { View } from "react-native-web";

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
      <CountryFlag isoCode={code} size={16} style={styles.flagImage} />
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
    height: 20,
    width: 25,
    marginRight: 10,
    marginTop: 5,
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
