import { createStackNavigator, Header } from "@react-navigation/stack";
import {HomeScreen,FoodDetailScreen,FilterScreen ,GoogleMapScreen} from "../screens";





const Stack = createStackNavigator();

const HomeTabNavigator = ()=>
{
    return(
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown:false}}>
                <Stack.Screen name = "HomeScreen" component ={HomeScreen}></Stack.Screen>
                <Stack.Screen name = "FoodDetailScreen" component ={FoodDetailScreen}></Stack.Screen>
                <Stack.Screen name = "FilterScreen" component ={FilterScreen}></Stack.Screen>
                <Stack.Screen name = "GoogleMapScreen" component ={GoogleMapScreen}></Stack.Screen>
            </Stack.Navigator> 
       );
    
}

export default HomeTabNavigator;