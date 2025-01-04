import React, { useState, useRef } from "react";
import TemplateWidget from "./components/TemplateWidget";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSelector } from "react-redux";
import NewTemplateModal from "./components/NewTemplateModal";
import Header from "../../components/Header";
import { TouchableOpacity } from "react-native";

const TemplateScreen = () => {
  const [createTemplateModalVisible, setCreateTemplateModalVisible] =
    useState(false);
  const [activeWidget, setActiveWidget] = useState(null); // Track which widget is active

  const templates = useSelector((state) => state.templates.templates);
  const templateWidgets = useRef([]); // Ref to track the TemplateWidget instances

  const handleBackgroundPressTest = () => {
    // Close all widgets' dropdowns and modals
    setActiveWidget(null);
    templateWidgets.current.forEach((widget) => widget?.closeDropdown());
  };

  const handleBackgroundPress = (setVisible) => {
    setVisible(false);
  };

  const handleWidgetPress = (widgetId) => {
    setActiveWidget(widgetId);
  };

  return (
    <Pressable
      // onPress={() => handleBackgroundPress(setCreateTemplateModalVisible)}
      style={{ flex: 1, backgroundColor: "black" }}
    >
      <Header title="Workout Templates" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.templateContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Custom Templates</Text>
              <TouchableOpacity
                onPress={() => setCreateTemplateModalVisible(true)}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>+ template</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bodyContainer}>
              {templates?.map(
                (template, index) =>
                  template.type === "user" && (
                    <TemplateWidget
                      key={index}
                      ref={(ref) => (templateWidgets.current[index] = ref)}
                      category="Templates"
                      template={template}
                      templateId={template.id}
                      isActive={activeWidget === template.id}
                      onPress={() => handleWidgetPress(template.id)}
                    />
                  )
              )}
            </View>
          </View>

          <View style={styles.templateContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Example Templates</Text>
            </View>

            <View style={styles.bodyContainer}>
              {templates?.map(
                (template, index) =>
                  template.type === "example" && (
                    <TemplateWidget
                      key={index}
                      ref={(ref) => (templateWidgets.current[index] = ref)}
                      category="Templates"
                      template={template}
                      templateId={template.id}
                      isActive={activeWidget === template.id}
                      onPress={() => handleWidgetPress(template.id)}
                    />
                  )
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <NewTemplateModal
        modalVisible={createTemplateModalVisible}
        closeModal={() => setCreateTemplateModalVisible(false)}
      />
    </Pressable>
  );
};

export default TemplateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
  },

  // HEADER STYLING //
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 20,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "white",
  },

  headerButton: {
    // width: 100,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "blue",
  },

  headerButtonText: {
    color: "white",
  },

  templateContainer: {
    gap: 10,
  },

  // BODY STYLING //
  // BODY STYLING //
  // BODY STYLING //
  // BODY STYLING //
  bodyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // border: 'solid 4px ',
    justifyContent: "space-between",
    // alignItems: 'center',
    gap: 10,
  },
});
