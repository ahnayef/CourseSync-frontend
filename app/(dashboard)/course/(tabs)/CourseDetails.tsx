import { View, Text } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const CourseDetails = ({ course }: any) => {
  return (
    <ScrollView className="h-full">
      <GestureHandlerRootView className="flex-1 py-5 h-full">
        <View className="flex-col items-center justify-center space-y-6 px-5">
          {/* Course Info Header */}
          <View className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Text className="mb-4 text-center text-3xl font-semibold text-primary">
              {course?.name}
            </Text>
            <View className="space-y-2">
              <Text className="text-sm font-medium text-gray-700">
                Credit: <Text className="text-primary">{course?.credit}</Text>
              </Text>
              <Text className="text-sm font-medium text-gray-700">
                Course Code:{" "}
                <Text className="text-primary">{course?.code}</Text>
              </Text>
              <Text className="text-sm font-medium text-gray-700">
                Department:{" "}
                <Text className="text-primary">{course?.department}</Text>
              </Text>
              <Text className="text-sm font-medium text-gray-700">
                Session: <Text className="text-primary">{course?.session}</Text>
              </Text>
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
    </ScrollView>
  );
};

export default CourseDetails;
