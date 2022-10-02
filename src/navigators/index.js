import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { ScreenStackHeaderLeftView } from "react-native-screens";
import { SplashScreen,WelcomeScreen,SigninScreen } from "../screens";


const Stack = createStackNavigator();

const Navigators = ()=>
{
    return(<NavigationContainer >
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name = "SplashScreen" component ={SplashScreen}></Stack.Screen>
                <Stack.Screen name = "WelcomeScreen" component ={WelcomeScreen}></Stack.Screen>
                <Stack.Screen name = "SigninScreen" component ={SigninScreen}></Stack.Screen>
            </Stack.Navigator> 
        </NavigationContainer>);
    
}

export default Navigators;