import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ActiveWorkoutFooter = ({ setAddExerciseModalVisible }) => {
  return (
    <React.Fragment>
      <View style={styles}>
        <TouchableOpacity
          style={[styles.button, styles.addExerciseButton]}
          onPress={() => setAddExerciseModalVisible(true)}
        >
          <Text style={styles.text}>Add Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow effect
    borderWidth: 1, // Thickness of the border
    borderColor: "#ddd", // Border color
    borderRadius: 8, // Rounded corners, optional
    backgroundColor: "#fff", // Ensure it has a background
  },
  addExerciseButton: {
    backgroundColor: "blue",
    marginBottom: 3,
  },
  finishButton: {
    backgroundColor: "green", // Ensure it has a background
    marginBottom: 3,
  },
  cancelButton: {
    backgroundColor: "red", // Ensure it has a background
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});

export default ActiveWorkoutFooter;
