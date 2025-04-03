import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import LikeWidget from "../../../components/LikeWidget";
import CommentWidget from "../../../components/CommentWidget";

const CommunityPostCard = ({ communityPost, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Text style={styles.text}>{communityPost.user}</Text>
          <Text style={styles.text}>Icon</Text>
        </View>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.text} numberOfLines={3}>
            {communityPost.title}
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text numberOfLines={3} style={styles.text}>
            {communityPost.description}
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <LikeWidget item={communityPost} />
          <CommentWidget item={communityPost} />
          {/* <Text style={styles.text}>Footer</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityPostCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E2923",
    // height: 100,
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: "0.5",
    borderBottomColor: "black",
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
  subHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerContainer: {
    flexDirection: "row",
    gap: 10,
    // justifyContent: "space-between",
  },
  text: {
    color: "white",
  },
});
