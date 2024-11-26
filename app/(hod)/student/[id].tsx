import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const Student = () => {
  const { id } = useLocalSearchParams();

  const [student, setStudent] = useState({
    id: 1,
    name: "Abdullah ",
    sid: "0562310005101042",
    role: "student",
    session: "Spring 23",
  });

  const handleBan = () => {
    Alert.alert("Under Construction");
  };

  const handleRoleChange = (newRole: string) => {
    setStudent((prevStudent) => ({ ...prevStudent, role: newRole }));
  };

  const handleDelete = () => {
    Alert.alert("Under Construction");
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">
        Manage Student
      </Text>

      <View className="mb-6 rounded-lg bg-white p-6 shadow-lg">
        <Text className="mb-2 text-xl font-semibold text-gray-800">
          Name: {student.name}
        </Text>
        <Text className="mb-2 text-lg text-gray-600">
          Student ID: {student.sid}
        </Text>
        <Text className="mb-2 text-lg text-gray-600">
          Session: {student.session}
        </Text>
        <Text className="mb-4 text-lg text-gray-600">Role: {student.role}</Text>
      </View>

      <Text className="mb-2 text-lg text-gray-800">Change Role:</Text>
      <View className="mb-6 rounded-lg bg-white p-2">
        <Picker
          selectedValue={student.role}
          onValueChange={(itemValue: string) => handleRoleChange(itemValue)}
          style={{ height: 50 }}
        >
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="CR" value="CR" />
        </Picker>
      </View>

      <TouchableOpacity
        onPress={handleBan}
        className="mb-4 flex-row items-center justify-center rounded-lg bg-red-600 p-4"
      >
        <Ionicons name="ban" size={24} color="#fff" className="mr-2" />
        <Text className=" text-white">Ban Student</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleDelete}
        className="flex-row items-center justify-center rounded-lg bg-red-600 p-4"
      >
        <Ionicons name="trash-bin" size={24} color="#fff" className="mr-2" />
        <Text className=" text-white">Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Student;
