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
  const [today, setToday] = useState(date.toLocaleDateString("en-US", { weekday: "long" }));

  const handlePrev = () => {
    if (today === "Sunday") {
      return;
    }

    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
    setToday(newDate.toLocaleDateString("en-US", { weekday: "long" }));
    setFilteredSchedule(schedule.filter((item: any) => item.day === newDate.toLocaleDateString("en-US", { weekday: "long" })));
  };

  const handleNext = () => {
    if (today === "Thursday") {
      return;
    }

    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
    setToday(newDate.toLocaleDateString("en-US", { weekday: "long" }));
    setFilteredSchedule(schedule.filter((item: any) => item.day === newDate.toLocaleDateString("en-US", { weekday: "long" })));
  };

  const handleDelete = (id: any) => {
    Alert.alert(
      "Delete Schedule",
      "Are you sure you want to delete this schedule?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const res = await request.delete(`/schedules/delete/${id}`);
              toast(res as any);
              setFilteredSchedule(
                filteredSchedule.filter((item: any) => item.id !== id),
              );
            } catch (error: any) {
              console.log(error.response?.data || error.message);
              toast(error.response?.data || error.message);
            }
          },
        },
      ],
    );
  };

  const getSchedules = async () => {
    try {
      const res = await request.get("/schedules/get");
      setSchedule(res.data);
      setFilteredSchedule(res.data.filter((item: any) => item.day === today));
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (today === "Friday" || today === "Saturday") {
      setFilteredSchedule([]);
    } else {
      getSchedules();
    }
  }, [today]);

  useFocusEffect(
    useCallback(() => {
      getSchedules();
    }, [today]),
  );

  const renderSchedule = (item: any) => {
    return (
      <View className="my-2 flex w-full flex-col items-center justify-center space-y-2 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
        <Text className="text-center text-xl font-semibold text-primary">
          {item.name}
        </Text>
        <Text className="text-center text-sm text-gray-600">
          {item.teacher}
        </Text>
        <Text className="text-center text-sm text-gray-600">
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
          <Text className="absolute bottom-2 right-2 rounded-lg bg-primary px-2 py-1 text-xs text-white opacity-80">
            {item.session}
          </Text>
        )}

        {user.role === "hod" && (
          <View className="absolute right-0 top-0 flex-row items-center justify-center">
            <TouchableOpacity
              className="mx-2"
              onPress={() => handleNavigate(`/editSchedule/${item.id}`)}
            >
              <FontAwesome6 name="edit" size={17} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              className="mx-2"
              onPress={() => handleDelete(item.id)}
            >
              <FontAwesome6 name="trash-can" size={17} color="red" />
            </TouchableOpacity>
          </View>
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
              <Text className="pb-2 text-2xl font-semibold text-primary">
                Schedule
              </Text>
              <View className="flex w-full flex-row items-center justify-center">
                {today !== "Sunday" && (
                  <TouchableOpacity
                    className="mx-2 rounded bg-primary p-1"
                    onPress={handlePrev}
                  >
                    <AntDesign name="caretleft" size={19} color="white" />
                  </TouchableOpacity>
                )}

                <Text className="text-xl text-primary">{today}</Text>

                {today !== "Thursday" && (
                  <TouchableOpacity
                    className="mx-2 rounded bg-primary p-1"
                    onPress={handleNext}
                  >
                    <AntDesign name="caretright" size={19} color="white" />
                  </TouchableOpacity>
                )}
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