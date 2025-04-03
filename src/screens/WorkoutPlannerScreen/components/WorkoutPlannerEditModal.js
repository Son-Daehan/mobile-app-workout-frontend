import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WorkoutList from "./WorkoutList";
import {
  addWorkoutSchedule,
  deleteWorkoutSchedule,
} from "../../../services/api";
import WorkoutPlannerEditFilter from "./WorkoutPlannerEditFilter";
import { Icon } from "react-native-elements";

const WorkoutPlannerEditModal = ({
  schedules,
  modalVisible,
  closeModal,
  day,
}) => {
  const templates = useSelector((state) => state?.templates?.templates);
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const dispatch = useDispatch();

  const dayKey = day?.date.toISOString().split("T")[0];
  const scheduleForTheDay = schedules.filter(
    (schedule) => schedule.scheduled_date === dayKey
  );
  const workoutsForTheDay = scheduleForTheDay
    ? scheduleForTheDay.templates
    : [];

  const addTemplateToSchedule = (template) => {
    console.log(dayKey);
    const newWorkoutSchedule = {
      scheduled_date: dayKey,
      status: "upcoming",
      completed_at: null,
      workout_template: template.id,
    };

    dispatch(
      addWorkoutSchedule({
        newWorkoutSchedule,
      })
    );
  };

  const removeTemplateFromSchedule = (workoutId) => {
    dispatch(deleteWorkoutSchedule(workoutId));
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderContainer}>
            <Text></Text>
            <Text style={styles.title}>{day?.name}'s Workouts</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.workoutListContainer}>
              <WorkoutList
                schedules={schedules}
                workouts={scheduleForTheDay}
                templates={templates}
                dayKey={dayKey}
                removeTemplateFromSchedule={removeTemplateFromSchedule}
              />
            </View>

            <View style={styles.filterContainer}>
              <WorkoutPlannerEditFilter
                templates={templates}
                setFilteredTemplates={setFilteredTemplates}
              />
              <View style={styles.filteredItemsContainer}>
                <ScrollView>
                  {filteredTemplates?.map((template, index) => (
                    <TouchableOpacity
                      style={styles.filteredItemsTextContainer}
                      key={index}
                      onPress={() => addTemplateToSchedule(template)}
                    >
                      <Icon
                        name="plus"
                        type="font-awesome" // Use the FontAwesome type for the "plus" icon
                        size={20}
                        color="#4CAF50"
                        onPress={() => console.log("Plus Pressed")}
                      />
                      <Text style={styles.filteredItemsText} key={template.id}>
                        {template.template_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#1E2923",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
    height: 500,
  },
  modalHeaderContainer: {
    // alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
  },
  filterContainer: {
    // padding: 5, // Padding for the container
    // backgroundColor: "black", // Light background color
    borderRadius: 5, // Rounded corners
  },
  filteredItemsContainer: {
    marginTop: 5,
    gap: 5,
    height: 3 * 50,
    overflow: "hidden",
  },
  filteredItemsTextContainer: {
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
  filteredItemsText: {
    flex: 1, // Take up remaining space for the text
    fontSize: 16, // Larger text for better readability
    color: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
  closeButton: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    // width: 30,
    // height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  workoutListContainer: {
    height: 3 * 50,
    // flex: 1,
    marginBottom: 65,
  },
  addWorkoutContainer: {
    marginTop: 5,
    height: 400,
  },
});

export default WorkoutPlannerEditModal;
