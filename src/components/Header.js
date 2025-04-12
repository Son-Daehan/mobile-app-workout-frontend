import React from "react";
import { StyleSheet, View, Text } from "react-native";
const SubHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
};
export default SubHeader;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#000000",
  },
  headerContainer: {},
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "white",
  },
});