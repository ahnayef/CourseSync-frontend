import {
  View,
  Text,
  TouchableOpacity,

  FlatList,
  
} from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import GlobalContext from "@/context/globalContext";
import { handleNavigate } from "@/utils/navigate";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";
import { useFocusEffect } from "expo-router";

const Courses = () => {
  const { user, isLoading, setLoading } = useContext(GlobalContext);

  const [courses, setCourses] = useState([]);

  const getCourse = async () => {
    setLoading(true);
    try {
      const res = await request.get("/courses/get");
      setCourses(res.data);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCourse();
    }, []),
  );

  const renderCourse = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => handleNavigate(`/course/${item.id}`)}
        activeOpacity={0.7}
        className="relative my-4 w-full flex-col rounded-lg border border-primary bg-white p-5 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
      >
        <Text className="truncate text-xl font-semibold text-primary">
          {item.name}
        </Text>
        <View className="mt-3 space-y-2">
          <Text className="text-sm font-medium">Course Code: {item.code}</Text>
          <Text className="text-xs">Department: {item.department}</Text>
          {user.role == "teacher" && (
            <Text className="text-xs">
              {item.studentCount}{" "}
              {item.studentCount === 1 ? "Student" : "Students"}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <GestureHandlerRootView className="flex-col items-center justify-center py-5 align-middle">
        <FlatList
          className="flex w-full px-3 text-center"
          data={courses}
          renderItem={({ item }: any) => (
            <View
              className="flex-col items-center justify-center"
              key={item.code}
            >
              {renderCourse(item)}
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex w-full flex-col items-center justify-center text-center">
              {isLoading ? (
                <Text>Loading...</Text>
              ) : (
                <Text className="text-red-500">No courses yet</Text>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="flex w-full flex-col items-center justify-center text-center">
              <Text className="text-xl text-primary">Courses</Text>
            </View>
          )}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Courses;
