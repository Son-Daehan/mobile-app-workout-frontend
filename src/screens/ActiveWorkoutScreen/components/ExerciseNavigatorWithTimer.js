import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const ExerciseNavigatorWithTimer = ({
  currentExerciseIndex,
  totalExercises,
  exercises,
  currentSet,
  onPrevious,
  onNext,
}) => {
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(0);

  const currentExercise =
    exercises[currentExerciseIndex]?.exercise?.name || "Unknown Exercise";

  useEffect(() => {
    let interval;
    if (isResting) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResting]);

  const handleNext = () => {
    if (!isResting) {
      setIsResting(true);
      setTimer(0);
    } else {
      setIsResting(false);
      onNext();
    }
  };

  const getMiddleDisplay = () => {
    if (isResting) {
      const nextExercise =
        currentSet === exercises[currentExerciseIndex]?.sets?.length
          ? exercises[currentExerciseIndex + 1]?.exercise?.name ||
            "End of Workout"
          : currentExercise;

      return (
        <>
          <Text style={styles.exerciseName}>Rest Time</Text>
          <Text style={styles.setInfo}>Next: {nextExercise}</Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.exerciseName}>{currentExercise}</Text>
          <Text style={styles.setInfo}>Set #{currentSet}</Text>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPrevious}
        disabled={currentExerciseIndex === 0 && currentSet === 1}
      >
        <Icon
          name="arrow-left"
          type="material-community"
          color={
            currentExerciseIndex === 0 && currentSet === 1 ? "gray" : "white"
          }
          size={28}
        />
      </TouchableOpacity>
      <View style={styles.middleSection}>
        {getMiddleDisplay()}
        {isResting && (
          <Text style={styles.timer}>
            {`Time: ${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${
              timer % 60
            }`}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={handleNext}
        disabled={
          currentExerciseIndex === totalExercises - 1 &&
          currentSet === exercises[currentExerciseIndex]?.sets?.length
        }
      >
        <Icon
          name="arrow-right"
          type="material-community"
          color={
            currentExerciseIndex === totalExercises - 1 &&
            currentSet === exercises[currentExerciseIndex]?.sets?.length
              ? "gray"
              : "white"
          }
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  middleSection: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  setInfo: {
    fontSize: 16,
    color: "gray",
  },
  timer: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "white",
  },
});

export default ExerciseNavigatorWithTimer;
