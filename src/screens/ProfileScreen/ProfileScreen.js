import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import ProfileDashboard from "./components/ProfileDashboard";
import WorkoutTrackerWidget from "./components/WorkoutTrackerWidget";
import Header from "../../components/Header";
import HealthMetricWidget from "./components/HealthMetricWidget";
import StepsWidget from "./components/StepsWidget";
import DashboardWidget from "./components/DashboardWidget";

// Reusable widget component
const ProfileWidget = ({ title, content }) => (
  <View style={styles.widget}>
    <Text style={styles.widgetTitle}>{title}</Text>
    <Text style={styles.widgetContent}>{content}</Text>
  </View>
);

const ProfileScreen = () => {
  const [widgets, setWidgets] = useState([
    {
      id: 1,
      title: "Workout Stats",
      content: "Completed 5 workouts this week.",
    },
    {
      id: 2,
      title: "Calorie Tracking",
      content: "1800/2000 calories consumed today.",
    },
    { id: 3, title: "Heart Rate Zones", content: "45 minutes in Zone 2." },
    { id: 4, title: "Step Count", content: "10,000 steps today." },
    // Additional widget examples for the different fitness metrics
    { id: 5, title: "Weight Lifted", content: "Total weight lifted: 1000kg" },
    {
      id: 6,
      title: "Distance Covered",
      content: "Total distance today: 5 miles",
    },
    {
      id: 7,
      title: "Sleep Quality",
      content: "8 hours of sleep, quality: 90%",
    },
  ]);

  // Add a new widget with dynamic title and content
  const addWidget = (title, content) => {
    const newWidget = {
      id: widgets.length + 1,
      title: title,
      content: content,
    };
    setWidgets([...widgets, newWidget]);
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      {/* <ProfileDashboard /> */}
      <ScrollView style={styles.screen}>
        <WorkoutTrackerWidget />
        {/* <StepsWidget /> */}
        {/* <HealthMetricWidget /> */}
        <DashboardWidget title="Workouts Per Week" />
        {/* <View style={styles.widgetsContainer}>
          {widgets.map((widget) => (
            <ProfileWidget
              key={widget.id}
              title={widget.title}
              content={widget.content}
            />
          ))}
        </View> */}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

// Styles for the profile screen and widgets
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  screen: {
    // flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  widgetsContainer: {
    marginVertical: 20,
  },
  widget: {
    backgroundColor: "#000000",
    borderColor: "white",
    borderWidth: 0.3,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // elevation: 2,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  widgetContent: {
    fontSize: 16,
    color: "#606060",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
