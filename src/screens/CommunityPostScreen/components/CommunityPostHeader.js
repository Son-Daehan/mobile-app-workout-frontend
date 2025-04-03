import React from "react";
import { StyleSheet, View, Text } from "react-native";

const CommunityPostHeader = ({ community }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContainerLeft}>
            <Text style={styles.text}>{community?.name}</Text>
            <Text style={styles.text}>516,815 MEMBERS - 96 ONLINE</Text>
          </View>
          <View style={styles.headerContainerRight}>
            <Text style={styles.text}>ICON</Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.text} numberOfLines={2}>
            {community.description}
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.text}>Details</Text>
        </View>
      </View>
    </View>
  );
};

export default CommunityPostHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E2923",
    // height: 100,
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 4,
    borderColor: "black",
  },
  wrapper: {
    width: "100%",
    padding: 15,
    gap: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainerLeft: {
    flexDirection: "column",
    justifyContent: "center",
  },
  headerContainerRight: {
    flexDirection: "column",
    justifyContent: "center",
  },
  bodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
  },
});
