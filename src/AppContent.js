import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./navigation/Navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchExercises } from "./services/api";

// This component contains the dispatch logic
function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExercises());
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
  },
});
