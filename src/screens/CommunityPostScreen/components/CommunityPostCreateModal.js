import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import WorkoutTemplatesModal from "./WorkoutTemplatesModal";
import { useDispatch } from "react-redux";
import { addCommunityPost } from "../../../services/api";

const CommunityPostCreateModal = ({ community, modalVisible, closeModal }) => {
  const [communityPostName, setCommunityPostName] = useState("");
  const [communityPostDescription, setCommunityPostDescription] = useState("");
  const [workoutTemplatesModalVisible, setWorkoutTemplatesModalVisible] =
    useState(false);

  const [inputWorkoutTemplates, setInputWorkoutTemplates] = useState([]);
  const dispatch = useDispatch();

  const handleRemoveWorkoutTemplate = (indexToRemove) => {
    setInputWorkoutTemplates((prevTemplates) => {
      const updatedTemplates = [...prevTemplates]; // Create a shallow copy
      updatedTemplates.splice(indexToRemove, 1); // Remove the element at the specified index
      return updatedTemplates; // Return the updated array
    });
  };

  const handleCreateCommunityPost = () => {
    const data = {
      community: community.id,
      title: communityPostName,
      description: communityPostDescription,
      workout_template_snapshot: inputWorkoutTemplates,
    };
    console.log("creaint a post");
    dispatch(addCommunityPost(data));
  };

  useEffect(() => {
    if (!modalVisible) {
      setWorkoutTemplatesModalVisible(false);
      setCommunityPostName("");
      setCommunityPostDescription("");
      setInputWorkoutTemplates([]);
    }
  }, [modalVisible]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground} onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.modalHeaderTitle}>{community.name}</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.modalHeaderTitle}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalSubHeaderContainer}>
              <Text style={styles.modalHeaderText}>
                Create a thread in the Community...
              </Text>
            </View>
            <View style={styles.modalBodyContainer}>
              <TextInput
                editable
                style={styles.nameInput}
                maxLength={40}
                placeholder="Community Post Title"
                placeholderTextColor="#555" // Darker placeholder text color
                onChangeText={setCommunityPostName} // Update state on text change
                value={communityPostName} // Controlled component with value
              />
              <TextInput
                editable
                style={styles.descriptionInput}
                maxLength={300}
                placeholder="Description"
                placeholderTextColor="#555" // Darker placeholder text color
                onChangeText={setCommunityPostDescription} // Update state on text change
                value={communityPostDescription} // Controlled component with value
              />
              {inputWorkoutTemplates &&
                inputWorkoutTemplates.map((template, index) => {
                  return (
                    <View style={styles.itemContainer}>
                      <Text style={styles.text}>{template.template_name}</Text>
                      <TouchableOpacity
                        onPress={() => handleRemoveWorkoutTemplate(index)}
                      >
                        <Text style={styles.text}>...</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              <TouchableOpacity
                style={styles.addTemplateButton}
                onPress={() => setWorkoutTemplatesModalVisible(true)}
              >
                <Text>Add Template</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalFooterContainer}>
              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateCommunityPost}
              >
                <Text style={styles.createButtonText}>Create Community</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <WorkoutTemplatesModal
          modalVisible={workoutTemplatesModalVisible}
          closeModal={() => setWorkoutTemplatesModalVisible(false)}
          setInputWorkoutTemplates={setInputWorkoutTemplates}
        />
      </Modal>
    </>
  );
};

export default CommunityPostCreateModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    // justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1E2923",
    borderRadius: 10,
    padding: 15,
    paddingVertical: 30,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    elevation: 5,
    // justifyContent: "center",
  },

  modalHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 40,
    gap: 15,
  },

  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: "white",
  },

  modalSubHeaderContainer: {
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 14,
    fontWeight: 300,
    color: "white",
  },
  modalBodyContainer: {
    flexDirection: "column",
    gap: 15,
    marginBottom: 20,
  },
  nameInput: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    fontSize: 16,
    color: "white",
  },
  descriptionInput: {
    height: 150,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    fontSize: 16,
    color: "white",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  addTemplateButton: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  modalFooterContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    backgroundColor: "#06773B",
    borderRadius: 20,
    borderWidth: 1,
    padding: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    color: "white",
    fontWeight: 700,
    fontSize: 15,
  },
  text: {
    color: "white",
  },
});
