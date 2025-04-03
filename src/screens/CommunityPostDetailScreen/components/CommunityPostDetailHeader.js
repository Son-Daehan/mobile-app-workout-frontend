import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LikeWidget from "../../../components/LikeWidget";
import CommentWidget from "../../../components/CommentWidget";
import TemplatePreviewModal from "./TemplatePreviewModal";

const CommunityPostDetailHeader = ({ communityPost }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [template, setTemplate] = useState(false);

  const handleTemplateModalVisbility = (template) => {
    setTemplate(template);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>Community</Text>
        <Text style={styles.lightText}>- 4d</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <Text numberOfLines={3} style={[styles.text, styles.headerText]}>
          {communityPost.title}
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={[styles.text, styles.descriptionText]}>
          {communityPost.description}
        </Text>
        <View style={styles.itemContainer}>
          {communityPost &&
            communityPost.workout_template_snapshot.map((template) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleTemplateModalVisbility(template)}
                >
                  <Text style={styles.text}>{template.template_name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.footerLeftWrapper}>
          <LikeWidget item={communityPost} />
          <CommentWidget item={communityPost} />
        </View>
        <TouchableOpacity style={styles.footerRightWrapper}>
          <Text style={styles.text}>Reply</Text>
        </TouchableOpacity>
      </View>
      <TemplatePreviewModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        template={template}
      />
    </View>
  );
};

export default CommunityPostDetailHeader;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    borderBottomWidth: "1",
    borderBottomColor: "black",
    backgroundColor: "#1E2923",
    padding: 15,
    gap: 15,
  },
  headerContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  subHeaderContainer: {},
  bodyContainer: {
    flexDirection: "column",
    gap: 10,
  },
  itemContainer: {
    flexDirection: "column",
    gap: 10,
  },
  item: {
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 20,
    padding: 8,
    width: "75%",
  },
  footerContainer: {
    flexDirection: "row",
    // alignItems: 'center'
    justifyContent: "space-between",
  },
  footerLeftWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  footerRightWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: 600,
  },
  descriptionText: {
    fontSize: 14,
    // padding: 10,
  },
  text: {
    color: "white",
  },
  lightText: {
    color: "gray",
    fontSize: 12,
    textAlign: "center",
  },
});
