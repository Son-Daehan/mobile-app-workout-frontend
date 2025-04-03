import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChallengeScreen from "../screens/ChallengeScreen/ChallengeScreen";
import ChallengeDetailScreen from "../screens/ChallengeDetailScreen/ChallengeDetailScreen";

// Define the Stack Navigator for Template
const Stack = createNativeStackNavigator();

export default function ChallengeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header globally for this stack
      }}
    >
      {/* Default Template screen */}
      <Stack.Screen name="Challenge" component={ChallengeScreen} />
      {/* Hidden route for TemplateEditForm */}
      <Stack.Screen
        name="ChallengeDetail"
        component={ChallengeDetailScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
    </Stack.Navigator>
  );
}
