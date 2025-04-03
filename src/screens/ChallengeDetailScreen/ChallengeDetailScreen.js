import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";

const ChallengeDetailScreen = ({ route }) => {
  const { id } = route.params; // This will grab the challenge ID passed from ChallengeScreen
  const navigation = useNavigation();

  // Mock data (replace this with actual data fetching logic)
  const challengeDetail = {
    name: "Challenge 1",
    description: "Detailed description of Challenge 1",
    goal: "1000 Steps",
    startDate: "01/01/2025",
    endDate: "01/31/2025",
    status: "Ongoing",
    progress: [50, 100, 150, 200, 300], // Example progress data
    participants: ["User1", "User2", "User3"],
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title={challengeDetail.name} />
        <Text
          style={{ color: "red", padding: 20 }}
          onPress={() => navigation.goBack()}
        >
          X
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{challengeDetail.name}</Text>
        <Text style={styles.section}>{challengeDetail.description}</Text>
        <Text style={styles.section}>Goal: {challengeDetail.goal}</Text>
        <Text style={styles.section}>
          Start Date: {challengeDetail.startDate}
        </Text>
        <Text style={styles.section}>End Date: {challengeDetail.endDate}</Text>
        <Text style={styles.section}>Status: {challengeDetail.status}</Text>
        <Text style={styles.section}>
          Participants: {challengeDetail.participants.join(", ")}
        </Text>

        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Progress Tracker</Text>
          {/* This would ideally be a graph or chart */}
          <Text>Progress bar or graph goes here</Text>
        </View>
      </View>
    </View>
  );
};

export default ChallengeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 10,
  },
  bodyContainer: {
    padding: 20,
  },
  section: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  progressSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 10,
  },
});
