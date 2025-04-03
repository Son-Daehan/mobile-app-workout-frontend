import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WorkoutHistoryCard = ({ workout }) => {
  const handleCountSets = (sets) => {
    const setCount = sets.length;
    return setCount;
  };

  const handleHighestWeight = (sets) => {
    let highestWeight = 0;
    sets?.map((set) => {
      if (set.weight > highestWeight) {
        highestWeight = set.weight;
      }
    });
    return highestWeight;
  };

  const parseAndFormatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{workout?.template_name}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{parseAndFormatDate(workout?.date)}</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Stats</Text>
        <Text style={styles.statsText}>Stats</Text>
        <Text style={styles.statsText}>Stats</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyHeaderContainer}>
          <Text style={styles.bodyHeaderText}>Exercises</Text>
          <Text style={styles.bodyHeaderText}>Best Weight</Text>
        </View>
        {workout?.exercises?.map((exercise, index) => (
          <View key={index} style={styles.bodyContentContainer}>
            <Text style={styles.bodyContentText} numberOfLines={1}>
              {handleCountSets(exercise.sets)} x {exercise?.exercise?.name}
            </Text>
            <Text style={styles.bodyContentText}>
              {handleHighestWeight(exercise.sets)}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.footerContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E2923",
    borderRadius: 5,
    padding: 15,
    gap: 3,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: 600,
    color: "white",
  },
  dateContainer: {},
  dateText: {
    fontSize: 14,
    fontWeight: 400,
    color: "gray",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsText: {
    color: "gray",
  },
  bodyContainer: {
    flexDirection: "column",
    gap: 2,
  },
  bodyHeaderContainer: {
    flexDirection: "row",
  },
  bodyHeaderText: {
    fontWeight: 500,
    width: "50%",
    color: "white",
  },
  bodyContentContainer: {
    flexDirection: "row",
  },
  bodyContentText: {
    width: "50%",
    color: "white",
  },

  footerContainer: {},
  footerText: {},
});

export default WorkoutHistoryCard;
