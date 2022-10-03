import { StyleSheet, Text, View ,StatusBar} from 'react-native'
import React from 'react'
import { Colors } from '../content'
import { Separator } from '../components'
import { Display } from '../utils'
import IonIcons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";


const SignupScreen = ({navigation}) => {
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
          <Text style={styles.headertitle}>Sign Up</Text>
        </View>
    </View>
  )
}

export default SignupScreen

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
})