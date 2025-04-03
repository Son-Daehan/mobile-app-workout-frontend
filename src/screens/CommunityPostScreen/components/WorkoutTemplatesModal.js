import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

const WorkoutTemplatesModal = ({
  modalVisible,
  closeModal,
  setInputWorkoutTemplates,
}) => {
  const workoutTemplates = useSelector((state) => state.templates.templates);

  const handleAddWorkoutTemplate = (workoutTemplate) => {
    setInputWorkoutTemplates((prevState) => [...prevState, workoutTemplate]);
    console.log("pressed");
  };

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
              <Text style={styles.modalHeaderTitle}>Templates</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.modalHeaderTitle}>X</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.modalBodyContainer}
            >
              <View style={styles.modalBodyContainer}>
                {workoutTemplates &&
                  workoutTemplates.map((template) => {
                    return (
                      <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => handleAddWorkoutTemplate(template)}
                      >
                        <Text style={styles.text}>+</Text>
                        <Text style={styles.text}>
                          {template.template_name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </ScrollView>
            <View style={styles.modalFooterContainer}>
              <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default WorkoutTemplatesModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    width: "90%",
    gap: 30,
    // height: "70%",
    backgroundColor: "#1E2923",
    borderRadius: 10,
    padding: 15,
    paddingVertical: 30,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    elevation: 5,
    // justifyContent: "space-between",
  },

  modalHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    // marginTop: 40,
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
    gap: 10,
    // marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    gap: 15,
    padding: 10,
    paddingHorizontal: 20,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 20,
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
  addTemplateButton: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 20,
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
