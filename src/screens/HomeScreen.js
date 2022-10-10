import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        marginTop:100,
        

    },
    deliveryButton:
    {
        paddingHorizontal:20,
        borderRadius:15,
        paddingVertical:5,
    }


})