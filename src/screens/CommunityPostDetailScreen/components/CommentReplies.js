import React from "react";
import { StyleSheet, View } from "react-native";
import CommunityPostDetailCard from "./CommunityPostDetailCard";

const CommentReplies = ({
  replies,
  setCommunityPostCommentId,
  setIsFocused,
}) => {
  return (
    <View style={styles.repliesContainer}>
      {replies.map((reply) => (
        <CommunityPostDetailCard
          key={reply.id}
          communityPostComments={reply}
          setCommunityPostCommentId={setCommunityPostCommentId}
          setIsFocused={setIsFocused}
        />
      ))}
    </View>
  );
};

export default CommentReplies;

const styles = StyleSheet.create({
  repliesContainer: {
    // marginLeft: 5, // Indent replies to visually show hierarchy
    width: "100%",
  },
});
