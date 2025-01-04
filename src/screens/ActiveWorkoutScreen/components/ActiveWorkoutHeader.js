// ActiveWorkoutHeader.js
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import ActiveWorkoutSaveModal from "./ActiveWorkoutSaveModal";

const ActiveWorkoutHeader = ({
  handleClose,
  handleSave,
  template,
  templates,
  templateName,
  isNewTemplate,
  templateId,
  dispatch,
}) => {
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  return (
    <React.Fragment>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.headerItem}>
          <Icon name="close" type="material" color="red" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>{template.template_name}</Text>
        <TouchableOpacity
          onPress={() => setSaveModalVisible(true)}
          style={styles.headerItem}
        >
          <Text style={styles.saveButton}>Finish</Text>
        </TouchableOpacity>
      </View>
      <ActiveWorkoutSaveModal
        closeModal={() => setSaveModalVisible(false)}
        modalVisible={saveModalVisible}
        handleSave={handleSave}
        template={template}
        templates={templates}
        isNewTemplate={isNewTemplate}
        templateId={templateId}
        dispatch={dispatch}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: { fontSize: 20, fontWeight: 600, color: "white" },
  headerItem: { color: "white" },
  saveButton: { color: "green", fontSize: 18 },
});

export default ActiveWorkoutHeader;
