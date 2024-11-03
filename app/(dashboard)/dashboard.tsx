import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  courseIcon,
  discussionIcon,
  noticeIcon,
  scheduleIcon,
} from "@/constants/icons";
import AuthContext from "@/context/authContext";
import { Redirect } from "expo-router";

const Dashboard = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <GestureHandlerRootView className="h-screen items-center justify-center align-middle">
          <View className="flex items-center justify-center py-10 text-center align-middle">
            <Text className="text-2xl text-primary">Dashboard</Text>
            <Text className="">CourseSync | Student dashboard</Text>
          </View>

          <View className="flex w-full flex-col items-center justify-center gap-5">
            <TouchableOpacity
              className="flex w-2/5 flex-row items-center justify-center rounded bg-primary p-4 text-center text-xl"
              onPress={() => alert("Under Construction")}
            >
              <Image source={noticeIcon} className="h-5 w-5" />
              <Text className="ml-2 text-white">Notices</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex w-2/5 flex-row items-center justify-center rounded bg-primary p-4 text-center text-xl"
              onPress={() => alert("Under Construction")}
            >
              <Image source={discussionIcon} className="h-5 w-5" />
              <Text className="ml-2 text-white">Discussion</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex w-2/5 flex-row items-center justify-center rounded bg-primary p-4 text-center text-xl"
              onPress={() => alert("Under Construction")}
            >
              <Image source={courseIcon} className="h-5 w-5" />
              <Text className="ml-2 text-white">Cources</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex w-2/5 flex-row items-center justify-center rounded bg-primary p-4 text-center text-xl"
              onPress={() => alert("Under Construction")}
            >
              <Image source={scheduleIcon} className="h-5 w-5" />
              <Text className="ml-2 text-white">Schedule</Text>
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
