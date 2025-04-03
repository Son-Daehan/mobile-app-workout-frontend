import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CommunityScreen from "../screens/CommunityScreen/CommunityScreen";
import CommunityPostScreen from "../screens/CommunityPostScreen/CommunityPostScreen";
import CommunityPostDetailScreen from "../screens/CommunityPostDetailScreen/CommunityPostDetailScreen";

// Define the Stack Navigator for Template
const Stack = createNativeStackNavigator();

export default function CommunityStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header globally for this stack
      }}
    >
      {/* Default Template screen */}
      <Stack.Screen name="Community" component={CommunityScreen} />
      {/* Hidden route for TemplateEditForm */}
      <Stack.Screen
        name="CommunityPost"
        component={CommunityPostScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
      <Stack.Screen
        name="CommunityPostDetail"
        component={CommunityPostDetailScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
    </Stack.Navigator>
  );
}
