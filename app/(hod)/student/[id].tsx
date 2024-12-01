import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";

const Student = () => {
  const { id } = useLocalSearchParams();


  const [student, setStudent] = useState({
    id: null,
    name: "",
    sid: "",
    role: "",
    session: "",
  });

  const getStudent = async () => {
    try {
      const res = await request.get(`/users/getOne/${id}`);
      setStudent(res.data);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  const handleBan = () => {
    Alert.alert("Under Construction");
  };

  const handleRoleChange = (newRole: string) => {
    // setStudent((prevStudent) => ({ ...prevStudent, role: newRole }));
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
        <Text className="mb-2 text-lg font-semibold text-gray-800">
          Name: {student.name}
        </Text>
        <Text className="mb-2 text-gray-600">
          Student ID: {student.sid}
        </Text>
        <Text className="mb-2 text-gray-600">
          Session: {student.session}
        </Text>
        <Text className="mb-4 text-gray-600">Role: {student.role}</Text>
      </View>

      <Text className="mb-2 text-gray-800">Change Role:</Text>
      <View className="mb-6 rounded-lg bg-white p-2">
        <Picker
          selectedValue={student.role}
          onValueChange={(itemValue: string) => handleRoleChange(itemValue)}
          
        >
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="CR" value="CR" />
        </Picker>
      </View>

      <TouchableOpacity
        onPress={handleBan}
        className="mb-4 flex-row items-center justify-center rounded-lg bg-red-600 p-3"
      >
        <Ionicons name="ban" size={24} color="#fff" className="mr-2" />
        <Text className="text-white">Ban Student</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleDelete}
        className="flex-row items-center justify-center rounded-lg bg-red-600 p-3"
      >
        <Ionicons name="trash-bin" size={24} color="#fff" className="mr-2" />
        <Text className="text-white">Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Student;
