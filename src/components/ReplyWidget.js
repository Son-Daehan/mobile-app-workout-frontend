import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const ReplyWidget = ({ item, setCommunityPostCommentId, setIsFocused }) => {
  const handleReply = () => {
    setCommunityPostCommentId(item);
    setIsFocused(true);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleReply}>
      <Icon name="reply" type="material" color="gray" size={14} />
      <Text style={styles.text}>Reply</Text>
    </TouchableOpacity>
  );
};

export default ReplyWidget;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "black",
    flexDirection: "row",
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: ".5",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    padding: 5,
    paddingRight: 7,
  },
  text: {
    color: "gray",
    fontSize: 12,
  },
});
