import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CourseDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <GestureHandlerRootView className="flex-col items-center justify-center py-5 align-middle">
        <View>
          <Text>CourseDetails: {id}</Text>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default CourseDetails;
