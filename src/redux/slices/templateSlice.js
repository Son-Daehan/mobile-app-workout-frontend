import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWorkoutTemplates,
  addWorkoutTemplate,
  updateWorkoutTemplate,
  deleteWorkoutTemplate,
} from "../../services/api";

const templateSlice = createSlice({
  name: "templates",
  // initialState: workout_templates.workout_templates,
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

      // return newTemplateId
    },

    removeTemplate(state, action) {
      const { templateId } = action.payload;

      const templateIndex = state.findIndex(
        (template) => template.id === templateId
      );

      state.splice(templateIndex, 1);
    },

    // saveTemplate(state, action) {
    //   const { template } = action.payload;

    //   // Await the result of the asynchronous saveWorkoutTemplate function
    //   saveWorkoutTemplate(template)
    //     .then((response) => {
    //       // Log the response (for debugging)
    //       console.log("SAVED", response);

    //       // Update the state with the response (for example, updating the template)
    //       state.templates.push(response); // Update the state with the response data (example)

    //       // You can also dispatch another action to update the state via Redux
    //       // dispatch({ type: 'UPDATE_TEMPLATE', payload: response });
    //     })
    //     .catch((error) => {
    //       // Handle errors if any
    //       console.error("Error saving template:", error);
    //     });
    // },

    // updateTemplate(state, action) {
    //   const { templateId, template, templates } = action.payload;

    //   // If a batch of templates is provided, replace the current state templates
    //   if (templates) {
    //     state.templates = templates;
    //     return;
    //   }

    //   // If a single template is provided, check if it exists
    //   if (template) {
    //     const index = state.templates.findIndex((t) => t.id === templateId);

    //     if (index !== -1) {
    //       // Update the existing template
    //       state.templates[index] = { ...state.templates[index], ...template };
    //     } else {
    //       // Add the new template if it doesn't exist
    //       state.templates.push(template);
    //     }
    //   }
    // },

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

      // Add new set and rep to the exercise
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
        state.loading = true; // Set loading to true when the async operation starts
      })
      .addCase(addWorkoutTemplate.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is successful
        state.templates.push(action.payload); // Add the saved template to the list
      })
      .addCase(addWorkoutTemplate.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request fails
        state.error = action.payload || action.error.message; // Capture the error message
      })
      .addCase(updateWorkoutTemplate.pending, (state) => {
        state.loading = true; // Set loading to true when the async operation starts
      })
      .addCase(updateWorkoutTemplate.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is successful

        const updatedTemplate = action.payload; // Get the updated template from the action payload
        const index = state.templates.findIndex(
          (template) => template.id === updatedTemplate.id
        );

        if (index !== -1) {
          // Update the existing template in the state
          state.templates[index] = {
            ...state.templates[index],
            ...updatedTemplate,
          };
        }
      })
      .addCase(updateWorkoutTemplate.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request fails
        state.error = action.payload || action.error.message; // Capture the error message
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
