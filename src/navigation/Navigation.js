import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Import navigators
import TemplateStackNavigator from "./TemplateStackNavigator";
import WorkoutStackNavigator from "./WorkoutStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import ChallengeStackNavigator from "./ChallengeStackNavigator";
import CommunityStackNavigator from "./CommunityStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator"; // Import Auth stack
import { useSelector } from "react-redux";

// Create Tab Navigator
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const auth = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage auth state
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const handleVisibility = (route) => {
    const routeName = route.name;
    const currentRouteName = route.state?.routes?.[route.state.index]?.name;

    // Hide tab bar logic (same as before)
    if (routeName === "Template" && currentRouteName === "WorkoutForm")
      return false;
    if (routeName === "Workout" && currentRouteName === "WorkoutForm")
      return false;
    if (routeName === "Workout" && currentRouteName === "ActiveWorkout")
      return false;
    if (routeName === "Template" && currentRouteName === "ActiveWorkout")
      return false;
    if (routeName === "Profile" && currentRouteName === "WorkoutHistory")
      return false;
    if (routeName === "Challenge" && currentRouteName === "ChallengeDetail")
      return false;
    return true;
  };

  const MainTabNavigator = () => (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Profile":
              iconName = "person";
              break;
            case "Challenge":
              iconName = "fitness";
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
        tabBarActiveTintColor: "#04813E",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: isTabBarVisible
          ? { backgroundColor: "#000000", borderColor: "#1E2923" }
          : { display: "none" },
      })}
      screenListeners={{
        state: (e) => {
          const route = e.data.state.routes[e.data.state.index];
          setIsTabBarVisible(handleVisibility(route));
        },
      }}
    >
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="Workout" component={WorkoutStackNavigator} />
      <Tab.Screen name="Template" component={TemplateStackNavigator} />

      {/* FUTURE RELEASE */}
      {/* <Tab.Screen name="Community" component={CommunityStackNavigator} /> */}
      {/* <Tab.Screen name="Challenge" component={ChallengeStackNavigator} /> */}
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      {auth.isAuthenticated ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
