import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";
import FormInput from "@/app/components/FormInput/FormInput";
import Cbutton from "@/app/components/Cbutton/Cbutton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Student = () => {
  const { id } = useLocalSearchParams();

  const [course, setCourse] = useState({
    id: "1",
    name: "Demo Course",
    code: "CSE-123",
    credit: "3",
    instructor: "Demo Teacher",
  });

  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Demo Teacher 1",
    },
    {
      id: 2,
      name: "Demo Teacher 2",
    },
    {
      id: 3,
      name: "Demo Teacher 3",
    },
  ]);

  const getCourse = async () => {
    try {
      const res = await request.get(`/courses/getOne/${id}`);
      setCourse(res.data);
    } catch (error: any) {
      // toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  const handleDelete = () => {
    Alert.alert(
      "Delete Course",
      `Are you sure you want to delete this student?`,
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
              const res = await request.delete(`/course/delete/${course.id}`);
              toast(res as any);
            } catch (error: any) {
              toast(error.response?.data || error.message);
            }
          },
        },
      ],
    );
  };

  const handleInstructorChange = async (instructorId: string) => {
    try {
      const res = await request.put(`/course/updateInstructor/`, {
        courseId: id,
        instructorId: instructorId,
      });
      toast(res as any);
      setCourse((prevInstructor) => ({
        ...prevInstructor,
        instructor: instructorId,
      }));
    } catch (error: any) {
      toast(error.response?.data || error.message);
    }
  };

  const saveCourse = () => {};

  return (
    <ScrollView>
      <SafeAreaView>
        <GestureHandlerRootView className="flex-col items-center justify-center font-notoSB">
          <View className="w-full flex-1 bg-gray-100 p-4">
            <Text className="mb-6 w-full text-center text-2xl font-bold text-gray-800">
              Manage Course
            </Text>
            <Text className="mb-2 font-bold text-gray-800">Basic Info:</Text>

            <View className="mb-6 rounded-lg bg-white p-6 shadow-lg">
              <FormInput
                value={course.name}
                title="Course Name"
                onChangeFn={(e: any) => setCourse({ ...course, name: e })}
              />
              <FormInput
                value={course.code}
                title="Course Code"
                onChangeFn={(e: any) => setCourse({ ...course, code: e })}
              />
              <FormInput
                value={course.credit}
                title="Credit"
                type="select"
                selectItems={["3", "1.5"]}
                onChangeFn={(e: any) => setCourse({ ...course, credit: e })}
              />

              <Cbutton title="Save" onclickFn={() => saveCourse()} />
            </View>

            <Text className="mb-2 font-bold text-gray-800">Instructor:</Text>
            <View className="mb-6 rounded-lg bg-white p-2">
              <Picker
                selectedValue={course.instructor}
                onValueChange={(itemValue: string) =>
                  handleInstructorChange(itemValue)
                }
              >
                {teachers.map((teacher) => (
                  <Picker.Item key={teacher.id} label={teacher.name} value={teacher.id} />
                ))}
              </Picker>
            </View>
            
            <Text className="mb-2 font-bold text-gray-800">Action:</Text>
            <TouchableOpacity
              onPress={handleDelete}
              className="mb-4 flex-row items-center justify-center rounded-lg bg-red-600 p-3"
            >
              <Ionicons name="trash" size={24} color="#fff" className="mr-2" />
              <Text className="text-white">Delete Course</Text>
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Student;
