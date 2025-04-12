import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import {
  addCommunityPostCommentLike,
  deleteCommunityPostCommentLike,
} from "../services/api";
const ReplyLikeWidget = ({ item }) => {
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(addCommunityPostCommentLike(item.id));
  };
  const handleDislike = () => {
    dispatch(deleteCommunityPostCommentLike(item.id));
  };
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.iconLeftWrapper} onPress={handleLike}>
        <Icon name="keyboard-arrow-up" type="material" color="gray" size={18} />
        <Text style={styles.text}>{item?.like_count || "0"}</Text>
      </TouchableOpacity>
      <View style={styles.pipe} />
      <TouchableOpacity style={styles.iconRightWrapper} onPress={handleDislike}>
        <Icon
          name="keyboard-arrow-down"
          type="material"
          color="gray"
          size={18}
        />
      </TouchableOpacity>
    </View>
  );
};
export default ReplyLikeWidget;
const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: ".5",
    alignItems: "center",
    gap: 5,
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
    backgroundColor: "gray",
    marginHorizontal: 8,
  },
  text: {
    color: "gray",
  },
});