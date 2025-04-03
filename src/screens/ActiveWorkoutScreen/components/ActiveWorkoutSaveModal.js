import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { handleFinish } from "./helpers";

const ActiveWorkoutSaveModal = ({
  modalVisible,
  closeModal,
  handleSave,
  template,
  templates,
  isNewTemplate,
  templateId,
  dispatch,
}) => {
  const navigate = useNavigation();
  const [workoutComplete, setWorkoutComplete] = useState(true);

  const checkWorkoutCompletion = () => {
    let isComplete = true;

    template?.exercises?.map((exercise) => {
      exercise?.sets?.map((set) => {
        if (set?.status === "Not Complete") {
          isComplete = false;
        }
      });
    });
    setWorkoutComplete(isComplete);
  };

  useEffect(() => {
    if (modalVisible) {
      checkWorkoutCompletion();
    }
  }, [modalVisible]);

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.title}>Workout Finished!</Text>
          </View>
          <View>
            {!workoutComplete && (
              <Text style={styles.message}>
                Incomplete sets will not be saved.
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => handleFinish(template, dispatch, navigate)}
            >
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={closeModal}
            >
              <Text style={styles.buttonText}>Resume</Text>
            </TouchableOpacity>
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
    width: "70%",
    backgroundColor: "#1E2923",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 10,
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    // alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    // marginVertical: 5,
    width: 100,
    // width: 200,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ActiveWorkoutSaveModal;
