import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { addIcon, trashIcon } from "@/constants/icons";
import GlobalContext from "@/context/globalContext";
import { handleNavigate } from "@/utils/navigate";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";
import { useFocusEffect } from "expo-router";

const Cources = () => {
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
                <Text className="text-red-500">No cources yet</Text>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="flex w-full flex-col items-center justify-center text-center">
              <Text className="text-xl text-primary">Cources</Text>

              {/* {user.role === "teacher" && (
                <TouchableOpacity
                  className="my-5 flex w-2/5 flex-row items-center justify-center rounded bg-primary p-3 text-center text-xl"
                  onPress={() => handleNavigate("./addCourse")}
                >
                  <Image source={addIcon} className="h-5 w-5" />
                  <Text className="ml-2 text-white">Add Cource</Text>
                </TouchableOpacity>
              )} */}
            </View>
          )}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Cources;
