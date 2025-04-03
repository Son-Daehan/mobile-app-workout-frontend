import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../../components/Header";
import ChallengeCard from "./components/ChallengeCard";

const challenges = [
  { id: "1", name: "Challenge 1", description: "Description of challenge 1" },
  { id: "2", name: "Challenge 2", description: "Description of challenge 2" },
  { id: "3", name: "Challenge 3", description: "Description of challenge 3" },
  // Add more challenge objects here as needed
];

const ChallengeScreen = ({ navigation }) => {
  const navigateToDetail = (challengeId) => {
    navigation.navigate("ChallengeDetail", { id: challengeId });
  };

  const renderChallengeItem = ({ item }) => (
    <ChallengeCard
      title={item.name}
      description={item.description}
      onPress={() => navigateToDetail(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Challenges" />
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={renderChallengeItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ChallengeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  list: {
    padding: 20,
  },
});
