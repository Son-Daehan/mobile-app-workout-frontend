import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
  View,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import {
  getSevenDayRange,
  onGestureEvent,
  onHandlerStateChange,
} from "./helpers";
import WorkoutPlannerEditModal from "./WorkoutPlannerEditModal";
import TemplatePreviewModal from "../../TemplateScreen/components/TemplatePreviewModal";
import WorkoutDaySchedule from "./WorkoutDaySchedule";
import { useNavigation } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const translateX = new Animated.Value(0);

const WorkoutPlanner = () => {
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [plannerEditModalVisible, setPlannerEditModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); // New: To track selected day

  const schedules = useSelector((state) => state.schedules.schedules);
  const templates = useSelector((state) => state.templates.templates);

  const navigation = useNavigation();

  const navigateToBlankActiveWorkout = () => {
    navigation.navigate("ActiveWorkout", {
      templateId: null,
      newTemplateName: "Quick Start",
    });
  };

  const handleEdit = (day, workoutsForTheDay) => {
    setSelectedDay(day); // Save the selected day
    setPlannerEditModalVisible(true); // Open the modal
  };

  const days = getSevenDayRange(startDate);

  useEffect(() => {}, [schedules]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent(translateX)}
        onHandlerStateChange={(e) =>
          onHandlerStateChange(e, translateX, setStartDate)
        }
        activeOffsetX={[-SCREEN_WIDTH / 4, SCREEN_WIDTH / 4]}
      >
        <Animated.View
          style={[styles.container, { transform: [{ translateX }] }]}
        >
          <View style={styles.daysList}>
            {days.map((day, index) => (
              <WorkoutDaySchedule
                key={index}
                day={day}
                schedules={schedules}
                templates={templates}
                onEdit={() => handleEdit(day)}
                onTemplateSelect={(templateId) => {
                  setSelectedTemplateId(templateId);
                  setTemplateModalVisible(true);
                }}
              />
            ))}
          </View>
        </Animated.View>
      </PanGestureHandler>

      <TemplatePreviewModal
        modalVisible={templateModalVisible}
        closeModal={() => setTemplateModalVisible(false)}
        templateId={selectedTemplateId}
        category="Templates"
      />

      <WorkoutPlannerEditModal
        modalVisible={plannerEditModalVisible}
        closeModal={() => setPlannerEditModalVisible(false)}
        schedules={schedules}
        day={selectedDay}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 5,
    backgroundColor: "#000000",
    borderRadius: 8,
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "white",
  },
  startWorkoutButton: {
    alignSelf: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    paddingHorizontal: 80,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  daysList: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default WorkoutPlanner;
