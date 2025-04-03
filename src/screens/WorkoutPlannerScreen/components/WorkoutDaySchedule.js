import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { handleWorkoutStatusStyle } from "./helpers";

const WorkoutDaySchedule = ({
  day,
  schedules,
  templates,
  onEdit,
  onTemplateSelect,
}) => {
  const dayKey = day.date.toISOString().split("T")[0];

  const scheduleForTheDay = schedules.filter(
    (schedule) => schedule.scheduled_date === dayKey
  );

  return (
    <View style={styles.dayContainer}>
      <View style={styles.dayHeader}>
        <Text style={styles.dayName}>{day.name}</Text>
        <Text style={styles.dayDate}>
          {day.date.toLocaleDateString("default", {
            month: "short",
            day: "numeric",
          })}
        </Text>
      </View>
      <View style={styles.workoutsContainer}>
        <Text style={styles.workoutHeaderText}>Workouts</Text>
        <ScrollView style={styles.workoutBodyContainer}>
          {scheduleForTheDay?.length > 0 ? (
            scheduleForTheDay?.map((workout, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onTemplateSelect(workout.workout_template)}
                style={styles.workoutItem}
              >
                <View
                  style={[
                    handleWorkoutStatusStyle(workout.status),
                    styles.workoutStatusContainer,
                  ]}
                >
                  <Text style={styles.workoutStatusText}>
                    {workout.status === "missed"
                      ? "M"
                      : workout.status === "upcoming"
                      ? "U"
                      : workout.status === "completed"
                      ? "C"
                      : "D"}
                  </Text>
                </View>
                <Text
                  style={styles.workoutText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {
                    templates.find(
                      (template) => template.id === workout.workout_template
                    )?.template_name
                  }
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: "grey" }}>Schedule a workout</Text>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => onEdit(day)}
        style={styles.addWorkoutButton}
      >
        <Text style={styles.addWorkoutText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#121A14",
    borderRadius: 6,
    elevation: 1,
    marginBottom: 12,
    borderColor: "#393C3A",
    borderWidth: 0.5,
  },
  dayHeader: {
    width: 70,
  },
  dayName: {
    fontSize: 12,
    color: "white",
  },
  dayDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "grey",
  },
  workoutsContainer: {
    flex: 1,
    maxHeight: 90,
    gap: 3,
  },
  workoutBodyContainer: {
    flexDirection: "column",
  },
  workoutItem: {
    flexDirection: "row",
    marginBottom: 5,
    width: 190,
    gap: 5,
  },
  workoutHeaderText: {
    fontSize: 18,
    fontWeight: 600,
    color: "white",
  },
  workoutStatusContainer: {
    borderRadius: 5,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 3, // Shadow blur radius
    elevation: 3, // Shadow for Android
    paddingHorizontal: 6,
    justifyContent: "center",
  },
  workoutStatusText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  workoutText: {
    fontSize: 16,
    color: "white",
    width: "100%",
    backgroundColor: "#183C03",
    borderRadius: 5,
    padding: 5,
  },
  addWorkoutButton: {
    alignSelf: "flex-start",
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addWorkoutText: {
    color: "#fff",
  },
});

export default WorkoutDaySchedule;
