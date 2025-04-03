import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CommunityCard = ({ community, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Text style={styles.text}>{community.name}</Text>
          <Text style={styles.text}>Header</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.text}>{community.description}</Text>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.text}>{community.created_at}</Text>
          <Text style={styles.text}>Footer</Text>
          <Text style={styles.text}>Footer</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E2923",
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 350,
  },
  wrapper: {
    width: "100%",
    padding: 10,
    gap: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
  },
});
