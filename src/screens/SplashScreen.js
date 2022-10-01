
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View , Button ,StatusBar, Image, TouchableOpacity} from 'react-native';
import {Colors,Images,Fonts} from '../content'

const SplashScreen = ()=> {

  
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
        }>SHAREMEAL</Text>
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
        height:150,
        width:150
    },
    titletext:
    {
        color:Colors.DEFAULT_WHITE,
        fontSize:32,
        fontFamily:Fonts.POPPINS_SEMI_BOLD
    }

  });
export default SplashScreen;