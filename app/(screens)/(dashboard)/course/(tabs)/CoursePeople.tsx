import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  addPeopleIcon,
  peopleIcon,
  removeIcon,
  trashIcon,
} from "@/constants/icons";
import GlobalContext from "@/context/globalContext";
import { handleNavigate } from "@/utils/navigate";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";
import { useFocusEffect } from "expo-router";

const CoursePeople = ({ course }: any) => {
  const { user, isLoading, setLoading } = useContext(GlobalContext);

  const [instructor, setInstructor] = useState<any>({});
  const [students, setStudents] = useState<any>([]);

  const getCoursePeople = async () => {
    setLoading(true);
    try {
      const res = await request.get(`/courses/getPeople/${course.id}`);
      setInstructor(res.data.instructor);
      setStudents(res.data.students);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoursePeople();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCoursePeople();
    }, []),
  );

  const handleRemoveStudent = (id: number) => {
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
              const res = await request.delete(
                `/courses/removeStudent?studentId=${id}&courseId=${course.id}`,
              );
              setStudents(students.filter((student: any) => student.id !== id));
              toast(res as any);
            } catch (error: any) {
              toast(error.response?.data || error.message);
            }
          },
        },
      ],
    );
  };

  const renderPeople = ({ item }: any) => {
    return (
      <View className="m-4 flex w-full flex-row items-center justify-between rounded border border-primary/50 p-2 align-middle shadow">
        <View className="inline-flex flex-row items-center justify-between gap-2 align-middle">
          <View className="h-7 w-7 rounded-full bg-white">
            <Image source={peopleIcon} className="h-full w-full" />
          </View>
          <View className="flex flex-col">
            <Text className="">{item?.name}</Text>
            <Text className="text-sm text-gray-500">{item?.sid}</Text>
          </View>
        </View>
        {user.role === "teacher" ? (
          <TouchableOpacity onPress={() => handleRemoveStudent(item.id)}>
            <Image source={removeIcon} className="h-6 w-6" />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <GestureHandlerRootView className="flex h-full w-full flex-col items-center justify-center py-5 align-middle">
      <View className="flex w-full flex-col justify-start px-3 text-center text-primary">
        <Text className="border-b-2 border-primary py-2 text-2xl font-bold text-primary">
          Instructor
        </Text>
        <View className="flex-col items-center justify-center">
          <View className="m-4 flex w-full flex-row items-center justify-between rounded border border-primary/50 p-2 align-middle">
            <View className="inline-flex flex-row items-center justify-between gap-2 align-middle">
              <View className="h-7 w-7 rounded-full bg-white">
                <Image source={peopleIcon} className="h-full w-full" />
              </View>

              <Text className="">{instructor.name}</Text>
            </View>
          </View>
        </View>
      </View>

      <FlatList
        className="mt-6 flex w-full px-3 text-center"
        data={students}
        ListHeaderComponent={() => (
          <View className="py-2c flex w-full flex-row items-center justify-center border-b-2 border-primary px-3 text-center align-middle">
            <>
              <Text className="w-full text-2xl font-bold text-primary">
                {user.role === "teacher" ? "Students" : "Classmates"}
              </Text>
              {(user.role === "teacher" || user.role === "cr") && (
                <TouchableOpacity
                  onPress={() =>
                    handleNavigate(`./addPeople?courseId=${course.id}`)
                  }
                >
                  <Image source={addPeopleIcon} className="h-6 w-6" />
                </TouchableOpacity>
              )}
            </>
          </View>
        )}
        renderItem={({ item }: any) => (
          <View className="flex-col items-center justify-center" key={item.id}>
            {renderPeople({ item })}
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex w-full flex-col items-center justify-center text-center">
            <Text className="text-red-500">No people yet</Text>
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default CoursePeople;
