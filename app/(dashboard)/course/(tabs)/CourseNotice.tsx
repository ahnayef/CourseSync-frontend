import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { handleNavigate } from "@/utils/navigate";
import { addIcon, trashIcon } from "@/constants/icons";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";
import { useFocusEffect } from "expo-router";
import GlobalContext from "@/context/globalContext";

const CourseNotice = ({ course }: any) => {
  const [notices, setNotices] = useState([]);
  const { user, isLoading, setLoading } = useContext(GlobalContext);

  const getNotices = async () => {
    setLoading(true);
    try {
      const res = await request.get(`/notices/get?courseId=${course.id}`);
      setNotices(res.data);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    } finally {
      setLoading(false);
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

  const handleNoticeDelete = (id: number) => {
    Alert.alert(
      "Delete Notice",
      "Are you sure you want to delete this notice?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const res = await request.delete(`/notices/delete/${id}`);
              setNotices(notices.filter((notice: any) => notice.id !== id));
              toast(res as any);
            } catch (error: any) {
              toast(error.response?.data || error.message);
            }
          },
        },
      ],
    );
  };

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

        {user.role === "teacher" && (
          <TouchableOpacity
            onPress={() => handleNoticeDelete(item.id)}
            className="absolute right-2 top-2"
          >
            <Image source={trashIcon} className="h-5 w-5" />
          </TouchableOpacity>
        )}
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
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <Text className="text-red-500">No notices yet</Text>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex w-full flex-col items-center justify-center text-center">
            <Text className="text-xl text-primary">Notices</Text>

            {user.role === "teacher" && (
              <TouchableOpacity
                className="my-5 flex w-2/5 flex-row items-center justify-center rounded bg-primary p-3 text-center text-xl"
                onPress={() =>
                  handleNavigate(`/createNotice?courseId=${course.id}`)
                }
              >
                <Image source={addIcon} className="h-5 w-5" />
                <Text className="ml-2 text-white">Create Notice</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default CourseNotice;
