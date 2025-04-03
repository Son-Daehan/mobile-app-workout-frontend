import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import ExerciseSetEdit from "./ExerciseSetEdit";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native";

const ExerciseCard = ({
  exercise,
  exerciseIndex,
  template,
  setTemplate,
  currentExerciseIndex,
  currentSet,
  edit = true,
}) => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [setStatus, setSetStatus] = useState(false);

  const handleSetChange = (value, setIndex, type) => {
    setTemplate((prevState) => {
      const updatedTemplate = { ...prevState };
      const updatedExercises = [...updatedTemplate.exercises];
      const updatedSets = [...updatedExercises[exerciseIndex].sets];

      updatedSets[setIndex] = {
        ...updatedSets[setIndex],
        [type.toLowerCase()]: value,
      };

      updatedExercises[exerciseIndex] = {
        ...updatedExercises[exerciseIndex],
        sets: updatedSets,
      };

      updatedTemplate.exercises = updatedExercises;
      return updatedTemplate;
    });
  };

  const handleAddSet = () => {
    setTemplate((prevState) => {
      const updatedTemplate = { ...prevState };
      const updatedExercises = [...updatedTemplate.exercises];
      const updatedSets = [...updatedExercises[exerciseIndex].sets];

      updatedSets.push({
        set: updatedSets.length + 1,
        reps: null,
        weight: null,
        type: "Core",
        status: "Not Complete",
      });

      updatedExercises[exerciseIndex] = {
        ...updatedExercises[exerciseIndex],
        sets: updatedSets,
      };

      updatedTemplate.exercises = updatedExercises;
      return updatedTemplate;
    });
  };

  const handleDeleteExercise = () => {
    setTemplate((prevState) => {
      const updatedTemplate = { ...prevState };
      const updatedExercises = [...updatedTemplate.exercises];

      updatedExercises.splice(exerciseIndex, 1);
      updatedTemplate.exercises = updatedExercises;

      return updatedTemplate;
    });
    setDropdownVisible(false);
  };

  const handleSetStatus = (setIndex) => {
    setTemplate((prevTemplate) => {
      const updatedTemplate = { ...prevTemplate };
      const updatedExercises = [...updatedTemplate.exercises];
      const currentExercise = { ...updatedExercises[exerciseIndex] };
      const updatedSets = [...currentExercise.sets];

      // Check if reps or weight is null before updating status
      const currentSet = updatedSets[setIndex];
      if (currentSet.reps === null || currentSet.weight === null) {
        alert("Please fill in reps and weight before marking as complete.");
        return prevTemplate; // Prevent status change if missing reps or weight
      }

      if (updatedSets[setIndex]) {
        updatedSets[setIndex] = {
          ...updatedSets[setIndex],
          status: setStatus ? "Not Complete" : "Complete",
        };

        currentExercise.sets = updatedSets;
        updatedExercises[exerciseIndex] = currentExercise;
        updatedTemplate.exercises = updatedExercises;
      }
      setSetStatus(!setStatus);

      return updatedTemplate;
    });
  };

  return (
    <React.Fragment>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            {exercise?.exercise?.name ||
              exercises?.find((e) => e?.id === exercise?.exercise)?.name}
          </Text>
          <TouchableOpacity
            onPress={(e) => setDropdownVisible(!dropdownVisible)}
          >
            <Icon style={styles.headerIcon} name="settings" />
          </TouchableOpacity>
        </View>

        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.iconCell]}></Text>
          <View style={styles.subRow}>
            <Text style={[styles.cell, styles.setCell]}>Set</Text>
            <Text style={[styles.cell, styles.previousCell]}>Previous</Text>
            <View style={styles.weightRepCell}>
              <Text style={[styles.cell, styles.weightCell]}>Weight</Text>
              <Text style={[styles.cell, styles.repsCell]}>Reps</Text>
            </View>
            {!edit && <Text style={[styles.cell, styles.statusCell]}></Text>}
          </View>
        </View>

        {exercise?.sets?.map((set, setIndex) => (
          <View key={setIndex} style={styles.row}>
            <View style={styles.iconCell}>
              <ExerciseSetEdit
                set={set}
                setIndex={setIndex}
                exerciseIndex={exerciseIndex}
                template={template}
                setTemplate={setTemplate}
              />
            </View>
            <View
              style={[
                styles.subRow,
                set.status === "Complete" && styles.setComplete,
              ]}
            >
              <Text style={[styles.cell, styles.setCell]}>{set.set}</Text>
              <Text style={[styles.cell, styles.previousCell]}>500 x 10</Text>
              <View style={styles.weightRepCell}>
                <TextInput
                  value={set.weight?.toString() || ""}
                  onChangeText={(value) =>
                    handleSetChange(value, setIndex, "Weight")
                  }
                  style={styles.input}
                  placeholder="Weight"
                  placeholderTextColor="gray"
                />
                <TextInput
                  value={set.reps?.toString() || ""}
                  onChangeText={(value) =>
                    handleSetChange(value, setIndex, "Reps")
                  }
                  style={styles.input}
                  placeholder="Reps"
                  placeholderTextColor="gray"
                />
              </View>
              {!edit && (
                <View style={styles.statusCell}>
                  {set?.status === "Complete" ? (
                    <Icon
                      name="check-circle"
                      type="material"
                      color="black"
                      size={30}
                      onPress={() => handleSetStatus(setIndex)}
                    />
                  ) : (
                    <Icon
                      name="radio-button-unchecked"
                      type="material"
                      color="gray"
                      size={30}
                      onPress={() => handleSetStatus(setIndex)}
                    />
                  )}
                </View>
              )}
            </View>
          </View>
        ))}
        <View style={styles.addSetButtonContainer}>
          <Button title="Add Set" onPress={handleAddSet} />
        </View>
      </View>
      {dropdownVisible && (
        <View
          style={[
            styles.dropdownContainer,
            { top: dropdownPosition.y, left: dropdownPosition.x },
          ]}
        >
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={handleDeleteExercise}
          >
            <Text style={{ color: "black" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: "#121A14",
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "grey",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  headerIcon: {
    color: "white",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  headerRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 10,
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  setComplete: {
    backgroundColor: "green",
  },
  cell: {
    textAlign: "center",
    color: "white",
  },
  iconCell: {
    flex: 0.1,
  },
  setCell: {
    flex: 0.5,
  },
  previousCell: {
    flex: 1,
  },
  weightRepCell: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 2,
    alignItems: "center",
  },
  weightCell: {
    // flex: 1,
    width: 65,
    textAlign: "center",
  },
  repsCell: {
    // flex: 1,
    width: 65,
    textAlign: "center",
  },
  statusCell: {
    flex: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 5,
    textAlign: "center",
    fontSize: 14,
    marginHorizontal: 4,
    color: "white",
    width: 65,
  },
  addSetButtonContainer: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#ccc",
    marginTop: 10,
  },
  dropdownContainer: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 6,
    elevation: 5,
    zIndex: 999,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default ExerciseCard;
