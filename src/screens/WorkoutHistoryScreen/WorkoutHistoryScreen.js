import React, { useEffect } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import WorkoutHistoryCard from "./components/WorkoutHistoryCard";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const WorkoutHistoryScreen = () => {
  const workoutHistory = useSelector(
    (state) => state.workoutHistory.workoutHistory
  );
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Workout History</Text>
        <Button title="Exit" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
          {workoutHistory?.map((workout, index) => {
            return <WorkoutHistoryCard key={index} workout={workout} />;
          })}
        </View>
      </ScrollView>
      {/* <View style={styles.footerContainer}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    // marginVertical: 20,
    padding: 20,
    gap: 20,
    marginBottom: 40,
    backgroundColor: "black",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 26,
    fontWeight: 600,
    color: "white",
  },
  bodyContainer: {
    gap: 20,
  },
  footerContainer: {},
});

export default WorkoutHistoryScreen;
