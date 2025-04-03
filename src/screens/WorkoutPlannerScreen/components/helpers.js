// utils/helpers.js

import { Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

/**
 * Generates placeholder data for weekly workouts.
 * Can be replaced with real data-fetching logic.
 */
export const getWeeklyWorkouts = () => [
  { day: "Sunday", workout: "No Data Available" },
  { day: "Monday", workout: "No Data Available" },
  { day: "Tuesday", workout: "No Data Available" },
  { day: "Wednesday", workout: "No Data Available" },
  { day: "Thursday", workout: "No Data Available" },
  { day: "Friday", workout: "No Data Available" },
  { day: "Saturday", workout: "No Data Available" },
];

export const getSevenDayRange = (startDate) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    days.push({
      name: date.toLocaleDateString("default", { weekday: "long" }),
      date,
    });
  }
  return days;
};

export const handleWorkoutStatusStyle = (status) => {
  switch (status) {
    case "completed":
      return { backgroundColor: "green" };
    case "upcoming":
      return { backgroundColor: "blue" };
    case "missed":
      return { backgroundColor: "red" };
    default:
      return { backgroundColor: "black" };
  }
};

export const onGestureEvent = (translateX) => {
  return Animated.event([{ nativeEvent: { translationX: translateX } }], {
    useNativeDriver: true,
  });
};

export const onHandlerStateChange = (event, translateX, setStartDate) => {
  if (event.nativeEvent.state === State.END) {
    const swipeThreshold = 100; // Minimum swipe distance to trigger change
    const translation = event.nativeEvent.translationX;

    if (Math.abs(translation) > swipeThreshold) {
      setStartDate((prevDate) => {
        const newDate = new Date(prevDate);
        if (translation > 0) {
          // Swiped Right -> Move Back 7 Days
          newDate.setDate(newDate.getDate() - 7);
        } else {
          // Swiped Left -> Move Forward 7 Days
          newDate.setDate(newDate.getDate() + 7);
        }
        return newDate;
      });
    }

    // Reset translateX smoothly
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }
};

export const findTemplateById = (id, templates) => {
  return templates.find((template) => template.id === id) || null;
};
