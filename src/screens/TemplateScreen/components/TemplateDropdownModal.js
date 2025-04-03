import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { deleteWorkoutTemplate } from "../../../services/api";

const TemplateDropdownModal = ({
  templateDropdownModalVisible,
  closeModal,
  templateId,
  buttonPosition,
}) => {
  const dispatch = useDispatch();
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleDeleteTemplate = () => {
    dispatch(deleteWorkoutTemplate(templateId));
    closeModal();
  };

  useEffect(() => {
    const adjustDropdownPosition = () => {
      const screenWidth = Dimensions.get("window").width;
      const dropdownWidth = 150;
      const verticalOffset = 10;

      let calculatedLeft = buttonPosition.x;
      let calculatedTop =
        buttonPosition.y + buttonPosition.height + verticalOffset;

      // Ensure it doesn't overflow the screen
      if (calculatedLeft + dropdownWidth > screenWidth) {
        calculatedLeft = screenWidth - dropdownWidth - 10;
      }

      setDropdownPosition({
        top: calculatedTop,
        left: calculatedLeft,
      });
    };

    adjustDropdownPosition();
  }, [buttonPosition]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={templateDropdownModalVisible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.modalOverlay} onPress={closeModal}>
        <View
          style={[
            styles.dropdownContainer,
            {
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            },
          ]}
        >
          <TouchableOpacity style={styles.dropdownItem} onPress={() => {}}>
            <Text style={styles.dropdownItemText}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => {}}>
            <Text style={styles.dropdownItemText}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={handleDeleteTemplate}
          >
            <Text style={[styles.dropdownItemText, styles.deleteText]}>
              Delete Template
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default TemplateDropdownModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Light overlay for better focus
  },

  dropdownContainer: {
    position: "absolute",
    backgroundColor: "#1E2923",
    borderRadius: 6,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    zIndex: 999,
    width: 150, // Fixed dropdown width
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  dropdownItemText: {
    fontSize: 16,
    color: "white",
  },

  deleteText: {
    color: "red", // Highlight Delete option
  },
});
