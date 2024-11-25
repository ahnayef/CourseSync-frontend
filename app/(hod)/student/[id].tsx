import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Student = () => {
  const { id } = useLocalSearchParams();

  console.log(id);

  return (
    <View>
      <Text>Student : {id}</Text>
    </View>
  );
};

export default Student;
import { View, Text, Button, Alert } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const Student = () => {
  const { id } = useLocalSearchParams();

  const [student, setStudent] = useState({
    id: 1,
    name: "John Doe",
    sid: "123456",
    role: "student",
    session: "Spring 23",
  });

  const handleBan = () => {
    Alert.alert("Ban Student", "Student has been banned.");
  };

  const handleRoleChange = (newRole: string) => {
    setStudent((prevStudent) => ({ ...prevStudent, role: newRole }));
  };

  const handleDelete = () => {
    // Implement delete logic here
    Alert.alert("Delete Account", "Student account has been deleted.");
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Manage Student
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>
        Name: {student.name}
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>
        Student ID: {student.sid}
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>
        Session: {student.session}
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>
        Role: {student.role}
      </Text>

      <View style={{ marginTop: 16 }}>
        <Button title="Ban Student" onPress={handleBan} color="red" />
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 18, marginBottom: 8 }}>Change Role:</Text>
        <Picker
          selectedValue={student.role}
          onValueChange={(itemValue: string) => handleRoleChange(itemValue)}
          style={{ height: 50, width: 150 }}
        >
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="CR" value="CR" />
        </Picker>
      </View>

      <View style={{ marginTop: 16 }}>
        <Button title="Delete Account" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
};

export default Student;
