import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Notice = () => {
  return (
    <SafeAreaView>
      <GestureHandlerRootView className="flex-col items-center justify-center py-3 align-middle">
        <Text className="text-lg text-primary">Notice</Text>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Notice;
