import { View, Text, Alert, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";
import FormInput from "@/app/components/FormInput/FormInput";
import Cbutton from "@/app/components/Cbutton/Cbutton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalContext from "@/context/globalContext";

const Student = () => {
  const { id } = useLocalSearchParams();

  const { user } = useContext(GlobalContext);

  const [course, setCourse] = useState<any>({});

  const [instructors, setInstructors] = useState([]);

  const getCourse = async () => {
    try {
      const res = await request.get(`/courses/get/${id}`);
      console.log(res.data);
      setCourse(res.data);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    }
  };

  const getTeachers = async () => {
    try {
      const res = await request.get(`/users/getTeachers/${user.department}`);
      setInstructors(res.data);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getCourse();
    getTeachers();
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


  const updateCourse = () => {
    request
      .put(`/courses/update/`, course)
      .then((res) => {
        toast(res as any);
      })
      .catch((error: any) => {
        toast(error.response?.data || error.message);
      });
  };

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
                selectItems={[
                  { label: "3", value: "3" },
                  { label: "1.5", value: "1.5" },
                ]}
                onChangeFn={(e: any) => setCourse({ ...course, credit: e })}
              />

              <FormInput
                value={course.instructor}
                type="select"
                selectItems={instructors.map((instructor: any) => ({
                  label: instructor.name,
                  value: instructor.id,
                }))}
                title="Instructor"
                onChangeFn={(e: any) => setCourse({ ...course, instructor: e })}
              />

              <Cbutton title="Save" onclickFn={() => updateCourse()} />
            </View>

            <Text className="mb-2 font-bold text-gray-800">Action:</Text>
            <TouchableOpacity
              onPress={handleDelete}
              className="mb-4 flex-row items-center justify-center rounded-lg bg-primary p-3"
            >
              <FontAwesome6 name="rotate-left" size={20} color="#fff" />
              <Text className="text-white">Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              className="mb-4 flex-row items-center justify-center rounded-lg bg-red-600 p-3"
            >
              <Ionicons name="trash" size={24} color="#fff" className="mr-2" />
              <Text className="text-white">Delete</Text>
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Student;
