import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { noticeIcon } from "@/constants/icons";

const CourseDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <GestureHandlerRootView className="h-full flex flex-col items-center justify-center py-5 align-middle">
        <View>
          <Text>Course Name</Text>
                <Text>Course Code</Text>
          <Text>CourseDetails: {id}</Text>
        </View>

        <View className="w-full justify-around flex flex-row bg-primary py-2 rounded-t-lg absolute bottom-0">
          <TouchableOpacity className="flex flex-col items-center justify-center text-center text-xl">
            <Image source={noticeIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">Details</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-col items-center justify-center text-center text-xl">
            <Image source={noticeIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">Notice</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-col items-center justify-center text-center text-xl">
            <Image source={noticeIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">Discussion</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-col items-center justify-center text-center text-xl">
            <Image source={noticeIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">People</Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default CourseDetails;
