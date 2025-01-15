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
import { handleNavigate } from "@/utils/navigate";

const HOD = () => {
  const { id } = useLocalSearchParams();

  const [HOD, setHOD] = useState<any>({});

  const getHOD = async () => {
    try {
      const res = await request.get(`/users/getOne/${id}`);
      const hod = res.data;
      setHOD({
        id: hod.id,
        name: hod.name,
        email: hod.email,
        department: hod.department,
      });
    } catch (error: any) {
      toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getHOD();
  }, []);

  const updateHOD = () => {
    request
      .put(`/users/updateHOD/`, HOD)
      .then((res) => {
        toast(res as any);
        handleNavigate("/manageHODs");
      })
      .catch((error: any) => {
        toast(error.response?.data || error.message);
      });
  };

  const deleteHOD = () => {
    Alert.alert("Delete HOD", "Are you sure you want to delete this HOD?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            const res = await request.delete(`/users/delete/${HOD.id}`);
            handleNavigate("/manageHODs");
            toast(res as any);
          } catch (error: any) {
            toast(error.response?.data || error.message);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <GestureHandlerRootView className="flex-col items-center justify-center font-notoSB">
          <View className="w-full flex-1 bg-gray-100 p-4">
            <Text className="mb-6 w-full text-center text-2xl font-bold text-gray-800">
              Manage HOD
            </Text>
            <Text className="mb-2 font-bold text-gray-800">Basic Info:</Text>

            <View className="mb-6 rounded-lg bg-white p-6 shadow-lg">
              <FormInput
                value={HOD.name}
                title="Name"
                onChangeFn={(e: any) => setHOD({ ...HOD, name: e })}
              />

              <FormInput
                value={HOD.email}
                title="Email"
                onChangeFn={(e: any) => setHOD({ ...HOD, email: e })}
              />

              <FormInput
                value={HOD.department}
                type="select"
                selectItems={[
                  { label: "CSE", value: "CSE" },
                  { label: "BBA", value: "BBA" },
                  { label: "English", value: "English" },
                  { label: "LLB", value: "LLB" },
                ]}
                title="Department"
                onChangeFn={(e: any) => setHOD({ ...HOD, department: e })}
              />

              <FormInput
                value={HOD.password}
                title="Password"
                onChangeFn={(e: any) => setHOD({ ...HOD, password: e })}
                isPassword={true}
              />

              <FormInput
                value={HOD.confirmPassword}
                title="Confirm Password"
                onChangeFn={(e: any) => setHOD({ ...HOD, confirmPassword: e })}
                isPassword={true}
              />

              <Cbutton title="Save" onclickFn={() => updateHOD()} />
            </View>

            <Text className="mb-2 font-bold text-gray-800">Action:</Text>
            <TouchableOpacity
              onPress={deleteHOD}
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

export default HOD;
