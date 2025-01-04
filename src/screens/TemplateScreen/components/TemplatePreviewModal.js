import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const TemplatePreviewModal = ({
  modalVisible,
  closeModal,
  category,
  templateId,
}) => {
  const templates = useSelector((state) => state.templates.templates);
  const exercises = useSelector((state) => state.exercises.exercises);

  const template = templates?.find((template) => template.id === templateId);
  const navigation = useNavigation();
  const navigateEditForm = () => {
    closeModal();
    navigation.navigate("WorkoutForm", {
      templateId: templateId,
      category: category,
      exercises: exercises,
    });
  };

  const handleStartWorkout = () => {
    closeModal();
    navigation.navigate("ActiveWorkout", {
      templateId: templateId,
    });
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalBackground} onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>
                {template?.template_name}
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={navigateEditForm}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBodyContainer}>
              {template?.exercises?.map((exercise, index) => (
                <View key={index} style={styles.exerciseContainer}>
                  <Text style={styles.exerciseName}>
                    {exercise?.exercise?.name}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalFooterButton}
              onPress={handleStartWorkout}
            >
              <Text style={styles.modalFooterButtonText}>Start Workout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default TemplatePreviewModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    elevation: 5,
    maxHeight: 300,
  },

  modalHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  closeButton: {
    padding: 5,
  },

  closeButtonText: {
    fontSize: 24,
  },

  editButton: {
    padding: 5,
  },

  editButtonText: {
    fontSize: 18,
  },

  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 800,
  },

  modalBodyContainer: {
    maxHeight: 400,
  },
  exerciseContainer: {
    backgroundColor: "#f9f9f9",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
  exerciseName: {
    fontSize: 16,
  },
  modalFooterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  modalFooterButton: {
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  modalFooterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
