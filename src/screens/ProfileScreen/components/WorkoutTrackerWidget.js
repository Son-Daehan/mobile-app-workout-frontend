import React from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import { useSelector } from "react-redux";
// import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";

const WorkoutTrackerWidget = () => {
  const workoutHistory = useSelector((state) => state.workoutHistory || []);
  const containerWidth = Dimensions.get("window").width * 0.9; // 90% of the screen width

  const navigation = useNavigation();

  // Helper function to calculate the start of the week (Monday)
  const getStartOfWeek = (date) => {
    const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff = (day === 0 ? -6 : 1) - day; // Adjust so that Monday is the start
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
  };

  // Helper function to calculate the difference in weeks between two dates
  const calculateWeekDifference = (date1, date2) => {
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.floor((date1 - date2) / msPerWeek);
  };

  // Calculate workouts per standardized week (Monday–Sunday)
  const calculateWorkoutsPerWeek = (workouts) => {
    if (!workouts.length) return { labels: [], data: [] };

    const weeklyData = {};
    const startOfFirstWeek = getStartOfWeek(
      new Date(workouts[0]?.date || Date.now())
    );

    workouts.forEach((workout) => {
      if (!workout || !workout.date) return;
      const workoutDate = getStartOfWeek(new Date(workout.date));
      const weekNumber = calculateWeekDifference(workoutDate, startOfFirstWeek);
      weeklyData[weekNumber] = (weeklyData[weekNumber] || 0) + 1;
    });

    const weeks = Object.keys(weeklyData);
    const labels = weeks.map((week, index) =>
      index % 4 === 0 ? `Week ${parseInt(week) + 1}` : ""
    );
    const data = Object.values(weeklyData);
    return { labels, data };
  };

  const handleNavigate = () => {
    navigation.navigate("WorkoutHistory");
  };

  const { labels, data } = calculateWorkoutsPerWeek(workoutHistory);

  return (
    <TouchableOpacity
      onPress={handleNavigate}
      style={[styles.container, { width: containerWidth }]}
    >
      <Text style={styles.title}>Workouts Per Week</Text>
      {/* <LineChart
        data={{
          labels: labels.length ? labels : ["No Data"],
          datasets: [{ data: data.length ? data : [0] }],
        }}
        width={containerWidth} // Chart width is dynamic based on container
        height={containerWidth * 0.6} // Height is 60% of width
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#1E2923",
          backgroundGradientFrom: "#1E2923",
          backgroundGradientTo: "#08130D",
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={styles.chart}
      /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
    backgroundColor: "#1E2923",
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  chart: {
    borderRadius: 16,
  },
});

export default WorkoutTrackerWidget;
