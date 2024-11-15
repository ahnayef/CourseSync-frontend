import { View, Text } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const CourseNotice = () => {
  return (
    <ScrollView>
      <GestureHandlerRootView className="flex h-full w-full flex-col items-center justify-center py-5 align-middle">
        <Text>Notice</Text>
      </GestureHandlerRootView>
    </ScrollView>
  );
};

export default CourseNotice;
