
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View , Button ,StatusBar, Image, TouchableOpacity} from 'react-native';
import { Display } from '../utils';
import {Colors,Images,Fonts} from '../content'
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
  } from '@expo-google-fonts/poppins';
  
  



const SplashScreen = ()=> {


    let [fontsLoaded] = useFonts({
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
      });

  
  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent>

        </StatusBar>
        <Image source={Images.PLATE}
        resizeMode="contain"
        style={styles.image}/>
        <Text style={
            styles.titletext
        }>SHARE MEAL</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.DEFAULT_GREEN,
    },
    image:
    {
        height:Display.setHeight(30),
        width:Display.setWidth(60),
    },
    titletext:
    {
        color:Colors.DEFAULT_WHITE,
        fontSize:28,
        fontFamily:'Poppins_600SemiBold'

    }

  });
export default SplashScreen;