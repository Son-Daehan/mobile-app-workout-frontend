import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import ExerciseFilter from "./ExerciseFilter";

const AddExerciseModal = ({
  modalVisible,
  closeModal,
  exercises,
  setTemplate,
}) => {
  const [filteredExercises, setFilteredExercises] = useState(exercises);

  const handleAddExercise = (exercise) => {
    console.log(exercise);
    const newExercise = {
      exercise: exercise,
      sets: [
        {
          set: 1,
          weight: null,
          reps: null,
          type: "Core",
          status: "Not Complete",
        },
      ],
    };

    // Add new exercise to the template
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      exercises: [...prevTemplate.exercises, newExercise],
    }));

    closeModal();
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <TouchableOpacity
        style={styles.modalBackground}
        onPress={closeModal}
        activeOpacity={1}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select an Exercise</Text>
          <ExerciseFilter
            exercises={exercises}
            setFilteredExercises={setFilteredExercises}
          />
          {filteredExercises.length === 0 && (
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              No exercises match your filter.
            </Text>
          )}
          <FlatList
            data={filteredExercises}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.exerciseItem}
                onPress={() => handleAddExercise(item)}
              >
                <Text style={styles.exerciseName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <Button
            title="Close"
            onPress={closeModal}
            accessibilityLabel="Close the exercise selection modal"
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddExerciseModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // backgroundColor: '#f9f9f9',
  },
  exerciseName: {
    fontSize: 16,
  },
});
