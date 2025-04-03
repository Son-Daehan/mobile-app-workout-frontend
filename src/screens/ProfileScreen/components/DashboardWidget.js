import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const DashboardWidget = ({ title }) => {
  const data = [
    { value: 1, label: "12/1" },
    { value: 2, label: "12/8" },
    { value: 3, label: "12/15" },
    { value: 4, label: "12/22" },
    { value: 5, label: "12/29" },
    { value: 6, label: "1/5" },
    { value: 7, label: "1/12" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{title}</Text>
      <BarChart
        data={data}
        barWidth={15}
        barColor="rgba(20, 248, 255, 0.8)"
        spacing={20}
        cornerRadius={{ topRight: 5, topLeft: 5 }}
        noOfSections={10}
        backgroundColor="#1E2923"
        valueFontSize={12}
        labelFontSize={12}
      />
    </View>
  );
};

export default DashboardWidget;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1E2923",
    borderRadius: 5,
    alignItems: "center",
    // height: 200,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 10,
  },
});
