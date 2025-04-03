import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TemplateExerciseCard = ({ exercise, sets }) => {
  console.log(sets);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>{exercise.name}</Text>
      </View>
      <View style={[styles.bodyContainer, styles.bodyHeader]}>
        <Text style={[styles.itemText, styles.blankItemIcon]}></Text>
        <View style={styles.itemContainer}>
          <Text style={[styles.itemText, styles.itemSet]}>Set</Text>
          <Text style={[styles.itemText, styles.itemBlank]}></Text>
          <View style={styles.rightItemContainer}>
            <Text style={[styles.itemText, styles.itemWeight]}>Weight</Text>
            <Text style={[styles.itemText, styles.itemReps]}>Reps</Text>
          </View>
        </View>
      </View>
      {sets &&
        sets.map((set) => {
          return (
            <>
              <View style={styles.bodyContainer}>
                {set.type === "Warmup" && (
                  <Text style={[styles.itemText, styles.itemIcon]}>W</Text>
                )}
                {set.type === "Core" && (
                  <Text style={[styles.itemText, styles.itemIcon]}>C</Text>
                )}
                {set.type === "Dropset" && (
                  <Text style={[styles.itemText, styles.itemIcon]}>D</Text>
                )}
                {set.type === "Failure" && (
                  <Text style={[styles.itemText, styles.itemIcon]}>F</Text>
                )}
                {/* <Text style={[styles.itemText, styles.itemIcon]}>W</Text> */}
                <View style={styles.itemContainer}>
                  <Text style={[styles.itemText, styles.itemSet]}>
                    {set.set}
                  </Text>
                  <Text style={[styles.itemText, styles.itemBlank]}></Text>
                  <View style={styles.rightItemContainer}>
                    <Text style={[styles.itemText, styles.itemWeight]}>
                      150
                    </Text>
                    <Text style={[styles.itemText, styles.itemReps]}>8</Text>
                    {/* <Text style={styles.text}>{set.weight}</Text>
                  <Text style={styles.text}>{set.reps}</Text> */}
                  </View>
                </View>
              </View>
            </>
          );
        })}
    </View>
  );
};

export default TemplateExerciseCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  headerContainer: {},
  bodyContainer: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  bodyHeader: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  leftItemContainer: {
    flex: 0.4,
  },
  middleItemContainer: {
    flex: 1,
  },
  rightItemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 2,
    alignItems: "center",
  },
  footerContainer: {},
  text: {
    color: "white",
  },
  blankItemIcon: {
    flex: 0.1,
    paddingVertical: 5,
    borderRadius: 5,
  },
  itemIcon: {
    flex: 0.1,
    paddingVertical: 5,
    // padding: 2,
    // width: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  itemBlank: {
    flex: 1,
  },
  itemSet: {
    flex: 1,
  },
  itemWeight: {
    width: 65,
    textAlign: "center",
  },
  itemReps: {
    width: 65,
    textAlign: "center",
  },
  itemText: {
    color: "white",
    textAlign: "center",
  },
});
