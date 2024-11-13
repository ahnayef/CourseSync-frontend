import { View, Text, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { noticeIcon } from "@/constants/icons";
import { useState } from "react";
import CourseDetails from "./(tabs)/CourseDetails";
import CourseNotice from "./(tabs)/CourseNotice";
import CourseDisscussion from "./(tabs)/CourseDisscussion";
import CoursePeople from "./(tabs)/CoursePeople";

const CourseDetailsMain = () => {
const { id } = useLocalSearchParams();

  const [selectedTab, setSelectedTab] = useState("details");

  return (
    <SafeAreaView>
      <GestureHandlerRootView className="flex h-full flex-col items-center justify-center py-5 align-middle">
        <View>
          {selectedTab === "details" && <CourseDetails />}
          {selectedTab === "notice" && <CourseNotice />}
          {selectedTab === "discussion" && <CourseDisscussion />}
          {selectedTab === "people" && <CoursePeople />}
        </View>

        <View className="absolute bottom-0 flex w-full flex-row justify-around bg-primary py-2 text-white shadow-sm">
          <TouchableOpacity
            className={`flex flex-col items-center justify-center text-center text-xl ${selectedTab === "details" ? "opacity-100 scale-105" : "opacity-60"}`}
            onPress={() => setSelectedTab("details")}
          >
            <Image source={noticeIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex flex-col items-center justify-center text-center text-xl ${selectedTab === "notice" ? "opacity-100 scale-105" : "opacity-60"}`}
            onPress={() => setSelectedTab("notice")}
          >
            <Image source={noticeIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">Notice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex flex-col items-center justify-center text-center text-xl ${selectedTab === "discussion" ? "opacity-100 scale-105" : "opacity-60"}`}
            onPress={() => setSelectedTab("discussion")}
          >
            <Image source={noticeIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">Discussion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex flex-col items-center justify-center text-center text-xl ${selectedTab === "people" ? "opacity-100 scale-105" : "opacity-60"}`}
            onPress={() => setSelectedTab("people")}
          >
            <Image source={noticeIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">People</Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default CourseDetailsMain;
