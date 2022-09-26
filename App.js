import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View , Button ,TouchableOpacity} from 'react-native';

export default function App() {

  const [count, setCount] = useState(0);

  let increment = () =>
  {
    setCount(count+1)
  }

  let decrement = () =>
  {
    setCount(count-1)
  }

  let reset = ()=>
  {
    setCount(0);
  }
  return (
    <View style={styles.container}>
        <TouchableOpacity
         style={styles.button}
         onPress={increment}
        >
         <Text>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text>
            You clicked { count } times
          </Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
});
