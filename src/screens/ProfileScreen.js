import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useSelector } from "react-redux";
import { Colors } from "../content";

// import files from '../assets/filesBase64';

const ProfileScreen = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  // const myCustomShare = async() => {
  //   // const shareOptions = {
  //   //   message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
  //   //   url: files.appLogo,
  //   //   // urls: [files.image1, files.image2]
  //   // }

  //   try {
  //    // const ShareResponse = await Share.open(shareOptions);
  //     //console.log(JSON.stringify(ShareResponse));
  //   } catch(error) {
  //     console.log('Error => ', error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 999,
          marginTop: 20,
          marginRight: 20,
        }}>
        <MaterialCommunityIcons.Button
          name="account-edit"
          size={30}
          backgroundColor="transparent"
          color={Colors.DEFAULT_BLACK}
          onPress={() => navigation.navigate("EditProfileScreen")}
        />
      </View>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: auth.user.user_avatar,
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              {auth.user.first_name}
            </Title>
            <Caption style={styles.caption}>{auth.user.accounttype}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {auth.user.location_name}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {auth.user.phone_number}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {auth.user.email}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}>
          <Title>15</Title>
          <Caption>Requests</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Posts</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color={Colors.DEFAULT_GREEN} size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("ReviewScreen")}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color={Colors.DEFAULT_GREEN} size={25} />
            <Text style={styles.menuItemText}>Your Reviews</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color={Colors.DEFAULT_GREEN} size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple> */}
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon
              name="account-check-outline"
              color={Colors.DEFAULT_GREEN}
              size={25}
            />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => {
            navigation.navigate("SigninScreen");
          }}>
          <View style={styles.menuItem}>
            <Icon name="exit-to-app" color={Colors.DEFAULT_GREEN} size={25} />
            <Text style={styles.menuItemText}>Sign Out</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
