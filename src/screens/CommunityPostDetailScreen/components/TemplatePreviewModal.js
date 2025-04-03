import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TemplateExerciseCard from "./TemplateExerciseCard";

const TemplatePreviewModal = ({ modalVisible, closeModal, template }) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          {/* <Pressable style={styles.modalBackground} onPress={closeModal}> */}
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.text}>{template.template_name}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
                <Text style={styles.text}>X</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.modalBodyContainer}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {template &&
                template?.exercises?.map((exercise) => {
                  return (
                    <TemplateExerciseCard
                      exercise={exercise.exercise}
                      sets={exercise.sets}
                    />
                  );
                })}
            </ScrollView>
            <View style={styles.modalFooterContainer}></View>
          </View>
        </View>
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
    width: "95%",
    backgroundColor: "#1E2923",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    elevation: 5,
    maxHeight: 600,
    // flex: 1,
    // minHeight: "600",
  },
  modalHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalBodyContainer: {
    flexDirection: "column",
    maxHeight: 400,
  },
  modalFooterContainer: {},
  text: {
    color: "white",
  },
  closeIcon: {
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});
