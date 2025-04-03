import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native"; // Import View and Text from React Native
import WorkoutPlanner from "./components/WorkoutPlanner";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkoutSchedules } from "../../services/api";

const WorkoutPlannerScreen = () => {
  const navigation = useNavigation();
  const templates = useSelector((state) => state.templates);
  const dispatch = useDispatch();

  const navigateToBlankActiveWorkout = () => {
    navigation.navigate("ActiveWorkout", {
      templateId: null,
      newTemplateName: "Quick Start",
      isNewTemplate: true,
    });
  };

  useEffect(() => {
    dispatch(fetchWorkoutSchedules());
  }, [templates]);

  return (
    <View style={styles.container}>
      <Header title="Workout Planner" />
      <View style={styles.quickWorkoutContainer}>
        <TouchableOpacity
          style={styles.startWorkoutButton}
          onPress={() => navigateToBlankActiveWorkout()}
        >
          <Text style={styles.buttonText}>START QUICK WORKOUT</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <WorkoutPlanner />
          {/* <Calendar /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default WorkoutPlannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    // gap: 20,
    // marginTop: 20,
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#000000",
  },
  quickWorkoutContainer: {
    // padding: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  startWorkoutButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    paddingHorizontal: 80,
    borderRadius: 6,
    width: "100%",
    // marginBottom: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});
