import { useNavigation } from "@react-navigation/native";
import React from "react";
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
            <Text>Workout Finished!</Text>
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
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 10,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
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
