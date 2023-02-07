import { createStackNavigator, Header } from "@react-navigation/stack";
import { ProfileScreen,EditProfileScreen, SigninScreen } from "../screens";

const Stack = createStackNavigator();

const ProfileNavigator = ()=>
{
    return(
            <Stack.Navigator initialRouteName="ProfileScreen" screenOptions={{headerShown:false}}>
                <Stack.Screen name = "ProfileScreen" component ={ProfileScreen}></Stack.Screen>
                <Stack.Screen name = "EditProfileScreen" component ={EditProfileScreen}></Stack.Screen>
                {/* <Stack.Screen name = "UpdateFoodScreen" component ={UpdateFoodScreen}></Stack.Screen> */}

                

            </Stack.Navigator> 
       );
    
}

export default ProfileNavigator;