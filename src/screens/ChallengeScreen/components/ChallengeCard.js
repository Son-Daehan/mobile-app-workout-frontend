import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const ChallengeCard = ({ title, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

export default ChallengeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2A2A2A",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    color: "gray",
    fontSize: 14,
    marginTop: 5,
  },
});
