import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Timer = ({ initialMinutes = 0, initialSeconds = 0 }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          clearInterval(interval);
        }
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerDisplay}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </Text>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, isActive && styles.disabledButton]}
          onPress={startTimer}
          disabled={isActive}
        >
          <Text style={styles.controlText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, !isActive && styles.disabledButton]}
          onPress={pauseTimer}
          disabled={!isActive}
        >
          <Text style={styles.controlText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={resetTimer}>
          <Text style={styles.controlText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "grey",
    marginBottom: 10,
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  controlButton: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
    alignItems: "center",
  },
  controlText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
