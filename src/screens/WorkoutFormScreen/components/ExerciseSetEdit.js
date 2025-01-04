import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Modal } from "react-native";

const ExerciseSetEdit = ({
  set,
  setIndex,
  exerciseIndex,
  template,
  setTemplate,
}) => {
  const [exerciseSetEditModalVisible, setExerciseSetEditModalVisible] =
    useState(false);

  const handleUpdateSetType = (type) => {
    const updateSetType =
      {
        W: "Warmup",
        C: "Core",
        D: "Dropset",
        F: "Failure",
      }[type] || "Core";

    // Create a deep copy of the exercises
    const updatedExercises = template?.exercises?.map((exercise, idx) => {
      if (idx === exerciseIndex) {
        return {
          ...exercise,
          sets: exercise?.sets.map((set, sIdx) => {
            if (sIdx === setIndex) {
              return { ...set, type: updateSetType };
            }
            return set;
          }),
        };
      }
      return exercise;
    });

    // Safely update the state
    setTemplate((prevState) => ({
      ...prevState,
      exercises: updatedExercises,
    }));
    setExerciseSetEditModalVisible(false);
  };

  const handleRemoveSet = (setIndex, exerciseIndex) => {
    setTemplate((prevState) => {
      // Create a deep copy of the state
      const updatedTemplate = { ...prevState };
      const updatedExercises = updatedTemplate.exercises.map(
        (exercise, eIdx) => {
          if (eIdx === exerciseIndex) {
            const updatedSets = exercise.sets.map((set) => ({
              ...set,
            })); // Deep copy sets
            updatedSets.splice(setIndex, 1); // Remove the set

            // Reassign the `set` property
            updatedSets.forEach((set, idx) => {
              set.set = idx + 1; // Renumber sets
            });

            return { ...exercise, sets: updatedSets };
          }
          return exercise; // No changes to other exercises
        }
      );

      updatedTemplate.exercises = updatedExercises;
      return updatedTemplate;
    });
    setExerciseSetEditModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setExerciseSetEditModalVisible(true)}
      >
        {set.type === "Warmup" && <Text style={styles.buttonText}>W</Text>}
        {set.type === "Core" && <Text style={styles.buttonText}>C</Text>}
        {set.type === "Dropset" && <Text style={styles.buttonText}>D</Text>}
        {set.type === "Failure" && <Text style={styles.buttonText}>F</Text>}
      </TouchableOpacity>

      <Modal visible={exerciseSetEditModalVisible} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => handleUpdateSetType("W")}
            >
              <Text style={styles.optionText}>Warmup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => handleUpdateSetType("C")}
            >
              <Text style={styles.optionText}>Core</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => handleUpdateSetType("D")}
            >
              <Text style={styles.optionText}>Dropset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => handleUpdateSetType("F")}
            >
              <Text style={styles.optionText}>Failure</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => handleRemoveSet(setIndex, exerciseIndex)}
            >
              <Text style={styles.optionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    width: 35,
    backgroundColor: "green",
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ExerciseSetEdit;
