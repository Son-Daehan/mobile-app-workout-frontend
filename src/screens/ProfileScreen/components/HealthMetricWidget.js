import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
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

const HealthMetricWidget = () => {
	const [steps, setSteps] = useState(0);
	const [stairs, setStairs] = useState(0);
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
			console.log(results);
			setSteps(results.value);
		});
		AppleHealthKit.getFlightsClimbed(options, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log(results);
			setStairs(results.value);
		});
	};

	const requestHealthKitPermissions = () => {
		AppleHealthKit.initHealthKit(permissions, (error) => {
			if (error) {
				console.log("[ERROR] Cannot grant permissions!");
				setHasPermission(false);
			} else {
				console.log("Permissions granted!");
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
			<View>
				<Text style={styles.text}>
					{steps} | {stairs}
				</Text>
			</View>
		</View>
	);
};

export default HealthMetricWidget;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 15,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
		alignItems: "center",
		backgroundColor: "#1E2923",
		backgroundGradientFrom: "#1E2923",
		backgroundGradientTo: "#08130D",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
		color: "white",
	},
	chart: {
		borderRadius: 16,
	},
	text: {
		color: "white",
	},
});
