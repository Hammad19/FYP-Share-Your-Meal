import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../content';
import {useFonts, Poppins_700Bold, Poppins_500Medium } from "@expo-google-fonts/poppins";


const HomeScreen = () => {
  const [delivery,setDelivery] = useState(true);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });
  return (
fontsLoaded&&
    <>
    <View style={styles.container}>
      
   
    
      <TouchableOpacity
      onPress={()=>setDelivery(true)}>
      <View style = {{...styles.deliveryButton,backgroundColor:delivery?Colors.DEFAULT_GREEN:Colors.DEFAULT_GREY}}>
        <Text style = {styles.deliveryText}>Buy</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=>setDelivery(false)}>
      <View style = {{...styles.deliveryButton,backgroundColor:delivery?Colors.DEFAULT_GREY:Colors.DEFAULT_GREEN}}>
        <Text style = {styles.deliveryText}>Free</Text>
      </View>
      </TouchableOpacity>
      </View>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:
    {
        marginTop:50,
        flexDirection:'row',
        justifyContent:'space-evenly'
        

    },
    deliveryButton:
    {
      
        paddingHorizontal:20,
        borderRadius:16,
        paddingVertical:5,
    },
    deliveryText:
    {
      color:Colors.DEFAULT_BLACK,
      marginLeft:5,
      fontSize:16,
      fontFamily: 'Poppins_500Medium',
    }


})