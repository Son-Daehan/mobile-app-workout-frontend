import React from "react";
import WorkoutTrackerWidget from "./WorkoutTrackerWidget";
import NutritionTracker from "./NutritionTracker";
import { View } from "react-native";

const Dashboard = () => {
  return (
    <View className="dashboard_container">
      <WorkoutTrackerWidget />
      <NutritionTracker />
    </View>
  );
};

export default Dashboard;
