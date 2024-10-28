import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Dashboard = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <GestureHandlerRootView>
          <Text>Dashboard</Text>
        </GestureHandlerRootView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
