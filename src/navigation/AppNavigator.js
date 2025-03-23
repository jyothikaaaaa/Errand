import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import RoleSelectionScreen from "../screens/RoleSelectionScreen";
import RequestCategoriesScreen from "../screens/RequestCategoriesScreen";
import HelperCategoriesScreen from "../screens/HelperCategoriesScreen";
import RequestFormScreen from "../screens/RequestFormScreen";
import ChatScreen from "../screens/ChatScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="RequestCategories" component={RequestCategoriesScreen} />
        <Stack.Screen name="HelperCategories" component={HelperCategoriesScreen} />
        <Stack.Screen name="RequestForm" component={RequestFormScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;