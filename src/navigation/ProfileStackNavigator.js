import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WorkoutHistoryScreen from "../screens/WorkoutHistoryScreen/WorkoutHistoryScreen";

// Define the Stack Navigator for Template
const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header globally for this stack
      }}
    >
      {/* Default Template screen */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
      <Stack.Screen
        name="WorkoutHistory"
        component={WorkoutHistoryScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
    </Stack.Navigator>
  );
}
