import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { handleNavigate } from "@/utils/navigate";
import { addIcon } from "@/constants/icons";
import GlobalContext from "@/context/globalContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";

const Schedule = () => {
  const { user, isLoading } = useContext(GlobalContext);

  // const schedule = [
  //   {
  //     id:1,
  //     name: "Operating System",
  //     teacher: "Muthmainna Mou",
  //     from: "8:30 AM",
  //     to: "9:55 AM",
  //     courseCode: "CSE-06132213",
  //     room: "R-206",
  //   },
  //   {
  //     id:2,
  //     name: "Theory Of Computation",
  //     teacher: "Dr Arif Ahmad",
  //     from: "10:00 AM",
  //     to: "11:25 AM",
  //     courseCode: "CSE-06132215",
  //     room: "R-301",
  //   },
  //   {
  //     id:3,
  //     name: "Operating System Lab",
  //     teacher: "Muthmainna Mou",
  //     from: "11:30 AM",
  //     to: "2:25 PM",
  //     courseCode: "CSE-06132214",
  //     room: "R-309",
  //   },
  // ];

  const [schedule, setSchedule] = useState([]);

  const getSchedules = async () => {
    try {
      const res = await request.get("/schedules/get");
      console.log(res.data);
      setSchedule(res.data);
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getSchedules();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getSchedules();
    }, []),
  );

  const renderSchedule = (item: any) => {
    return (
      <View className="my-2 flex w-full flex-col items-center justify-center space-y-2 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
        <Text className="text-2xl font-semibold text-primary">{item.name}</Text>
        <Text className="text-sm text-gray-600">{item.teacher}</Text>
        <Text className="text-sm text-gray-600">
          {item.start} - {item.end}
        </Text>
        <Text className="text-sm text-gray-500">{item.courseCode}</Text>
        <Text className="text-sm text-gray-500">{item.room}</Text>

        {user.role === "hod" && (
          <TouchableOpacity
            onPress={() => handleNavigate(`/editSchedule/${item.id}`)}
            className="absolute right-2 top-2"
          >
            <FontAwesome6 name="edit" size={17} color="black" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <GestureHandlerRootView className="flex-col items-center justify-center py-5 align-middle">
        <FlatList
          className="flex w-full px-3 text-center"
          data={schedule}
          renderItem={({ item }: any) => (
            <View
              className="flex-col items-center justify-center"
              key={item.code}
            >
              {renderSchedule(item)}
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex w-full flex-col items-center justify-center text-center">
              {isLoading ? (
                <Text>Loading...</Text>
              ) : (
                <Text className="text-red-500">No cources yet</Text>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="flex w-full flex-col items-center justify-center text-center">
              <Text className="text-xl text-primary">
                Schedule |{" "}
                {new Date().toLocaleDateString("en-US", { weekday: "long" })}
              </Text>

              {user.role === "hod" && (
                <TouchableOpacity
                  className="my-5 flex w-2/5 flex-row items-center justify-center rounded bg-primary p-3 text-center text-xl"
                  onPress={() => handleNavigate("/addSchedule")}
                >
                  <Image source={addIcon} className="h-5 w-5" />
                  <Text className="ml-2 text-white">Add Schedule</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Schedule;
