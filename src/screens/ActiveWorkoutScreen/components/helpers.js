import { saveTemplate } from "../../../redux/slices/templateSlice";
import { addWorkoutHistory } from "../../../services/api";

export const goToNextExercise = (
  currentExerciseIndex,
  setCurrentExerciseIndex,
  exercisesLength
) => {
  if (currentExerciseIndex < exercisesLength - 1) {
    setCurrentExerciseIndex(currentExerciseIndex + 1);
  }
};

export const goToPreviousExercise = (
  currentExerciseIndex,
  setCurrentExerciseIndex
) => {
  if (currentExerciseIndex > 0) {
    setCurrentExerciseIndex(currentExerciseIndex - 1);
  }
};

export const handleUpdateExercise = (
  userInput,
  setIndex,
  type,
  exerciseIndex,
  setUpdateExercises
) => {
  setUpdateExercises((prevExercises) => {
    const updatedExercises = [...prevExercises];
    const updatedExercise = { ...updatedExercises[exerciseIndex] };
    const updatedSets = [...updatedExercise.sets_and_reps];

    if (type === "New Set") {
      updatedSets.push({
        set: updatedSets.length + 1,
        reps: null,
        weight: null,
      });
    } else {
      updatedSets[setIndex] = {
        ...updatedSets[setIndex],
        [type.toLowerCase()]: userInput,
      };
    }

    updatedExercise.sets_and_reps = updatedSets;
    updatedExercises[exerciseIndex] = updatedExercise;
    return updatedExercises;
  });
};

export const handleSave = (
  template,
  templates,
  isNewTemplate,
  templateId,
  dispatch,
  navigate
) => {
  const updateTemplate = { ...template, exercises: [...template.exercises] };
  const updatedTemplates = [...templates];
  if (isNewTemplate) {
    updatedTemplates.push(...updateTemplate, {
      id: updatedTemplates.length + 1,
    });
  } else {
    const templateIndex = updatedTemplates.findIndex(
      (template) => template.id === templateId
    );
    if (templateIndex !== -1) {
      updatedTemplates[templateIndex] = updateTemplate;
    }
  }
  dispatch(saveTemplate({ templates: updatedTemplates }));
  navigate.goBack();
};

export const handleFinish = (template, dispatch, navigate) => {
  const getCurrentDateISO = () => {
    const now = new Date();
    return now.toISOString();
  };

  const workoutHistory = {
    id: 1,
    user_id: 1,
    date: getCurrentDateISO(),
    template_id: template.id,
    template_name: template.template_name,
    exercises: template.exercises,
  };
  dispatch(addWorkoutHistory({ workoutHistory: workoutHistory }))
    .then(() => {
      console.log("Template saved successfully");
      // isNewTemplate = false;
    })
    .catch((err) => {
      console.error("Error saving template:", err);
    });
  navigate.goBack();
};
