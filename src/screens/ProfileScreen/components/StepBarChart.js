import React from "react";
import { View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const StepBarChart = ({ steps }) => {
	// Prepare data for the chart
	const chartData = {
		labels: steps?.map((item) => item.date), // Extract dates
		datasets: [
			{
				data: steps?.map((item) => item.totalSteps), // Extract total steps
			},
		],
	};

	return (
		<View>
			<BarChart
				data={chartData}
				width={Dimensions.get("window").width - 32} // Chart width
				height={250} // Chart height
				yAxisLabel="" // Label for y-axis (optional)
				yAxisSuffix=" steps" // Suffix for y-axis values
				chartConfig={{
					backgroundColor: "#f2f2f2",
					backgroundGradientFrom: "#6a5acd",
					backgroundGradientTo: "#836fff",
					decimalPlaces: 0, // Remove decimals from y-axis
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 16,
					},
					propsForDots: {
						r: "6",
						strokeWidth: "2",
						stroke: "#ffa726",
					},
				}}
				verticalLabelRotation={45} // Rotate labels for better visibility
				fromZero // Start y-axis from zero
				showValuesOnTopOfBars // Show step values on top of bars
			/>
		</View>
	);
};

export default StepBarChart;
