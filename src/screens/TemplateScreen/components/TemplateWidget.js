import React, { useState, useImperativeHandle, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import TemplatePreviewModal from "./TemplatePreviewModal";
import TemplateDropdownModal from "./TemplateDropdownModal";

const TemplateWidget = forwardRef(
  ({ template, category, templateId, isActive, onPress }, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [templateDropdownModalVisible, setTemplateDropdownModalVisible] =
      useState(false);

    const [buttonPosition, setButtonPosition] = useState({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    const handleDropdownVisibility = (event) => {
      event.target.measureInWindow((x, y, width, height) => {
        setButtonPosition({ x, y, width, height });
      });

      setTemplateDropdownModalVisible(true); // Show the dropdown/modal
    };

    const handleButtonLayout = (event) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      setButtonPosition({ x, y, width, height });
    };

    return (
      <>
        <Pressable
          style={[
            styles.container,
            isActive ? styles.activeContainer : null, // Apply active styles
          ]}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{template?.template_name}</Text>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleDropdownVisibility}
              onLayout={handleButtonLayout} // Track the layout position
            >
              <Text style={styles.headerButtonText}>~</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyContainer}>
            {template?.exercises?.map((exercise, exerciseIndex) => (
              <Text style={styles.bodyText} key={exerciseIndex}>
                {exercise?.exercise?.name}
              </Text>
            ))}
          </View>
        </Pressable>

        {/* Dropdown Menu */}
        {/* {dropdownVisible && (
          <View
            style={[
              styles.dropdownContainer,
              {
                top: buttonPosition.y + buttonPosition.height + 5, // Position dropdown below the button
                left: buttonPosition.x, // Align it with the button horizontally
              },
            ]}
          >
            <TouchableOpacity style={styles.dropdownItem} onPress={() => {}}>
              <Text>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => {}}>
              <Text>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleDeleteTemplate}
            >
              <Text>Delete Template</Text>
            </TouchableOpacity>
          </View>
        )} */}

        {/* Preview Modal */}
        <TemplatePreviewModal
          modalVisible={modalVisible}
          closeModal={() => setModalVisible(false)}
          template={template}
          templateId={templateId}
          category={category}
        />
        <TemplateDropdownModal
          templateDropdownModalVisible={templateDropdownModalVisible}
          closeModal={() => setTemplateDropdownModalVisible(false)}
          templateId={templateId}
          buttonPosition={buttonPosition}
        />
      </>
    );
  }
);

export default TemplateWidget;

const styles = StyleSheet.create({
  container: {
    elevation: 5, // For Android
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 5,
    backgroundColor: "#121A14",
    borderWidth: 0.5,
    borderColor: "#393C3A",
    padding: 9,
    gap: 2,
    width: "48%",
    height: 140,
    // borderWidth: 1,
  },

  // Add styling for active state
  activeContainer: {
    backgroundColor: "#e0e0e0", // Light gray background for active state
    borderColor: "#007bff", // Blue border for active state
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontWeight: 800,
    fontSize: 16,
    color: "white",
  },
  headerButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "blue",
    borderRadius: 4,
  },
  headerButtonText: {
    color: "white",
    textAlign: "center",
  },
  bodyContainer: {
    flexDirection: "column",
    overflow: "hidden",
  },

  bodyText: {
    color: "white",
  },

  // Dropdown Styling
  dropdownContainer: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 6,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    zIndex: 999,
  },

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  dropdownItemText: {
    fontSize: 16,
  },
});
