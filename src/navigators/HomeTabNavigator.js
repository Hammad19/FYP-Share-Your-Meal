import { createStackNavigator, Header } from "@react-navigation/stack";
import {HomeScreen} from "../screens";
import FoodDetailScreen from "../screens/FoodDetailScreen";
import UpdateFoodScreen from "../screens/UpdateFoodScreen";




const Stack = createStackNavigator();

const HomeTabNavigator = ()=>
{
    return(
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown:false}}>
                <Stack.Screen name = "HomeScreen" component ={HomeScreen}></Stack.Screen>
                <Stack.Screen name = "FoodDetailScreen" component ={FoodDetailScreen}></Stack.Screen>
                <Stack.Screen name = "UpdateFoodScreen" component ={UpdateFoodScreen}></Stack.Screen>
            </Stack.Navigator> 
       );
    
}

export default HomeTabNavigator;