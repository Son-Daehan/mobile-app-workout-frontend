import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ActiveWorkoutHeader from "./components/ActiveWorkoutHeader";
import AddExerciseModal from "../WorkoutFormScreen/components/AddExerciseModal";
import { useNavigation } from "@react-navigation/native";
import ActiveWorkoutFooter from "./components/ActiveWorkoutFooter";
import { handleSave } from "./components/helpers";
import ExerciseCard from "../WorkoutFormScreen/components/ExerciseCard";
import Timer from "./components/Timer";

const ActiveWorkoutScreen = ({ route }) => {
  const { templateId, newTemplateName, isNewTemplate } = route.params;

  const templates = useSelector((state) => state.templates.templates);
  const exercises = useSelector((state) => state.exercises.exercises);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [template, setTemplate] = useState([]);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(null);

  useEffect(() => {
    const currentTemplate = templates.find((t) => t.id === templateId);

    if (isNewTemplate && !currentTemplate) {
      setTemplate({
        id: templates.length + 1,
        user_id: 1,
        template_name: newTemplateName,
        description: "",
        exercises: [],
      });
    } else {
      setTemplate(currentTemplate);
    }
  }, [templates]);

  const handleSettingsPress = (position, index) => {
    setDropdownPosition(position);
    setSelectedExerciseIndex(index);
    setDropdownVisible(true);
  };

  const handleDeleteExercise = () => {
    setTemplate((prevState) => {
      const updatedTemplate = { ...prevState };
      const updatedExercises = [...updatedTemplate.exercises];
      updatedExercises.splice(selectedExerciseIndex, 1);
      updatedTemplate.exercises = updatedExercises;
      return updatedTemplate;
    });
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <ActiveWorkoutHeader
        handleClose={navigate.goBack}
        handleSave={handleSave}
        template={template}
        templates={templates}
        isNewTemplate={isNewTemplate}
        templateId={templateId}
        dispatch={dispatch}
      />
      <Timer />
      <ScrollView showsVerticalScrollIndicator={false}>
        {template?.exercises?.map((exercise, index) => (
          <ExerciseCard
            key={index}
            exercise={exercise}
            exerciseIndex={index}
            currentExerciseIndex={currentExerciseIndex}
            currentSet={currentSet}
            template={template}
            setTemplate={setTemplate}
            edit={false}
            onSettingsPress={(position) => handleSettingsPress(position, index)}
          />
        ))}
        <ActiveWorkoutFooter
          setAddExerciseModalVisible={setAddExerciseModalVisible}
        />
      </ScrollView>

      <AddExerciseModal
        modalVisible={addExerciseModalVisible}
        closeModal={() => setAddExerciseModalVisible(false)}
        exercises={exercises}
        setTemplate={setTemplate}
      />

      <Modal
        transparent
        visible={dropdownVisible}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setDropdownVisible(false)}
        >
          <View
            style={{
              position: "absolute",
              top: dropdownPosition.y,
              left: dropdownPosition.x,
            }}
          >
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleDeleteExercise}
              >
                <Text style={{ color: "black" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 6,
    elevation: 5,
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalOverlay: {
    flex: 1,
  },
});

export default ActiveWorkoutScreen;
