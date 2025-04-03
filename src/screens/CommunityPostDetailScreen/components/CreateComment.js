import React, { useEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { addCommunityPostComment } from "../../../services/api";
import { Keyboard } from "react-native";

export default function CreateComment({
  communityPostId,
  parentCommentId = null,
  isFocused,
  setIsFocused,
}) {
  const keyboard = useAnimatedKeyboard();
  const dispatch = useDispatch();
  const [comment, setComment] = useState();
  const textInputRef = useRef(null); // Create a ref for TextInput

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: isFocused
          ? -(keyboard.height.value - 87) // Move down by both navbar height and keyboard height
          : 0, // No translation when the TextInput is not focused
      },
    ],
  }));

  // Handle focus and blur to update the state of the TextInput
  const handleFocus = () => {
    setIsFocused(true); // When focused, set isFocused to true
  };

  const handleBlur = () => {
    setIsFocused(false); // When blurred, set isFocused to false
  };

  const handleSubmitComment = () => {
    const commentData = {
      content: comment,
      parent: parentCommentId, // If it's a reply, include the parent comment ID
    };

    dispatch(addCommunityPostComment({ data: commentData, communityPostId }))
      .then(() => {
        setComment("");
        setIsFocused(false);
        Keyboard.dismiss(); // Hide keyboard after submitting
      })
      .catch((error) => console.error("Failed to post comment:", error));
  };

  useEffect(() => {
    if (isFocused && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <Animated.View
      style={[
        animatedStyles,
        isFocused ? styles.expandedContainer : styles.container,
      ]}
    >
      <View style={isFocused ? styles.expandedBox : styles.box}>
        <TextInput
          editable
          ref={textInputRef}
          placeholderTextColor="white"
          style={isFocused ? styles.expandedTextInput : styles.textInput}
          placeholder="Leave a comment..."
          onFocus={handleFocus} // Set focus when clicked
          onBlur={handleBlur} // Set blur when unfocused
          multiline={true}
          scrollEnabled={true}
          onChangeText={setComment}
          value={comment}
        />
        {isFocused && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleSubmitComment}
          >
            <Icon name="send" type="material" color="white" size={24} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 6,
    borderWidth: 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#1E2923",
  },
  expandedContainer: {
    borderWidth: 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#1E2923",
  },
  box: {
    alignItems: "center",
    height: 40,
    borderRadius: 5,
  },
  expandedBox: {
    paddingVertical: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 140,
    borderRadius: 5,
  },
  textInput: {
    height: 40,
    width: "90%",
    borderRadius: 5,
    color: "white",
  },
  expandedTextInput: {
    height: 85,
    width: "90%",
    borderRadius: 5,
    color: "white",
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: "white",
  },
});
