import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { ScreenStackHeaderLeftView } from "react-native-screens";
import { SplashScreen } from "../screens";


const Stack = createStackNavigator();

const Navigators = ()=>
{
    return(<NavigationContainer >
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name = "S" component ={SplashScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>);
    
}

export default Navigators;