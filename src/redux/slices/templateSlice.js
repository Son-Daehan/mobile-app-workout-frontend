import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWorkoutTemplates,
  addWorkoutTemplate,
  updateWorkoutTemplate,
  deleteWorkoutTemplate,
} from "../../services/api";
const templateSlice = createSlice({
  name: "templates",
  initialState: {
    templates: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTemplate(state, action) {
      const { newTemplateName } = action.payload;
      const newTemplateId = state[state.length - 1].id + 1;
      const newData = {
        id: newTemplateId,
        user_id: 1,
        template_name: newTemplateName,
        description: "",
        exercises: [
          {
            id: null,
            sets_and_reps: [
              { set: null, reps: null, weight: null, type: "Core" },
            ],
          },
        ],
      };
      state.push(newData);
    },
    removeTemplate(state, action) {
      const { templateId } = action.payload;
      const templateIndex = state.findIndex(
        (template) => template.id === templateId
      );
      state.splice(templateIndex, 1);
    },
    addExercise(state, action) {
      const { templateId } = action.payload;
      const template = state.find((template) => template.id == templateId);
      const newData = {
        id: 1,
        sets_and_reps: [{ set: 1, reps: null, weight: null, rest: null }],
      };
      template.exercises.push(newData);
    },
    addSetAndReps: (state, action) => {
      const { templateId, exerciseIndex, reps, weight, rest_time } =
        action.payload;
      const template = state.find((template) => template.id == templateId);
      const nextSetCount =
        template.exercises[exerciseIndex].sets_and_reps.length + 1;
      const newData = { set: nextSetCount, reps, weight, rest_time };
      const exercise = template.exercises[exerciseIndex];
      exercise.sets_and_reps.push(newData);
    },
    updateSetAndReps: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkoutTemplates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkoutTemplates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.templates = action.payload;
      })
      .addCase(fetchWorkoutTemplates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addWorkoutTemplate.pending, (state) => {
        state.loading = true; 
      })
      .addCase(addWorkoutTemplate.fulfilled, (state, action) => {
        state.loading = false; 
        state.templates.push(action.payload); 
      })
      .addCase(addWorkoutTemplate.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload || action.error.message; 
      })
      .addCase(updateWorkoutTemplate.pending, (state) => {
        state.loading = true; 
      })
      .addCase(updateWorkoutTemplate.fulfilled, (state, action) => {
        state.loading = false; 
        const updatedTemplate = action.payload; 
        const index = state.templates.findIndex(
          (template) => template.id === updatedTemplate.id
        );
        if (index !== -1) {
          state.templates[index] = {
            ...state.templates[index],
            ...updatedTemplate,
          };
        }
      })
      .addCase(updateWorkoutTemplate.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload || action.error.message; 
      })
      .addCase(deleteWorkoutTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWorkoutTemplate.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedTemplateId = action.payload;
        console.log(deletedTemplateId);
        state.templates = state.templates.filter(
          (template) => template.id !== deletedTemplateId
        );
      })
      .addCase(deleteWorkoutTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
  addTemplate,
  removeTemplate,
  addExercise,
  addSetAndReps,
  updateSetAndReps,
} = templateSlice.actions;
export default templateSlice.reducer;