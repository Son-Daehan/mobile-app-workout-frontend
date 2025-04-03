import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CommunityPostCard from "./components/CommunityPostCard";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import CommunityPostHeader from "./components/CommunityPostHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityPosts } from "../../services/api";
import CommunityPostCreateModal from "./components/CommunityPostCreateModal";

const CommunityPostScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { community } = route.params;
  const communityPosts = useSelector(
    (state) => state.communityPosts.communityPosts
  );

  const renderItem = ({ item }) => (
    <CommunityPostCard
      communityPost={item}
      onPress={() =>
        navigation.navigate("CommunityPostDetail", { communityPostId: item.id })
      }
    />
  );

  useEffect(() => {
    dispatch(fetchCommunityPosts(community));
  }, [dispatch]);

  return (
    <>
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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={[styles.text, styles.button]}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subHeaderContainer}>
          <CommunityPostHeader community={community} />
        </View>
        {/* <ScrollView> */}
        {/* <View style={styles.bodyContainer}> */}
        <FlatList
          data={communityPosts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bodyContainer}
          // snapToInterval={360} // Adjust to the width of each item (including spacing)
          // decelerationRate="fast" // Makes the scrolling feel snappier
          // snapToAlignment="center" // Aligns snapped items to the center
        />
        {/* </View> */}
        {/* </ScrollView> */}
      </View>
      <CommunityPostCreateModal
        community={community}
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </>
  );
};

export default CommunityPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  subHeaderContainer: {
    // paddingHorizontal: 20,
    borderBottomWidth: "1",
    borderBottomColor: "black",
  },
  text: {
    color: "white",
  },
  bodyContainer: {
    // padding: 20,
    gap: 2,
  },
  button: {
    padding: 10,
  },
});
