import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { addCommunityPostLike, deleteCommunityPostLike } from "../services/api";
const LikeWidget = ({ item }) => {
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(addCommunityPostLike(item.id));
  };
  const handleDislike = () => {
    dispatch(deleteCommunityPostLike(item.id));
  };
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.iconLeftWrapper} onPress={handleLike}>
        <Icon
          name="keyboard-arrow-up"
          type="material"
          color="white"
          size={24}
        />
        <Text style={styles.text}>{item?.like_count || "0"}</Text>
      </TouchableOpacity>
      <View style={styles.pipe} />
      <TouchableOpacity style={styles.iconRightWrapper} onPress={handleDislike}>
        <Icon
          name="keyboard-arrow-down"
          type="material"
          color="white"
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};
export default LikeWidget;
const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: ".5",
    padding: 5,
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
    backgroundColor: "white",
    marginHorizontal: 8,
  },
  text: {
    color: "white",
  },
});