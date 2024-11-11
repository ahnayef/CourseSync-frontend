import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addIcon } from "@/constants/icons";
import AuthContext from "@/context/authContext";
import { handleNavigate } from "@/utils/navigate";

const Cources = () => {
  const { user } = useContext(AuthContext);
  const handleAddCource = () => {
    alert("Under Construction");
  };

  let demoCourses = [
    {
      id: 1,
      name: "Course 1",
      code: "CSE101",
      description: "This is course 1",
      department: "CSE",
      session: "Spring 23",
    },
    {
      id: 2,
      name: "Course 2",
      code: "CSE102",
      description: "This is course 2",
      department: "CSE",
      session: "Spring 23",
    },
    {
      id: 3,
      name: "Course 3",
      code: "CSE103",
      description: "This is course 3",
      department: "CSE",
      session: "Spring 23",
    },
    {
      id: 4,
      name: "Course 4",
      code: "CSE104",
      description: "This is course 4",
      department: "CSE",
      session: "Spring 23",
    },
    {
      id: 5,
      name: "Course 5",
      code: "CSE105",
      description: "This is course 5",
      department: "CSE",
      session: "Spring 23",
    },
    {
      id: 6,
      name: "Course 6",
      code: "CSE106",
      description: "This is course 6",
      department: "CSE",
      session: "Spring 23",
    },
    {
      id: 7,
      name: "Course 7",
      code: "CSE107",
      description: "This is course 7",
      department: "CSE",
      session: "Spring 23",
    },
  ];

  const renderCourse = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => handleNavigate(`/cources/${item.id}`)}
        activeOpacity={0.7}
        className="my-4 w-full flex-col rounded-lg border border-primary bg-white p-5 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
      >
        <Text className="truncate text-xl font-semibold text-primary">
          {item.name}
        </Text>
        <View className="mt-3 space-y-2">
          <Text className="text-sm font-medium">
            Course Code: {item.code}
          </Text>
          <Text className="text-xs">
            Department: {item.department}
          </Text>
          <Text className="text-xs">Session: {item.session}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <GestureHandlerRootView className="flex-col items-center justify-center py-5 align-middle">
        <FlatList
          className="flex w-full px-3 text-center"
          data={demoCourses}
          renderItem={({ item }) => (
            <View
              className="flex-col items-center justify-center"
              key={item.id}
            >
              {renderCourse(item)}
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="flex w-full flex-col items-center justify-center text-center">
              <Text className="text-xl text-primary">Cources</Text>

              {user.role === "teacher" && (
                <TouchableOpacity
                  className="my-5 flex w-2/5 flex-row items-center justify-center rounded bg-primary p-3 text-center text-xl"
                  onPress={() => handleAddCource()}
                >
                  <Image source={addIcon} className="h-5 w-5" />
                  <Text className="ml-2 text-white">Add Cource</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Cources;
