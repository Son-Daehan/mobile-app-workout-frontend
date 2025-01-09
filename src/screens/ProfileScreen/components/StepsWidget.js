import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppleHealthKit from "react-native-health";
import { BarChart } from "react-native-chart-kit";
import StepBarChart from "./StepBarChart";

const StepsWidget = () => {
	const [steps, setSteps] = useState(null);
	const [days, setDays] = useState(10);

	const fetchSteps = () => {
		const endDate = new Date();
		endDate.setHours(23, 59, 59, 999);
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - days);

		let options = {
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString(),
		};

		AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
			if (err) {
				console.log("[ERROR] getDailyStepCountSamples:", err);
				return;
			}

			// Aggregate step counts by date
			const aggregatedSteps = results.reduce((acc, result) => {
				// Extract the date part (YYYY-MM-DD) from the endDate
				const date = result.endDate.split("T")[0];

				// Initialize the value for this date if not already present
				if (!acc[date]) {
					acc[date] = 0;
				}

				// Add the value to the total for this date
				acc[date] += result.value;

				return acc;
			}, {});

			// Convert the aggregated object into an array of objects for easier use
			const stepsByDate = Object.keys(aggregatedSteps).map((date) => ({
				date,
				totalSteps: aggregatedSteps[date],
			}));

			console.log("Aggregated Step Data:", stepsByDate);

			// Update state
			setSteps(stepsByDate);
		});
	};

	useEffect(() => {
		fetchSteps();
	}, []);

	return (
		<View style={styles.container}>
			{steps && <StepBarChart steps={steps} />}
			{steps?.map((step, index) => (
				<View key={index} style={styles.dataRow}>
					<Text style={styles.text}>
						Date: {new Date(step.date).toLocaleDateString()}
					</Text>
					<Text style={styles.text}>Steps: {step.totalSteps}</Text>
				</View>
			))}
		</View>
	);
};

export default StepsWidget;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#1E2923",
		borderRadius: 10,
		padding: 15,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
	},
	dataRow: {
		marginBottom: 10,
	},
	text: {
		color: "white",
		fontSize: 16,
	},
});
