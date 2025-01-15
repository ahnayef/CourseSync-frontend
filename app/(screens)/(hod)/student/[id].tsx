import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
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
    disabled: false,
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

  const toggleBan = () => {
    Alert.alert(
      "Delete Student",
      `Are you sure you want to ${student.disabled ? "unban" : "ban"} this student?`,
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
              const res = await request.put(`/users/toggleBan`, {
                id: id,
                disabled: !student.disabled,
              });
              setStudent((prevStudent) => ({
                ...prevStudent,
                disabled: !prevStudent.disabled,
              }));
              toast(res as any);
            } catch (error: any) {
              toast(error.response?.data || error.message);
            }
          },
        },
      ],
    );
  };

  const handleRoleChange = async (newRole: string) => {
    try {
      const res = await request.put(`/users/updateRole/`, {
        id: id,
        role: newRole,
      });
      toast(res as any);
      setStudent((prevStudent) => ({ ...prevStudent, role: newRole }));
    } catch (error: any) {
      toast(error.response?.data || error.message);
    }
  };

  const handleReset = () => {
    Alert.alert(
      "Reset Password",
      `Are you sure you want to reset password for this student?`,
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
              const res = await request.get(`/users/resetPass/${id}`);
              toast(res as any);
            } catch (error: any) {
              toast(error.response?.data || error.message);
            }
          },
        },
      ],
    );
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
        <Text className="mb-2 text-gray-600">Student ID: {student.sid}</Text>
        <Text className="mb-2 text-gray-600">Session: {student.session}</Text>
        <Text className="mb-4 text-gray-600">Role: {student.role}</Text>
      </View>

      <Text className="mb-2 text-gray-800">Change Role:</Text>
      <View className="mb-6 rounded-lg bg-white p-2">
        <Picker
          selectedValue={student.role}
          onValueChange={(itemValue: string) => handleRoleChange(itemValue)}
        >
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="CR" value="cr" />
        </Picker>
      </View>

      <TouchableOpacity
        onPress={toggleBan}
        className={`mb-4 flex-row items-center justify-center rounded-lg ${student.disabled ? "bg-green-500" : "bg-red-600"} p-3`}
      >
        <Ionicons
          name={student.disabled ? "lock-open" : "lock-closed"}
          size={24}
          color="#fff"
          className="mr-2"
        />
        <Text className="text-white">
          {student.disabled ? "Unban Student" : "Ban Student"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleReset}
        className="flex-row items-center justify-center rounded-lg bg-red-600 p-3"
      >
        <FontAwesome6
          name="rotate-right"
          size={24}
          color="#fff"
          className="mr-2"
        />
        <Text className="text-white"> Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Student;
