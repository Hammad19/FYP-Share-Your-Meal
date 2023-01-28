import * as React from 'react';
import { Settings, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors } from '../content';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import HomeTabNavigator from './HomeTabNavigator';
import AddFoodScreen from '../screens/AddFoodScreen';
import AddFoodNavigator from './AddFoodNavigator';
import { ProfileScreen } from '../screens';
import ProfileNavigator from './ProfileNavigator';

function Orders() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Orders</Text>
    </View>
  );
}

const homeName = "Home";
const profileName = "Profile";
const settingsName = "Share";
const ordersName = "Orders";

const Tab = createBottomTabNavigator();

export default function  CustomTabNavigator() {
  return (
    <Tab.Navigator 
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: Colors.DEFAULT_GREEN,
          tabBarInactiveTintColor:'gray',
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 14
          },
          tabBarStyle: { padding: 10, height: 65},
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            else if (rn === ordersName) {
              iconName = focused ? 'list' : 'list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={26} color={color} />;
          },
        })}
       >

        <Tab.Screen name={homeName} component={HomeTabNavigator} /> 
        <Tab.Screen name={settingsName} component={AddFoodNavigator} />
        <Tab.Screen name={ordersName} component={Orders} />
        <Tab.Screen name={profileName} component={ProfileNavigator} />

      </Tab.Navigator>
  );
}

