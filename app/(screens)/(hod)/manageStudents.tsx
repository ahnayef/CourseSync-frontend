import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { handleNavigate } from "@/utils/navigate";
import { useFocusEffect } from "expo-router";
import GlobalContext from "@/context/globalContext";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";

const ManageStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, setLoading } = useContext(GlobalContext);

  const [dbStudents, setDbStudents] = useState<any>([]);

  const getStudent = async () => {
    setLoading(true);
    try {
      const res = await request.get("/users/hodGet");
      setDbStudents(res.data);
      console.log(res.data)
    } catch (error: any) {
      toast(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getStudent();
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

  const renderStudents = ({ item }: any) => (
    <View className="mb-4 rounded-lg bg-white shadow-md">
      <View className="flex flex-row items-center justify-between p-5">
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-900">
            {item.name}
          </Text>
          <Text className="text-sm text-gray-500">{item.sid}</Text>
          <Text className="text-sm text-gray-500">{item.department}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleNavigate(`/student/${item.id}`)}
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
        data={dbStudents}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className="px-5 py-6">
            <Text className="mb-4 text-center text-3xl font-bold text-primary">
              Manage Students
            </Text>

            <View className="mb-4 flex flex-row items-center justify-between bg-white">
              <TextInput
                className="flex-1 bg-transparent"
                placeholder="Search students..."
                value={searchQuery}
                // onChangeText={handleSearch}
                placeholderTextColor="#999"
              />
            </View>
          </View>
        )}
        renderItem={renderStudents}
      />
    </GestureHandlerRootView>
  );
};

export default ManageStudents;
