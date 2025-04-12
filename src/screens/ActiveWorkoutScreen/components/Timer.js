import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Timer = ({ initialMinutes = 0, initialSeconds = 0 }) => {
  const initialTime = initialMinutes * 60 + initialSeconds;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState(String(initialMinutes));
  const [editSeconds, setEditSeconds] = useState(String(initialSeconds));
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      setIsActive(false);
    }
  }, [timeLeft]);

  const startTimer = () => {
    if (!isActive && timeLeft > 0) {
      setIsActive(true);
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
    setTimeLeft(initialTime);
  };

  const saveEditedTime = () => {
    const m = parseInt(editMinutes, 10) || 0;
    const s = parseInt(editSeconds, 10) || 0;
    const total = m * 60 + s;
    setTimeLeft(total);
    setEditing(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.timerContainer}>
      {editing ? (
        <View style={styles.editInputRow}>
          <TextInput
            style={styles.timeInput}
            value={editMinutes}
            onChangeText={setEditMinutes}
            keyboardType="numeric"
            maxLength={2}
            placeholder="MM"
            placeholderTextColor="#aaa"
          />
          <Text style={styles.timerDisplay}>:</Text>
          <TextInput
            style={styles.timeInput}
            value={editSeconds}
            onChangeText={setEditSeconds}
            keyboardType="numeric"
            maxLength={2}
            placeholder="SS"
            placeholderTextColor="#aaa"
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setEditMinutes(String(minutes));
            setEditSeconds(String(seconds));
            setEditing(true);
          }}
        >
          <Text style={styles.timerDisplay}>
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </Text>
        </TouchableOpacity>
      )}

      {editing && (
        <View style={styles.editButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={saveEditedTime}>
            <Text style={styles.controlText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setEditing(false)}
          >
            <Text style={styles.controlText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {!editing && (
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
      )}
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
    textAlign: "center",
  },
  editInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInput: {
    backgroundColor: "#222",
    color: "white",
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 6,
    width: 60,
    height: 60,
    fontSize: 28,
    textAlign: "center",
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
  editButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#888",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
