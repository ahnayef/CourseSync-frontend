import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { handleNavigate } from "@/utils/navigate";
import { addIcon } from "@/constants/icons";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";
import { useFocusEffect } from "expo-router";

const CourseNotice = ({ course }: any) => {
  const [notices, setNotices] = useState([]);

  const getNotices = async () => {
    try {
      const res = await request.get(`/notices/get?courseId=${course.id}`);
      setNotices(res.data);
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getNotices();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getNotices();
    }, []),
  );


  const renderNotice = ({ item }: any) => {
    return (
      <View className="m-4 w-full max-w-md rounded-2xl border-l-8 border-primary bg-white p-4 shadow-2xl">
        <Text className="mb-2 text-lg font-semibold text-gray-900">
          {item?.title}
        </Text>

        <Text className="text-sm font-normal text-gray-800">
          {item?.content}
        </Text>

        <Text className="mt-4 text-xs italic text-gray-500">
          {new Date(item?.created_at).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    );
  };

  return (
    <GestureHandlerRootView className="flex h-full w-full flex-col items-center justify-center py-5 align-middle">
      <FlatList
        className="flex w-full px-3 text-center"
        data={notices}
        renderItem={({ item }: any) => (
          <View className="flex-col items-center justify-center" key={item.id}>
            {renderNotice({ item })}
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex w-full flex-col items-center justify-center text-center">
            <Text className="text-red-500">No cources yet</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex w-full flex-col items-center justify-center text-center">
            <Text className="text-xl text-primary">Notices</Text>
            <TouchableOpacity
              className="my-5 flex w-2/5 flex-row items-center justify-center rounded bg-primary p-3 text-center text-xl"
              onPress={() =>
                handleNavigate(`/createNotice?courseId=${course.id}`)
              }
            >
              <Image source={addIcon} className="h-5 w-5" />
              <Text className="ml-2 text-white">Create Notice</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default CourseNotice;
