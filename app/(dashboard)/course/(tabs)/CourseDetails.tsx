import { View, Text } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const CourseDetails = () => {
  return (
    <ScrollView>
      <GestureHandlerRootView className="flex h-full flex-col items-center justify-center py-5 align-middle">
        <Text>Details</Text>
      </GestureHandlerRootView>
    </ScrollView>
  );
};

export default CourseDetails;
