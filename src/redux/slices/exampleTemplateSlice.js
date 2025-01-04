import { createSlice } from "@reduxjs/toolkit";
import exampleWorkoutTemplates from "../../exampleWorkoutTemplates.json";

const exampleTemplateSlice = createSlice({
  name: "exampleTemplates",
  initialState: exampleWorkoutTemplates.example_workout_templates,
  reducers: {
    addTemplate(state, action) {
      state.push(action.payload);
    },

    removeTemplate(state, action) {
      state.splice(action.payload, 1);
    },

    addExercise(state, action) {
      const { templateName, exercise } = action.payload;
      const template = state.find((t) => t.template_name === templateName);
      if (template) {
        template.exercises.push(exercise);
      }
    },

    updateSetAndReps: (state, action) => {
      const { templateIndex, exerciseIndex, set, reps } = action.payload;
      const newData = { set, reps };

      // Update the sets_and_reps array for the specific exercise
      const template = state[templateIndex];
      const exercise = template.exercises[exerciseIndex];

      // Add new set and rep to the exercise
      exercise.sets_and_reps.push(newData);
    },
  },
});

export const { addTemplate, removeTemplate, addExercise, updateSetAndReps } =
  exampleTemplateSlice.actions;
export default exampleTemplateSlice.reducer;
