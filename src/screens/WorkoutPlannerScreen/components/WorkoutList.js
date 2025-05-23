import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { findTemplateById } from "./helpers";
import { useDispatch } from "react-redux";
import { updateWorkoutSchedule } from "../../../redux/slices/scheduleSlice";
import { Icon } from "react-native-elements";

const WorkoutList = ({
  schedules,
  workouts,
  templates,
  dayKey,
  removeTemplateFromSchedule,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(templates)
    // console.log(workouts)
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Workouts</Text>
      <View style={styles.body}>
        <ScrollView>
          {workouts?.length > 0 ? (
            workouts.map((workout, index) => (
              <TouchableOpacity
                onPress={() => removeTemplateFromSchedule(workout.id)}
                key={index}
                style={styles.bodyItemsContainer}
              >
                <Icon
                  name="minus"
                  type="font-awesome" // Use the FontAwesome type for the "minus" icon
                  size={20}
                  color="#F44336"
                />
                <Text style={styles.bodyItemText}>
                  {findTemplateById(workout.workout_template, templates)
                    ?.template_name || "Unknown Workout"}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noWorkoutsText}>Schedule a workout</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  workoutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  workoutText: {
    fontSize: 16,
    color: "black",
  },
  noWorkoutsText: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
  },
  body: {
    marginTop: 5,
    gap: 5,
    height: 3 * 50,
    overflow: "hidden",
  },
  bodyItemsContainer: {
    flexDirection: "row", // Keep this to align items horizontally
    justifyContent: "flex-start", // Ensure items are aligned to the start
    alignItems: "center", // Make sure items are centered vertically
    padding: 15, // Increase padding for more touch area
    backgroundColor: "black", // Light background color
    borderRadius: 5, // Rounded corners
    marginBottom: 5, // Add spacing between items
    width: "100%", // Ensure full width for better touch area
    height: 50,
    gap: 15,
  },
  bodyItemText: {
    color: "white",
  },
});

export default WorkoutList;
