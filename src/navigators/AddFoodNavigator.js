import * as React from 'react';
import { createStackNavigator} from "@react-navigation/stack";


import { AddFoodScreen, InsertFoodItemScreen , UpdateFoodScreen}from '../screens';

const Stack = createStackNavigator();
const AddFoodNavigator =()=> {
    return (

        <Stack.Navigator initialRouteName="AddFoodScreen" screenOptions={{ headerShown: false}}>
            <Stack.Screen name="AddFoodScreen" component={AddFoodScreen} />
            <Stack.Screen name="UpdateFoodScreen" component={UpdateFoodScreen} />
            <Stack.Screen name="InsertFoodItemScreen" component={InsertFoodItemScreen} />
        </Stack.Navigator>
    );
}

export default AddFoodNavigator;