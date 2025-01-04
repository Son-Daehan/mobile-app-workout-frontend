import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WorkoutPlannerScreen from "../screens/WorkoutPlannerScreen/WorkoutPlannerScreen";
import ActiveWorkoutScreen from "../screens/ActiveWorkoutScreen/ActiveWorkoutScreen";
import WorkoutFormScreen from "../screens/WorkoutFormScreen/WorkoutFormScreen";

// Define the Stack Navigator for Template
const Stack = createNativeStackNavigator();

export default function WorkoutStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header globally for this stack
      }}
    >
      {/* Default Template screen */}
      <Stack.Screen name="WorkoutPlanner" component={WorkoutPlannerScreen} />
      {/* Hidden route for TemplateEditForm */}
      <Stack.Screen
        name="ActiveWorkout"
        component={ActiveWorkoutScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
      <Stack.Screen
        name="WorkoutForm"
        component={WorkoutFormScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
    </Stack.Navigator>
  );
}
