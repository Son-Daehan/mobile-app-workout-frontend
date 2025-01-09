import AppleHealthKit, {
	HealthKitPermissions,
	HealthValue,
} from "react-native-health";

/* Permission options */
const permissions = {
	permissions: {
		read: [AppleHealthKit.Constants.Permissions.HeartRate],
		write: [AppleHealthKit.Constants.Permissions.Steps],
	},
} as HealthKitPermissions;

/* Function to initialize HealthKit and get heart rate samples */
export const initHealthKit = (callback: (data: HealthValue[]) => void) => {
	AppleHealthKit.initHealthKit(permissions, (error: string) => {
		if (error) {
			console.log("[ERROR] Cannot grant permissions!");
			return;
		}

		// Now we can read or write to HealthKit
		const options = {
			startDate: new Date(2020, 1, 1).toISOString(),
		};

		AppleHealthKit.getHeartRateSamples(
			options,
			(callbackError: string, results: HealthValue[]) => {
				if (callbackError) {
					console.error("Error fetching heart rate samples:", callbackError);
					return;
				}

				// Pass the heart rate samples data to the callback
				callback(results);
			}
		);
	});
};
