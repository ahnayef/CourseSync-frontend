import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  courseIcon,
  discussionIcon,
  groupIcon,
  noticeIcon,
  peopleIcon,
  powerIcon,
  scheduleIcon,
} from "@/constants/icons";
import GlobalContext from "@/context/globalContext";
import { handleNavigate } from "@/utils/navigate";
import { MaterialIcons } from "@expo/vector-icons";

const Dashboard = () => {
  const { user, logout } = useContext(GlobalContext);

  return (
    <SafeAreaView>
      <ScrollView>
        <GestureHandlerRootView className="h-screen items-center justify-center align-middle">
          <View className="flex items-center justify-center py-10 text-center align-middle">
            <Text className="text-2xl text-primary">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}'s
              dashboard
            </Text>

            <Text className="py-2 text-lg">
              Welcome back&nbsp;
              <Text className="text-primary">{user.name}!</Text>
            </Text>
          </View>
          {/* For Students and Teachers  */}
          {user.role !== "hod" && user.role !== "admin" && (
            <View className="flex w-full flex-col items-center justify-center gap-5">
              {user.role !== "teacher" && (
                <TouchableOpacity
                  className="flex w-2/5 flex-row items-center justify-center rounded bg-primary p-4 text-center text-xl"
                  onPress={() => handleNavigate("notices")}
                >
                  <Image source={noticeIcon} className="h-5 w-5" />
                  <Text className="ml-2 text-white">Notices</Text>
                </TouchableOpacity>
              )}

              {user.role !== "teacher" && (
                <TouchableOpacity
                  className="flex w-2/5 flex-row items-center justify-center rounded bg-primary p-4 text-center text-xl"
                  onPress={() => alert("Under Construction")}
                >
                  <Image source={discussionIcon} className="h-5 w-5" />
                  <Text className="ml-2 text-white">Discussion</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                className="flex w-2/5 flex-row items-center justify-center rounded bg-primary p-4 text-center text-xl"
                onPress={() => handleNavigate("courses")}
              >
                <Image source={courseIcon} className="h-5 w-5" />
                <Text className="ml-2 text-white">Cources</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* For HOD only */}
          {user.role === "hod" && (
            <View className="flex w-full flex-col items-center justify-center gap-5">
              <TouchableOpacity
                className="flex w-2/5 flex-row flex-wrap items-center justify-around rounded bg-primary p-4 text-center text-xl"
                onPress={() => handleNavigate("/manageStudents")}
              >
                <Image source={groupIcon} className="h-5 w-5" />
                <Text className="ml-2 w-full text-white">Manage Students</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex w-2/5 flex-row flex-wrap items-center justify-around rounded bg-primary p-4 text-center text-xl"
                onPress={() => handleNavigate("/manageCourses")}
              >
                <MaterialIcons name="library-books" size={20} color="white" />
                <Text className="ml-2 w-full text-white">Manage Courses</Text>
              </TouchableOpacity>

            </View>
          )}
          {/* For Everyone  */}
          <View className="flex w-full flex-col items-center justify-center gap-5 py-5">
            <TouchableOpacity
              className="flex w-2/5 flex-row items-center justify-center rounded bg-primary p-4 text-center text-xl"
              onPress={() => handleNavigate("schedule")}
            >
              <Image source={scheduleIcon} className="h-5 w-5" />
              <Text className="ml-2 text-white">
                {user.role === "hod" ? "Manage Schedule" : "Schedule"}
              </Text>
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
