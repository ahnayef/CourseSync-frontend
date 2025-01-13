import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { handleNavigate } from "@/utils/navigate";
import { useFocusEffect } from "expo-router";
import GlobalContext from "@/context/globalContext";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";

const ManageCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, setLoading } = useContext(GlobalContext);

  const [dbCourses, setDbCourses] = useState<any>([]);

  const getCourses = async () => {
    setLoading(true);
    try {
      const res = await request.get("/courses/hodGet");
      setDbCourses(res.data);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCourses();
    }, []),
  );

  // const [filteredCourses, setFilteredCourses] = useState(dbCourses);

  // const handleSearch = (query: string) => {
  //   setSearchQuery(query);
  //   if (query === "") {
  //     setFilteredCourses(dbCourses);
  //   } else {
  //     const filtered = dbCourses.filter((course:any) =>
  //       course.name.toLowerCase().includes(query.toLowerCase()),
  //     );
  //     setFilteredCourses(filtered);
  //   }
  // };

  const renderCourses = ({ item }: any) => (
    <View className="mb-4 rounded-lg bg-white shadow-md">
      <View className="flex flex-row items-center justify-between p-5">
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-900">
            {item.name}
          </Text>
          <Text className="text-sm text-gray-500">
            Course code: {item.code}
          </Text>
          <Text className="text-sm text-gray-500">Credit: {item.credit}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleNavigate(`/hodcourse/${item.id}`)}
          className="flex flex-row items-center justify-center rounded-lg bg-primary p-2"
        >
          <MaterialIcons name="manage-accounts" size={20} color="white" />
          <Text className="ml-2 font-medium text-white">Manage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView className="h-full bg-gray-100">
      <FlatList
        data={dbCourses}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className="w-full px-5 py-6">
            <Text className="mb-4 text-center text-3xl font-bold text-primary">
              Manage Courses
            </Text>

            <TouchableOpacity
              className="my-5 flex w-full flex-row items-center justify-center rounded bg-primary p-2 text-center text-xl"
              onPress={() => handleNavigate("./addCourse")}
            >
              <FontAwesome name="plus" size={20} color="white" />
              <Text className="ml-2 text-white">Add Course</Text>
            </TouchableOpacity>

            {/* <View className="mb-4 flex flex-row items-center justify-between bg-white">
              <TextInput
                className="flex-1 bg-transparent"
                placeholder="Search courses..."
                value={searchQuery}
                onChangeText={handleSearch}
                placeholderTextColor="#999"
              />
            </View> */}
          </View>
        )}
        renderItem={renderCourses}
      />
    </GestureHandlerRootView>
  );
};

export default ManageCourses;
