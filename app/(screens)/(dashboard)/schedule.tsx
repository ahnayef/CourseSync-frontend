import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { handleNavigate } from "@/utils/navigate";
import { addIcon } from "@/constants/icons";
import GlobalContext from "@/context/globalContext";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";

const Schedule = () => {
  const { user, isLoading } = useContext(GlobalContext);

  const [schedule, setSchedule] = useState([]);
  const [filteredSchedule, setFilteredSchedule] = useState<any>([]);

  const [date, setDate] = useState(new Date());
  let today = date.toLocaleDateString("en-US", { weekday: "long" });
  const handlePrev = () => {
    if (today === "Sunday") {
      return;
    }

    date.setDate(date.getDate() - 1);
    //set new day
    today = date.toLocaleDateString("en-US", { weekday: "long" });
    //set new schedule
    setFilteredSchedule(schedule.filter((item: any) => item.day === today));
  };

  const handleNext = () => {
    if (today === "Thursday") {
      return;
    }

    date.setDate(date.getDate() + 1);
    //set new day
    today = date.toLocaleDateString("en-US", { weekday: "long" });
    //set new schedule
    setFilteredSchedule(schedule.filter((item: any) => item.day === today));
  };

  const getSchedules = async () => {
    try {
      const res = await request.get("/schedules/get");
      setSchedule(res.data);
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getSchedules();
    console.log(today);
    if (today === "Friday" || today === "Saturday") {
      setFilteredSchedule([]);
    } else {
      setFilteredSchedule(schedule.filter((item: any) => item.day === today));
    }
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
          {new Date(`1970-01-01T${item?.start}`).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(`1970-01-01T${item?.end}`).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Text className="text-sm text-gray-500">{item.courseCode}</Text>
        <Text className="text-sm text-gray-500">{item.room}</Text>
        {(user.role === "hod" || user.role === "teacher") && (
          <Text className="absolute bottom-1 right-2 text-sm text-primary opacity-60">
            {item.session}
          </Text>
        )}

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
          data={filteredSchedule}
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
                <Text className="text-red-500">No Schedule Found!</Text>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="flex w-full flex-col items-center justify-center text-center">
              <View className="flex w-full flex-row items-center justify-center">
                {today != "Sunday" ? (
                  <TouchableOpacity
                    className="mx-2 bg-primary p-1 rounded"
                    onPress={handlePrev}
                  >
                    <AntDesign name="caretleft" size={19} color="white" />
                  </TouchableOpacity>
                ) : null}

                <Text className="text-xl text-primary">Schedule | {today}</Text>

                {today != "Thursday" ? (
                  <TouchableOpacity
                    className="mx-2 bg-primary p-1 rounded"
                    onPress={handleNext}
                  >
                    <AntDesign name="caretright" size={19} color="white" />
                  </TouchableOpacity>
                ) : null}
              </View>

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
