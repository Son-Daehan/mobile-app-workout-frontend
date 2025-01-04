import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addWorkoutTemplate, updateWorkoutTemplate } from "../../services/api";
import { Icon } from "react-native-elements";
import AddExerciseModal from "./components/AddExerciseModal";
import TemplateSettingsDropdown from "./components/TemplateSettingsDropdown";
import ExerciseCard from "./components/ExerciseCard";
import ActiveWorkoutFooter from "../ActiveWorkoutScreen/components/ActiveWorkoutFooter";

const WorkoutFormScreen = ({ route, navigation }) => {
  const { templateId, newTemplateName, isNewTemplate } = route.params;
  const templates = useSelector((state) => state.templates.templates);
  const exercises = useSelector((state) => state.exercises.exercises);
  const dispatch = useDispatch();
  const [template, setTemplate] = useState([]);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);

  useEffect(() => {
    const currentTemplate = templates?.find((t) => t.id === templateId);
    console.log("CURRENT TEMPLATE", currentTemplate);
    if (isNewTemplate && !currentTemplate) {
      setTemplate({
        id: templates.length + 1,
        user: 1,
        type: "user",
        template_name: newTemplateName,
        description: "",
        exercises: [],
      });
    } else {
      setTemplate(currentTemplate);
    }
  }, [templates]);

  const handleSaveWorkoutTemplate = () => {
    if (isNewTemplate) {
      dispatch(addWorkoutTemplate(template)) // Dispatch the async action
        .then(() => {
          console.log("NEW Template saved successfully");
          // isNewTemplate = false;
        })
        .catch((err) => {
          console.error("Error saving template:", err);
        });
    } else {
      dispatch(updateWorkoutTemplate(template))
        .then(() => {
          console.log("Template updated successfully");
        })
        .catch((err) => {
          console.error("Error updating template:", err);
        });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={[styles.headerItem, styles.leftItem]}
            onPress={() => navigation.goBack()}
          >
            <Icon name="close" type="material" color="red" size={28} />
          </TouchableOpacity>
          <View style={[styles.headerItem, styles.centerItem]}>
            <Text style={[styles.headerTitle]}>Edit Template</Text>
          </View>
          <TouchableOpacity
            style={[styles.headerItem, styles.rightItem]}
            onPress={handleSaveWorkoutTemplate}
          >
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subHeaderContainer}>
          <View style={[styles.leftItem, styles.headerItem]}>
            <Text>Test</Text>
          </View>
          <View style={[styles.centerItem, styles.headerItem]}>
            <Text style={styles.headerTitle}>{template?.template_name}</Text>
          </View>
          <TemplateSettingsDropdown
            // onDuplicate={() => {/* Logic for duplicating the template */}}
            style={[styles.rightItem, styles.headerItem]}
            onDelete={() => {
              // Logic for deleting
              navigation.goBack();
            }}
          />
        </View>

        <ScrollView>
          {template &&
            template?.exercises?.map((exercise, exerciseIndex) => (
              <ExerciseCard
                key={exerciseIndex}
                exercise={exercise}
                exerciseIndex={exerciseIndex}
                template={template}
                setTemplate={setTemplate}
              />
            ))}
          <ActiveWorkoutFooter
            setAddExerciseModalVisible={setAddExerciseModalVisible}
          />
        </ScrollView>
      </View>
      <AddExerciseModal
        modalVisible={addExerciseModalVisible}
        closeModal={() => setAddExerciseModalVisible(false)}
        exercises={exercises}
        setTemplate={setTemplate}
      />
    </>
  );
};

export default WorkoutFormScreen;

const styles = StyleSheet.create({
  // MAIN STYLING
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  // HEADER STYLING
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerItem: {
    flex: 1,
    justifyContent: "center",
    // color: "white",
  },
  leftItem: {
    alignItems: "flex-start",
  },
  centerItem: {
    alignItems: "center",
  },
  rightItem: {
    alignItems: "flex-end",
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 700,
    color: "white",
  },
  saveButton: {
    backgroundColor: "green",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    textAlign: "center",
  },
  // SUB-HEADER STYLING
  subHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
