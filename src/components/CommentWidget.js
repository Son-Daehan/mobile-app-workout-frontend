import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const CommentWidget = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon name="comment" type="material" color="gray" size={18} />
      <Text style={styles.text}>{item?.comment_count || "0"}</Text>
    </TouchableOpacity>
  );
};

export default CommentWidget;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: ".5",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    padding: 5,
  },
  iconLeftWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  iconRightWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  pipe: {
    width: 1,
    height: "100%",
    backgroundColor: "white",
    marginHorizontal: 8,
  },
  text: {
    color: "white",
  },
});
