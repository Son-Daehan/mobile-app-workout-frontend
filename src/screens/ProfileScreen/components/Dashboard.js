import React from "react";
import WorkoutTrackerWidget from "./WorkoutTrackerWidget";
import NutritionTracker from "./NutritionTracker";
import { View } from "react-native";
import StepsWidget from "./StepsWidget";

const Dashboard = () => {
  return (
    <View className="dashboard_container">
      <WorkoutTrackerWidget />
      {/* <StepsWidget /> */}
      <NutritionTracker />
    </View>
  );
};

export default Dashboard;
