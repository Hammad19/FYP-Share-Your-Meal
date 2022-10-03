import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { React, useState, useRef } from "react";
import { Colors, General } from "../content";
import { FlatList } from "react-native-gesture-handler";
import { WelcomeCard, Separator } from "../components";
import { Display } from "../utils";
import {useFonts, Poppins_700Bold, Poppins_500Medium } from "@expo-google-fonts/poppins";

const pageStyle = (isActive) =>
  isActive
    ? styles.page
    : { ...styles.page, backgroundColor: Colors.DEFAULT_GREY };

const Pagination = ({ index }) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        )
      )}
    </View>
  );
};
const WelcomeScreen = ({navigation}) => {

  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();
  const onViewRef = useRef(({ changed }) => {
    // console.log("changed", changed);
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
    });
  };
  return (
    fontsLoaded&&
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={Colors.DEFAULT_WHITE}
      ></StatusBar>
      <Separator height={StatusBar.currentHeight} />
      <Separator height={Display.setHeight(8)} />
      <View style={styles.WelcomeListContainer}>
        <FlatList
          ref={welcomeList}
          data={General.WELCOME_CONTENTS}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          viewabilityConfig={viewConfigRef.current}
          overScrollMode="never"
          onViewableItemsChanged={onViewRef.current}
          renderItem={({ item }) => <WelcomeCard {...item} />}
        />
      </View>
      <Separator height={Display.setHeight(8)} />
      <Pagination index={welcomeListIndex}></Pagination>
      <Separator height={Display.setHeight(8)} />
      {welcomeListIndex === 2 ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.gettingStartedButton}
          onPress={()=>{navigation.navigate("SigninScreen")}}
        >
          <Text style={styles.gettingStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ marginLeft: 10 }}
            onPress={() => welcomeList.current.scrollToEnd()}
          >
            <Text style={styles.buttonText}>SKIP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pageScroll();
            }}
            activeOpacity={0.8}
            style={styles.button}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  pageContainer: {
    flexDirection: "row",
  },
  WelcomeListContainer: {
    height: Display.setHeight(60),
  },
  page: {
    height: 8,
    width: 15,
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 32,
    marginHorizontal: 5,
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Display.setWidth(90),
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    lineHeight: 16 * 1.4,
  },
  button: {
    backgroundColor: Colors.LIGHT_GREEN,
    paddingVertical: 20,
    paddingHorizontal: 11,
    borderRadius: 32,
  },
  gettingStartedButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  gettingStartedButtonText: {
    fontSize: 20,
    color: Colors.DEFAULT_WHITE,
    lineHeight: 20 * 1.4,
    fontFamily: 'Poppins_500Medium',
  },
});
