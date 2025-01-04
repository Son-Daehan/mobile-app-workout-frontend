import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

const ProfileDashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Samuel Son</Text>
        <Text>Total Workouts: 10</Text>
      </View>
      <View style={styles.bodyContainer}>
        <TextInput placeholder="Notes" />
      </View>
      <View style={styles.footerContainer}></View>
    </View>
  );
};

export default ProfileDashboard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    // alignItems: "center",
    // backgroundColor: "#1E2923",
    // backgroundGradientFrom: "#1E2923",
    // backgroundGradientTo: "#08130D",
  },
  headerContainer: {
    flexDirection: "row",
  },
  bodyContainer: {
    flexDirection: "row",
  },
  footerContainer: {
    flexDirection: "row",
  },
});
