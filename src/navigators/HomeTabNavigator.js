import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { ScreenStackHeaderLeftView } from "react-native-screens";
import { SplashScreen,WelcomeScreen,SigninScreen, SignupScreen, ForgotPasswordScreen ,RegisterPhoneScreen, HomeScreen} from "../screens";
import FoodDetailScreen from "../screens/FoodDetailScreen";
import VerificationScreen from "../screens/VerificationScreen";
import CustomTabNavigator from "./CustomTabNavigator";



const Stack = createStackNavigator();

const HomeTabNavigator = ()=>
{
    return(
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown:false}}>
                <Stack.Screen name = "HomeScreen" component ={HomeScreen}></Stack.Screen>
                <Stack.Screen name = "FoodDetailScreen" component ={FoodDetailScreen}></Stack.Screen>
            </Stack.Navigator> 
       );
    
}

export default HomeTabNavigator;