import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./navigation/Navigation";
import { Provider, useDispatch } from "react-redux";
import Store from "./redux/Store";
import { useEffect } from "react";
import {
  fetchExercises,
  fetchWorkoutHistory,
  fetchWorkoutSchedules,
  fetchWorkoutTemplates,
} from "./services/api";

export default function App() {
  return (
    <Provider store={Store}>
      <AppContent />
    </Provider>
  );
}

// This component contains the dispatch logic
function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExercises());
    dispatch(fetchWorkoutTemplates());
    dispatch(fetchWorkoutHistory());
    dispatch(fetchWorkoutSchedules());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
