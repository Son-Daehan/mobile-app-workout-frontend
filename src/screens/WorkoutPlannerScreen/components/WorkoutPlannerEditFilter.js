import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import CustomPicker from "../../WorkoutFormScreen/components/CustomPicker";

// WorkoutPlannerEditFilter component that manages exercise filtering
const WorkoutPlannerEditFilter = ({ templates, setFilteredTemplates }) => {
  const [searchValue, setSearchValue] = useState("");
  // State for holding the selected filter values
  const [filters, setFilters] = useState({
    primary_muscle_group: "", // Primary muscle group filter
    secondary_muscle_group: "", // Secondary muscle group filter
  });

  const handleSearchFilter = (value) => {
    const updatedFilteredTemplates = templates?.filter((template) =>
      template.template_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTemplates(updatedFilteredTemplates);
  };

  // Handler for filter changes when a user selects a new value
  const handleFilterChange = (name, value) => {
    // setFilters((prevFilters) => {
    //   // Update the filter state with the new value
    //   const updatedFilters = { ...prevFilters, [name]: value };
    //   return updatedFilters;
    // });
  };

  // Function to check if an exercise matches the selected filters
  const applyFilters = (template) => {
    return (
      (!filters.primary_muscle_group ||
        template.primary_muscle_group === filters.primary_muscle_group) &&
      (!filters.secondary_muscle_group ||
        template.secondary_muscle_groups.includes(
          filters.secondary_muscle_group
        ))
    );
  };

  useEffect(() => {
    const filtered = templates?.filter(
      (template) =>
        template.template_name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) && applyFilters(template)
    );
    setFilteredTemplates(filtered);
  }, [templates, searchValue, filters]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={searchValue}
          placeholder="Search for template..."
          onChangeText={(text) => setSearchValue(text)}
          editable
          placeholderTextColor="gray"
          style={styles.input}
        />
      </View>

      {/* <View style={styles.filterContainer}>
        <View style={styles.customerPickerContainer}>
          <CustomPicker
            options={["Chest", "Back", "Shoulders", "Legs", "Arms"]}
            selectedValue={filters.primary_muscle_group}
            onValueChange={(value) =>
              handleFilterChange("primary_muscle_group", value)
            }
          />

          <CustomPicker
            options={["Triceps", "Biceps", "Core", "Glutes"]}
            selectedValue={filters.secondary_muscle_group}
            onValueChange={(value) =>
              handleFilterChange("secondary_muscle_group", value)
            }
          />
        </View>
      </View> */}
    </View>
  );
};

// Styles for the filter component
const styles = StyleSheet.create({
  container: {
    // padding: 5, // Padding for the container
    // backgroundColor: "#f9f9f9", // Light background color
    borderRadius: 5, // Rounded corners
  },
  input: {
    height: 40,
    width: "100%",
    // padding: 20,
    backgroundColor: "#333",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8, // Rounded corners
    borderColor: "grey", // Use a semi-transparent black for a blended effect
    color: "white",
  },
  filterContainer: {},
  customerPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterTitle: {
    fontSize: 22, // Font size for the title
    fontWeight: "bold", // Bold text for the title
    marginBottom: 20, // Space below the title
  },
});

export default WorkoutPlannerEditFilter;
