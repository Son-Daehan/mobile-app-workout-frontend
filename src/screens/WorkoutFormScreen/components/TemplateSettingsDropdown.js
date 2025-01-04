import React, { useState, useRef, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

const TemplateSettingsDropdown = ({ onOptionSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [modalWidth, setModalWidth] = useState(0);
  const buttonRef = useRef(null);

  const options = ['Rename Template', 'Delete Template', 'Duplicate Template'];
  const screenWidth = Dimensions.get('window').width;

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    }
    setModalVisible(false);
  };

  // Show the menu and measure the button's position
  const showMenu = () => {
    buttonRef.current.measureInWindow((x, y, width, height) => {
      setPosition({ top: y + height, left: x, width });
    });
    setModalVisible(true);
  };

  // Measure the width of the longest option and update the modal width
  const measureTextWidth = (event) => {
    const { width } = event.nativeEvent.layout;
    setModalWidth((prevWidth) => (width > prevWidth ? width : prevWidth));
  };

  useEffect(() => {
    setModalWidth(0); // Reset modal width when options change
  }, [options]);

  // Adjust modal position to stay within the screen width
  const adjustedLeft = position.left + modalWidth > screenWidth
    ? position.left - (position.left + modalWidth - screenWidth) // Shift to the left if it's going out of screen
    : position.left;

  return (
    <View>
      <TouchableOpacity ref={buttonRef} onPress={showMenu}>
        <Icon name="settings" type="material" color="gray" size={32} />
      </TouchableOpacity>

      {/* Modal for dropdown options */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                top: position.top + 5, // Space below the button
                left: adjustedLeft,    // Adjusted left position to prevent overflow
                width: modalWidth + 20, // Dynamically set width based on text
              },
            ]}
          >
            {/* Menu Items */}
            {options.map((option) => (
              <TouchableOpacity key={option} onPress={() => handleOptionSelect(option)}>
                <Text style={styles.menuItem} onLayout={measureTextWidth}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TemplateSettingsDropdown;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    maxWidth: 300, // Maximum width of the modal
  },
  menuItem: {
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
});
