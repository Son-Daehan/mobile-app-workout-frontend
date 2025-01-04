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
    color: "white",
  },
  noWorkoutsText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  body: {
    padding: 5, // Padding for the container
    backgroundColor: "#f9f9f9", // Light background color
    borderRadius: 8, // Rounded corners
    shadowColor: "#000", // Shadow color for the container
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 6, // Shadow radius
    elevation: 5, // Elevation for Android
    // height: 100,
  },
  bodyItemsContainer: {
    flexDirection: "row",
    gap: 20,
    // justifyContent: "space-between",
    padding: 10, // Padding for the container
    backgroundColor: "#f9f9f9", // Light background color
    borderRadius: 8, // Rounded corners
    shadowColor: "#000", // Shadow color for the container
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 6, // Shadow radius
    elevation: 5, // Elevation for Android
  },
  bodyItemText: {},
});

export default WorkoutList;
