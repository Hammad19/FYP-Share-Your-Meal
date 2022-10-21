import React from "react";
import {ScrollView ,Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Entypo as Icon } from "@expo/vector-icons";
import { Colors, Images } from "../content";
import { Display } from "../utils";

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
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    marginTop:-132,
    overflow: "hidden",
  },

  // headercontainer code
  headerContainer: {
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical:50,
  
    backgroundColor: "transparent",
    
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: "Poppins_600SemiBold",
    marginTop: 20,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
   lineHeight: 16 * 1.4,
    fontFamily: "Poppins_400Regular ",
    overflow: "hidden",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "grey",
    marginLeft: 4,
    marginRight: 16,
  },
  smallDivider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16,
    width: width * 0.25,
  },
  divider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16,
  },
  host: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 76 / 2,
  },
  mediumText: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: "Poppins_500Medium",
  },

  image: { 
    //lie image in between the headercontainer
  
   height:400,
   width : Display.setWidth(100),
    resizeMode: "cover",
    top: 0,
  },
});

export default ({route,navigation}) => {

    const { postImage } = route.params;
 
  return (
<>

    <View style={styles.headerContainer}>
    <Icon
      name="chevron-left"
      size={30}
      color={Colors.DEFAULT_WHITE}
      onPress={() => {
        navigation.goBack();
      }}
    />
    
  </View>
    <ScrollView style={styles.container}>
       
        <Image
              style={styles.image}
              
              source={{uri: "https://media.istockphoto.com/photos/chicken-rice-claypot-picture-id492095676?k=20&m=492095676&s=612x612&w=0&h=AYnS0HeTbtCH3LDvdHk51zRGHTMPuXzfeCaRDR3PbBw="}}
            />
      <Text style={styles.title}>Singaporean Rice</Text>
      <View style={styles.details}>
        <Icon name="star" color="rgb(255, 56, 92)" size={18} />
        <Text style={styles.detailText}>4.93 (891)</Text>
        <Icon name="medal" color="rgb(255, 56, 92)" size={18} />
        <Text style={styles.detailText}>4.93 (891)</Text>
      </View>
      <View>
        <Text style={styles.text}>
          Singaporean Rice with normal Spices
        </Text>
        <View style={styles.smallDivider} />
        <View style={styles.host}>
          <View>
            
            <Text style={styles.mediumText}>Singaporean Rice</Text>
            <Text style={styles.mediumText}>Givesaway by Hammad</Text>

          </View>
          <Image style={styles.avatar} source={{uri: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/people19.png"}} />
        </View>
        <View style={styles.divider} />
        <Text style={styles.text}>
        Singaporean Rice Recipe is way more delicate than the typical Singapore recipes. Pakistani taste of desi dishes, the aroma, the combination of flavors and the presentation of Pakistani recipes has no match with any of the Singaporean recipes. Singaporean Rice is a delicacy which consists of well-seasoned boiled rice, seasoned boiled noodles, layered with each individual’s preferred meat like chicken chunks, prawns or fish and topped with sauces (Mayo, Ketchup, Thousand Island sauce,  Martini  or Chimichuri). Vegetarians can also replace meat with their own preference such as your favorite type of vegetables, mushrooms, cottage cheese aka Paneer.
        </Text>
      </View>
    </ScrollView>
    </>
  );
};