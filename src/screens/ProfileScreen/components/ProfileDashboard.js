import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import AppleHealthKit from "react-native-health";

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
    ],
    write: [],
  },
};

const ProfileDashboard = () => {
  const [steps, setSteps] = useState(0);
  const [stairs, setStairs] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  // const specificDate = new Date(2025, 0, 4, 0, 0, 0); // January 1, 2025, at 12:00:00
  const specificDate = new Date(); // January 1, 2025, at 12:00:00
  const [hasPermission, setHasPermission] = useState(false);

  const handleSetStep = () => {
    let options = {
      date: specificDate.toISOString(), // optional; default now
      includeManuallyAdded: false, // optional: default true
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      setSteps(results.value);
    });
    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        return;
      }
      setStairs(results.value);
    });

    AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
      if (err) {
        console.log("Error fetching active energy burned: ", err);
        return;
      }
      setCaloriesBurned(results);
    });
  };

  const requestHealthKitPermissions = () => {
    AppleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        setHasPermission(false);
      } else {
        setHasPermission(true);
      }
    });
  };

  useEffect(() => {
    requestHealthKitPermissions();
  }, []);

  useEffect(() => {
    if (hasPermission) {
      handleSetStep();
    }
  }, [hasPermission]); // Only fetch data once permission is granted

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>Samuel Son</Text>
        <Text style={styles.text}>Total Workouts: 10</Text>
      </View>
      <View style={styles.bodyContainer}>
        <TextInput placeholder="Notes" />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.subBodyContainer}>
          <Icon name="fire" type="font-awesome" color="#FF4500" size={24} />
          <Text style={styles.text}>{caloriesBurned}</Text>
        </View>
        <View style={styles.subBodyContainer}>
          <Icon
            name="stairs"
            type="material-community"
            color="#1E90FF"
            size={24}
          />
          <Text style={styles.text}>{steps}</Text>
        </View>
        <View style={styles.subBodyContainer}>
          <Icon
            name="shoe-prints"
            type="font-awesome-5"
            color="#32CD32"
            size={24}
          />
          <Text style={styles.text}>{stairs}</Text>
        </View>
      </View>
      <View style={styles.footerContainer}></View>
    </View>
  );
};

export default ProfileDashboard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#1E2923",
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    gap: 10,
    // alignItems: "center",
    // backgroundColor: "#1E2923",
    // backgroundGradientFrom: "#1E2923",
    // backgroundGradientTo: "#08130D",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subBodyContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  footerContainer: {
    flexDirection: "row",
  },
  text: {
    color: "white",
  },
});
