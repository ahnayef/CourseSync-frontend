import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { handleNavigate } from "@/utils/navigate";
import { useFocusEffect } from "expo-router";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";

const ManageHODs = () => {
  //   const [searchQuery, setSearchQuery] = useState("");

  const [HODs, setHODs] = useState<any>([]);

  const getHODs = async () => {
    try {
      const res = await request.get("/users/getAllHods");
      setHODs(res.data);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getHODs();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getHODs();
    }, []),
  );

  // const [filteredStudents, setFilteredStudents] = useState(students);

  // const handleSearch = (query: string) => {
  //   setSearchQuery(query);
  //   if (query === "") {
  //     setFilteredStudents(students);
  //   } else {
  //     const filtered = students.filter((student) =>
  //       student.name.toLowerCase().includes(query.toLowerCase()),
  //     );
  //     setFilteredStudents(filtered);
  //   }
  // };

  const renderHODs = ({ item }: any) => (
    <View className="mb-4 rounded-lg bg-white shadow-md">
      <View className="flex flex-row items-center justify-between p-5">
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-900">
            {item.name}
          </Text>
          <Text className="text-sm text-gray-500">{item.email}</Text>
          <Text className="text-sm text-gray-500">{item.department}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleNavigate(`/hod/${item.id}`)}
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
        data={HODs}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className="px-5 py-6">
            <Text className="mb-4 text-center text-3xl font-bold text-primary">
              Manage HODs
            </Text>

            {/* <View className="mb-4 flex flex-row items-center justify-between bg-white">
              <TextInput
                className="flex-1 bg-transparent"
                placeholder="Search students..."
                value={searchQuery}
                // onChangeText={handleSearch}
                placeholderTextColor="#999"
              />
            </View> */}

            <TouchableOpacity
              className="my-5 flex w-full flex-row items-center justify-center rounded bg-primary p-2 text-center text-xl"
              onPress={() => handleNavigate("./addHOD")}
            >
              <FontAwesome name="plus" size={20} color="white" />
              <Text className="ml-2 text-white">Add HOD</Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={renderHODs}
      />
    </GestureHandlerRootView>
  );
};

export default ManageHODs;
