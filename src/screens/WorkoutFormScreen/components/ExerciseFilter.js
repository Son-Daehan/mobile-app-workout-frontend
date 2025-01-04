import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomPicker from './CustomPicker'; // Assuming CustomPicker is already implemented

// ExerciseFilter component that manages exercise filtering
const ExerciseFilter = ({ exercises, setFilteredExercises }) => {
  // State for holding the selected filter values
  const [filters, setFilters] = useState({
    primary_muscle_group: '', // Primary muscle group filter
    secondary_muscle_group: '', // Secondary muscle group filter
  });

  // Handler for filter changes when a user selects a new value
  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => {
      // Update the filter state with the new value
      const updatedFilters = { ...prevFilters, [name]: value };
      return updatedFilters;
    });
  };

  // Function to check if an exercise matches the selected filters
  const applyFilters = (exercise) => {
    return (
      // If primary muscle group filter is set, match the exercise's primary muscle group
      (!filters.primary_muscle_group || exercise.primary_muscle_group === filters.primary_muscle_group) &&
      // If secondary muscle group filter is set, match the exercise's secondary muscle group
      (!filters.secondary_muscle_group ||
        exercise.secondary_muscle_groups.includes(filters.secondary_muscle_group))
    );
  };

  // useEffect to update filtered exercises only when exercises or filters change
  useEffect(() => {
    const filteredExercises = exercises?.filter(applyFilters);
    setFilteredExercises(filteredExercises);
  }, [exercises, filters]); // Dependencies: only update when exercises or filters change

  return (
    <View style={styles.filterContainer}>

      {/* Custom picker for selecting primary muscle group */}
      <View style={styles.customerPickerContainer}>
        <CustomPicker
          options={['Chest', 'Back', 'Shoulders', 'Legs', 'Arms']} // List of primary muscle groups
          selectedValue={filters.primary_muscle_group} // Selected value for primary muscle group
          onValueChange={(value) => handleFilterChange('primary_muscle_group', value)} // Update filter on change
        />

        {/* Custom picker for selecting secondary muscle group */}
        <CustomPicker
          options={['Triceps', 'Biceps', 'Core', 'Glutes']} // List of secondary muscle groups
          selectedValue={filters.secondary_muscle_group} // Selected value for secondary muscle group
          onValueChange={(value) => handleFilterChange('secondary_muscle_group', value)} // Update filter on change
        />
      </View>
    </View>
  );
};

// Styles for the filter component
const styles = StyleSheet.create({
  filterContainer: {
    padding: 5, // Padding for the container
    backgroundColor: '#f9f9f9', // Light background color
    borderRadius: 8, // Rounded corners
    shadowColor: '#000', // Shadow color for the container
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 6, // Shadow radius
    elevation: 5, // Elevation for Android
  },
  customerPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 22, // Font size for the title
    fontWeight: 'bold', // Bold text for the title
    marginBottom: 20, // Space below the title
  },
});

export default ExerciseFilter;
