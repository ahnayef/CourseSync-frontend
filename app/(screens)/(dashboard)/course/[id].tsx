import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { discussionIcon, groupIcon, infoIcon, noticeIcon, peopleIcon } from "@/constants/icons";
import { useEffect, useState } from "react";
import CourseDetails from "./(tabs)/CourseDetails";
import CourseNotice from "./(tabs)/CourseNotice";
import CourseDisscussion from "./(tabs)/CourseDisscussion";
import CoursePeople from "./(tabs)/CoursePeople";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";

const CourseDetailsMain = () => {
  const { id } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState("details");

  const [course, setCourse] = useState();

  const getCourseDetails = async () => {
    try {
      const res = await request.get(`/courses/get/${id}`);
      setCourse(res.data);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, []);

  return (
    <SafeAreaView>
      <GestureHandlerRootView className="h-full">
        <View className="h-full pb-9">
          {selectedTab === "details" && <CourseDetails course={course} />}
          {selectedTab === "notice" && <CourseNotice course={course} />}
          {selectedTab === "discussion" && <CourseDisscussion course={course}  />}
          {selectedTab === "people" && <CoursePeople course={course} />}
        </View>
        <View className="absolute bottom-0 flex w-full flex-row justify-around bg-primary py-2 text-white shadow-sm">
          <TouchableOpacity
            className={`flex flex-col items-center justify-center text-center text-xl ${selectedTab === "details" ? "scale-105 opacity-100" : "opacity-60"}`}
            onPress={() => setSelectedTab("details")}
          >
            <Image source={infoIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex flex-col items-center justify-center text-center text-xl ${selectedTab === "notice" ? "scale-105 opacity-100" : "opacity-60"}`}
            onPress={() => setSelectedTab("notice")}
          >
            <Image source={noticeIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">Notice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex flex-col items-center justify-center text-center text-xl ${selectedTab === "discussion" ? "scale-105 opacity-100" : "opacity-60"}`}
            onPress={() => setSelectedTab("discussion")}
          >
            <Image source={discussionIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">Discussion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex flex-col items-center justify-center text-center text-xl ${selectedTab === "people" ? "scale-105 opacity-100" : "opacity-60"}`}
            onPress={() => setSelectedTab("people")}
          >
            <Image source={groupIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">People</Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default CourseDetailsMain;
