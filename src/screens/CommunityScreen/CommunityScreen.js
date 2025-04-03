import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import CommunityCard from "./components/CommunityCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunities } from "../../services/api";
import CommunityCreateModal from "./components/CommunityCreateModal";

const CommunityScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const communities = useSelector((state) => state.communities);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <CommunityCard
      community={item}
      onPress={() => navigation.navigate("CommunityPost", { community: item })}
    />
  );

  useEffect(() => {
    dispatch(fetchCommunities());
  }, [dispatch]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header title={"Community"} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.bodyContainer}>
            <View style={styles.bodyWrapper}>
              <Text style={styles.text}>Recommended</Text>
              <FlatList
                data={communities.communities}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalFlatList}
                snapToInterval={360} // Adjust to the width of each item (including spacing)
                decelerationRate="fast" // Makes the scrolling feel snappier
                // snapToAlignment="center" // Aligns snapped items to the center
              />
            </View>
            <View style={styles.bodyWrapper}>
              <Text style={styles.text}>Recommended</Text>
              <FlatList
                data={communities}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalFlatList}
                snapToInterval={360} // Adjust to the width of each item (including spacing)
                decelerationRate="fast" // Makes the scrolling feel snappier
                // snapToAlignment="center" // Aligns snapped items to the center
              />
            </View>
            <View style={styles.bodyWrapper}>
              <Text style={styles.text}>Recommended</Text>
              <FlatList
                data={communities}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalFlatList}
                snapToInterval={360} // Adjust to the width of each item (including spacing)
                decelerationRate="fast" // Makes the scrolling feel snappier
                // snapToAlignment="center" // Aligns snapped items to the center
              />
            </View>
            <View style={styles.bodyWrapper}>
              <Text style={styles.text}>Recommended</Text>
              <FlatList
                data={communities}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalFlatList}
                snapToInterval={360} // Adjust to the width of each item (including spacing)
                decelerationRate="fast" // Makes the scrolling feel snappier
                // snapToAlignment="center" // Aligns snapped items to the center
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <CommunityCreateModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bodyContainer: {
    // paddingHorizontal: 20,
    gap: 30,
  },
  bodyWrapper: {
    gap: 10,
  },
  horizontalFlatList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  text: {
    color: "white",
    paddingHorizontal: 20,
  },
});
