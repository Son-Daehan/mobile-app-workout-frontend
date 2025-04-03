import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen/LoginScreen"; // Adjust the path as needed
import SignupScreen from "../screens/SignupScreen/SignupScreen"; // Adjust the path as needed

// Define the Stack Navigator for Authentication
const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide headers globally for auth stack
      }}
    >
      {/* Login Screen */}
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Signup Screen */}
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
