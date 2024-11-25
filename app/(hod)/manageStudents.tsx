import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

const ManageStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    { id: 1, name: "John Doe", sid: "123456", role: "student", session:'Spring 23' },
    { id: 3, name: "Alice", sid: "123458", role: "student", session:'Spring 23' },
    { id: 4, name: "Bob", sid: "123459", role: "student", session:'Spring 23' },
    { id: 5, name: "Charlie", sid: "123460", role: "student", session:'Spring 23' },
  ];
  const [filteredStudents, setFilteredStudents] = useState(students);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) =>
        student.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredStudents(filtered);
    }
  };

  const renderStudents = ({ item }: any) => (
    <View className="flex flex-row items-center justify-between border-t border-gray-200 bg-white p-4">
      <View className="flex-1">
      <Text className="text-lg font-semibold">{item.name}</Text>
      <Text className="text-sm text-gray-500">{item.sid}</Text>
      <Text className="text-sm text-gray-500">{item.session}</Text>
      </View>
      <View className="flex items-end">
      <Text className="text-sm text-gray-400">{item.role}</Text>
      <Text className="mt-1 text-lg text-primary">Manage</Text>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView className="h-full">
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className="py-5">
            <View className="flex items-center justify-center py-10 text-center align-middle">
              <Text className="text-2xl text-primary">Manage Students</Text>
            </View>

            <View className="px-4">
              <TextInput
              className="rounded-full border border-gray-300 p-3 shadow-sm"
              placeholder="Search students..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#999"
              style={{ backgroundColor: "#f9f9f9" }}
              />
            </View>
          </View>
        )}
        renderItem={({ item }) => renderStudents({ item })}
      />
    </GestureHandlerRootView>
  );
};

export default ManageStudents;
