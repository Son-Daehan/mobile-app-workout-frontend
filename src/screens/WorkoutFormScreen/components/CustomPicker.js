import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const CustomPicker = ({ options, selectedValue, onValueChange, label }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectOption = (value) => {
    onValueChange(value);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.selectedValue} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.selectedText}>{selectedValue || 'Select an option'}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={() => handleSelectOption(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    // marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  selectedValue: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomPicker;
