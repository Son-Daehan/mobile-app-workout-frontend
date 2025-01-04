import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ActiveWorkoutHeader from "./components/ActiveWorkoutHeader";
import AddExerciseModal from "../WorkoutFormScreen/components/AddExerciseModal";
import { useNavigation } from "@react-navigation/native";
import ActiveWorkoutFooter from "./components/ActiveWorkoutFooter";
import ExerciseNavigatorWithTimer from "./components/ExerciseNavigatorWithTimer";
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
  const [currentSet, setCurrentSet] = useState(1); // Default to set 1
  const [template, setTemplate] = useState([]);

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
      {/* <ExerciseNavigatorWithTimer
        currentExerciseIndex={currentExerciseIndex}
        totalExercises={template?.exercises?.length}
        exercises={template?.exercises || []}
        currentSet={currentSet}
        onPrevious={() => {
          if (currentSet > 1) {
            setCurrentSet(currentSet - 1);
          } else if (currentExerciseIndex > 0) {
            setCurrentSet(
              template.exercises[currentExerciseIndex - 1]?.sets?.length || 1
            );
            setCurrentExerciseIndex(currentExerciseIndex - 1);
          }
        }}
        onNext={() => {
          setTemplate((prevTemplate) => {
            const updatedTemplate = { ...prevTemplate };
            const updatedExercises = [...updatedTemplate.exercises];
            const currentExercise = updatedExercises[currentExerciseIndex];

            if (currentSet <= currentExercise?.sets?.length) {
              // currentExercise.sets[currentSet - 1].status = "Complete";
            }
            updatedTemplate.exercises = updatedExercises;
            return updatedTemplate;
          });

          const currentExercise = template.exercises[currentExerciseIndex];
          if (currentSet < currentExercise?.sets?.length) {
            setCurrentSet(currentSet + 1);
          } else if (currentExerciseIndex < template.exercises.length - 1) {
            setCurrentSet(1);
            setCurrentExerciseIndex(currentExerciseIndex + 1);
          }
        }}
      /> */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 20 },
});

export default ActiveWorkoutScreen;
