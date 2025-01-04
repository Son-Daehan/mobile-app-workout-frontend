import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Import your screens
import TemplateStackNavigator from "./TemplateStackNavigator";
import WorkoutStackNavigator from "./WorkoutStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

// Create Navigators
const Tab = createBottomTabNavigator();

// Define the Bottom Tab Navigator
export default function Navigation() {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const handleVisibility = (route) => {
    const routeName = route.name;
    const currentRouteName = route.state?.routes?.[route.state.index]?.name;

    // Hide tab bar only on TemplateEditForm
    if (routeName === "Template" && currentRouteName === "WorkoutForm") {
      return false;
    } else if (routeName === "Workout" && currentRouteName === "WorkoutForm") {
      return false;
    } else if (
      routeName === "Workout" &&
      currentRouteName === "ActiveWorkout"
    ) {
      return false;
    } else if (
      routeName === "Template" &&
      currentRouteName === "ActiveWorkout"
    ) {
      return false;
    } else if (
      routeName === "Profile" &&
      currentRouteName === "WorkoutHistory"
    ) {
      return false;
    }
    return true;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Profile"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case "Profile":
                iconName = "person";
                break;
              case "Workout":
                iconName = "fitness";
                break;
              case "Template":
                iconName = "document";
                break;
              default:
                iconName = "help";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          headerShown: false, // Hide headers globally in tab navigation
          tabBarStyle: isTabBarVisible
            ? { backgroundColor: "#000000" }
            : { display: "none" }, // Dynamically control tab bar visibility
        })}
        screenListeners={{
          state: (e) => {
            const route = e.data.state.routes[e.data.state.index];
            setIsTabBarVisible(handleVisibility(route));
          },
        }}
      >
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        {/* <Tab.Screen name="Login" component={LoginScreen} options={{ tabBarVisible: false, tabBarStyle: {display: 'none'} }} /> */}
        {/* <Tab.Screen name="Signup" component={SignupScreen} /> */}
        <Tab.Screen name="Workout" component={WorkoutStackNavigator} />
        {/* Use the stack navigator for Template */}
        <Tab.Screen name="Template" component={TemplateStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
