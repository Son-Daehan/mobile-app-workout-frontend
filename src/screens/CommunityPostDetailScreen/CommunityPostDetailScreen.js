import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import CommunityPostDetailHeader from "./components/CommunityPostDetailHeader";
import CommunityPostDetailCard from "./components/CommunityPostDetailCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommunityPost,
  fetchCommunityPostComments,
} from "../../services/api";
import CreateComment from "./components/CreateComment";

const CommunityPostDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { communityPostId } = route.params;
  const communityPost = useSelector((state) =>
    state.communityPosts.communityPosts.find(
      (post) => post.id === communityPostId
    )
  );
  const communityPostComments = useSelector(
    (state) => state.communityPostComments.communityPostComments
  );
  const [communityPostCommentId, setCommunityPostCommentId] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // To track TextInput focus

  const renderItem = ({ item }) => (
    <CommunityPostDetailCard
      communityPostComments={item}
      setCommunityPostCommentId={setCommunityPostCommentId}
      setIsFocused={setIsFocused}
    />
  );

  useEffect(() => {
    dispatch(fetchCommunityPost(communityPostId));
    dispatch(fetchCommunityPostComments(communityPost));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <Header title={"Community"} /> */}
        <Icon
          name="arrow-left" // Use "arrow-back" for go back
          type="material"
          color="white"
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <CommunityPostDetailHeader communityPost={communityPost} />
          <FlatList
            data={communityPostComments}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.bodyContentContainer}
            // snapToInterval={360} // Adjust to the width of each item (including spacing)
            decelerationRate="fast" // Makes the scrolling feel snappier
            // snapToAlignment="center" // Aligns snapped items to the center
          />
        </View>
      </ScrollView>
      <CreateComment
        communityPostId={communityPostId}
        parentCommentId={communityPostCommentId}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
      />
    </View>
  );
};

export default CommunityPostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  headerContainer: {
    flexDirection: "row",
    padding: 20,
  },
  bodyContainer: {
    // padding: 20,
    gap: 10,
  },
  bodyContentContainer: {
    gap: 10,
  },
  text: {
    color: "white",
  },
});
