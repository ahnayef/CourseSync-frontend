import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { handleNavigate } from "@/utils/navigate";
import { addIcon } from "@/constants/icons";
import GlobalContext from "@/context/globalContext";

const Notice = () => {
  const { user } = useContext(GlobalContext);

  let demoNotice = [
    {
      id: 1,
      title: "Notice 1",
      content: "This is the content of notice 1",
      timestamp: "2021-09-01T00:00:00Z",
    },
    {
      id: 2,
      title: "Notice 1",
      content: "This is the content of notice 2",
      timestamp: "2021-09-02T00:00:00Z",
    },
    {
      id: 3,
      title: "Notice 1",
      content: "This is the content of notice 3",
      timestamp: "2021-09-03T00:00:00Z",
    },
    {
      id: 4,
      title: "Notice 1",
      content: "This is the content of notice 4",
      timestamp: "2021-09-04T00:00:00Z",
    },
    {
      id: 5,
      title: "Notice 1",
      content: "This is the content of notice 5",
      timestamp: "2021-09-05T00:00:00Z",
    },
    {
      id: 6,
      title: "Notice 1",
      content: "This is the content of notice 6",
      timestamp: "2021-09-06T00:00:00Z",
    },
    {
      id: 7,
      title: "Notice 1",
      content: "This is the content of notice 7",
      timestamp: "2021-09-07T00:00:00Z",
    },
    {
      id: 8,
      title: "Notice 1",
      content: "This is the content of notice 8",
      timestamp: "2021-09-08T00:00:00Z",
    },
    {
      id: 9,
      title: "Notice 1",
      content: "This is the content of notice 9",
      timestamp: "2021-09-09T00:00:00Z",
    },
    {
      id: 10,
      title: "Notice 1",
      content: "This is the content of notice 10",
      timestamp: "2021-09-10T00:00:00Z",
    },
  ];

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
          {new Date(item?.timestamp).toLocaleString("en-US", {
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
    <SafeAreaView>
      <GestureHandlerRootView className="flex h-full w-full flex-col items-center justify-center align-middle">
        <FlatList
          className="flex w-full px-3 text-center"
          data={demoNotice}
          renderItem={({ item }: any) => (
            <View
              className="flex-col items-center justify-center"
              key={item.id}
            >
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
              <Text className="text-2xl text-primary">Notices</Text>
              {user.role === "cr" && (
                <TouchableOpacity
                  className="my-5 flex w-2/5 flex-row items-center justify-center rounded bg-primary p-3 text-center text-xl"
                  onPress={() => handleNavigate("./createNotice")}
                >
                  <Image source={addIcon} className="h-5 w-5" />
                  <Text className="ml-2 text-white">Create Notice</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Notice;
