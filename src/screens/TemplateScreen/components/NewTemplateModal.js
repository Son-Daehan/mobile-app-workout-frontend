import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const NewTemplateModal = ({ modalVisible, closeModal }) => {
  const [newTemplateName, setNewTemplateName] = useState("");
  const templates = useSelector((state) => state.templates.templates);

  const navigation = useNavigation();
  const navigateEditForm = () => {
    const newTemplateId = templates[templates.length - 1]?.id + 1;

    closeModal();
    navigation.navigate("WorkoutForm", {
      templateId: newTemplateId,
      newTemplateName: newTemplateName,
      isNewTemplate: true,
    });
  };

  // const handleModalContent = (e) => {
  //   e.stopPropagation();
  // };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalBackground} onPress={closeModal}>
          <View
            style={styles.modalContainer}
            // onStartShouldSetResponder={handleModalContent}
          >
            <View style={styles.modalHeaderContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>New Workout Template</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={navigateEditForm}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBodyContainer}>
              <Text style={styles.bodyText}>Template Name</Text>
              <TextInput
                editable
                style={styles.modalBodyInput}
                maxLength={40}
                placeholder="Enter a template name"
                placeholderTextColor="#555" // Darker placeholder text color
                onChangeText={setNewTemplateName} // Update state on text change
                value={newTemplateName} // Controlled component with value
              />
            </View>

            <TouchableOpacity
              style={styles.modalFooterButton}
              onPress={navigateEditForm}
            >
              <Text>Save and Continue</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default NewTemplateModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: "#1E2923",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    fontSize: 16,
    fontWeight: 800,
    color: "white",
  },

  bodyText: {
    color: "rgb(172, 167, 167)",
  },

  modalBodyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
  },

  modalBodyInput: {
    height: 40,
    width: 180,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
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
