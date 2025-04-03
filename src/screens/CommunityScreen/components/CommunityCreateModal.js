import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CommunityCreateModal = ({ modalVisible, closeModal }) => {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");

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
              <Text style={styles.modalHeaderTitle}>
                Tell us about your community
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.modalHeaderTitle}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalSubHeaderContainer}>
              <Text style={styles.modalHeaderText}>
                A name and description help people understand what your
                community is all about
              </Text>
            </View>
            <View style={styles.modalBodyContainer}>
              <TextInput
                editable
                style={styles.nameInput}
                maxLength={40}
                placeholder="Community Name"
                placeholderTextColor="#555" // Darker placeholder text color
                onChangeText={setCommunityName} // Update state on text change
                value={communityName} // Controlled component with value
              />
              <TextInput
                editable
                style={styles.descriptionInput}
                maxLength={300}
                placeholder="Description"
                placeholderTextColor="#555" // Darker placeholder text color
                onChangeText={setCommunityDescription} // Update state on text change
                value={communityDescription} // Controlled component with value
              />
            </View>
            <View style={styles.modalFooterContainer}>
              <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createButtonText}>Create Community</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CommunityCreateModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    width: "100%",
    height: "60%",
    backgroundColor: "#1E2923",
    borderRadius: 10,
    padding: 15,
    paddingVertical: 30,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    elevation: 5,
    justifyContent: "space-between",
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
});
