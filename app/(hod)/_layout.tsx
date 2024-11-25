import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const HodMain = () => {
  return (
    <Stack>
      <Stack.Screen name="hodMain" options={{ headerShown: false }} />
      <Stack.Screen name="manageStudents" options={{ headerShown: false }} />
      <Stack.Screen
        name="student/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="manageSchedule" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HodMain;
