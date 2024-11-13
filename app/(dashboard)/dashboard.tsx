import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  courseIcon,
  discussionIcon,
  noticeIcon,
  powerIcon,
  scheduleIcon,
} from "@/constants/icons";
import GlobalContext from "@/context/globalContext";
import { handleNavigate } from "@/utils/navigate";

const Dashboard = () => {
  const { user, logout } = useContext(GlobalContext);

  return (
    <SafeAreaView>
      <ScrollView>
        <GestureHandlerRootView className="h-screen items-center justify-center align-middle">
          <View className="flex items-center justify-center py-10 text-center align-middle">
            <Text className="text-2xl text-primary">Dashboard</Text>
            <Text className="">
              CourseSync |&nbsp;
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              &nbsp;dashboard
            </Text>

            <Text className="py-5 text-xl">
              Welcome back&nbsp;
              <Text className="text-primary">{user.name}!</Text>
            </Text>
          </View>

          <View className="flex w-full flex-col items-center justify-center gap-5">
            <TouchableOpacity
              className="flex w-2/5 flex-row items-center justify-center rounded bg-primary p-4 text-center text-xl"
              onPress={() => handleNavigate("notice")}
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
              onPress={() => handleNavigate("courses")}
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

            <TouchableOpacity
              className="flex w-2/5 flex-row items-center justify-center rounded bg-red-500 p-4 text-center text-xl"
              onPress={() => logout()}
            >
              <Image source={powerIcon} className="h-5 w-5" />
              <Text className="ml-2 text-white">Logout</Text>
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
