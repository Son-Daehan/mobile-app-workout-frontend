import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import LikeWidget from "../../../components/LikeWidget";
import ReplyWidget from "../../../components/ReplyWidget";
import CommentReplies from "./CommentReplies";
import ReplyLikeWidget from "../../../components/ReplyLikeWidget";

const CommunityPostDetailCard = ({
  communityPostComments,
  setCommunityPostCommentId,
  setIsFocused,
}) => {
  const [showReplies, setShowReplies] = useState(false);

  console.log(communityPostComments);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentWrapper}>
        <View style={styles.headerContainer}>
          <Text style={styles.userText}>{communityPostComments.user}</Text>
          <Text style={styles.timeText}>- 4d</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.commentText}>
            {communityPostComments.content}
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.footerTopWrapper}>
            <ReplyWidget
              item={communityPostComments.id}
              setCommunityPostCommentId={setCommunityPostCommentId}
              setIsFocused={setIsFocused}
            />
            <ReplyLikeWidget item={communityPostComments} />
          </View>
          {communityPostComments.replies.length > 0 && (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={toggleReplies}
            >
              <Text style={styles.toggleText}>
                {showReplies
                  ? `Hide Replies`
                  : `View ${communityPostComments.replies.length} ${
                      communityPostComments.replies.length > 1
                        ? "Replies"
                        : "Reply"
                    }`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showReplies && (
        <View style={styles.repliesContainer}>
          <View style={styles.replyIndicator} />
          <CommentReplies
            replies={communityPostComments.replies}
            setCommunityPostCommentId={setCommunityPostCommentId}
            setIsFocused={setIsFocused}
          />
        </View>
      )}
    </View>
  );
};

export default CommunityPostDetailCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E2923",
    // padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
  },
  commentWrapper: {
    padding: 15,
    gap: 12,
  },
  headerContainer: {
    flexDirection: "row",
    gap: 10,
  },
  bodyContainer: {},
  footerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 2,
  },
  footerTopWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggleButton: {
    marginTop: 10,
  },
  userText: {
    color: "white",
    fontSize: 16,
  },
  timeText: {
    color: "gray",
    fontSize: 12,
  },
  commentText: {
    color: "white",
    fontSize: 14,
  },
  toggleText: {
    color: "lightblue",
    fontSize: 12,
  },
  repliesContainer: {
    flexDirection: "row",
    // marginTop: 10,
    paddingLeft: 20,
  },
  replyIndicator: {
    width: 2,
    backgroundColor: "gray",
    // marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
});
