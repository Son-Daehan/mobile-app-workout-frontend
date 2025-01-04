import TemplateScreen from "../screens/TemplateScreen/TemplateScreen";
import WorkoutFormScreen from "../screens/WorkoutFormScreen/WorkoutFormScreen";
import ActiveWorkoutScreen from "../screens/ActiveWorkoutScreen/ActiveWorkoutScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Define the Stack Navigator for Template
const Stack = createNativeStackNavigator();

export default function TemplateStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header globally for this stack
      }}
    >
      {/* Default Template screen */}
      <Stack.Screen name="TemplateMain" component={TemplateScreen} />
      {/* Hidden route for TemplateEditForm */}
      <Stack.Screen
        name="WorkoutForm"
        component={WorkoutFormScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
      <Stack.Screen
        name="ActiveWorkout"
        component={ActiveWorkoutScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
    </Stack.Navigator>
  );
}
