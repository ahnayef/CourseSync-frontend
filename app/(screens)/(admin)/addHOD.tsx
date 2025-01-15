import { View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../components/FormInput/FormInput";
import Cbutton from "../../components/Cbutton/Cbutton";
import { toast } from "@/utils/toast";
import { request } from "@/utils/request";
import { handleNavigate } from "@/utils/navigate";

const AddHOD = () => {
  const [HOD, setHOD] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    if (
      HOD.name &&
      HOD.email &&
      HOD.department &&
      HOD.password &&
      HOD.confirmPassword
    ) {
      if (HOD.password !== HOD.confirmPassword) {
        toast("Password and Confirm Password do not match");
        return;
      }
      try {
        const res = await request.post("/users/addHOD", HOD);

        toast(res as any);
        handleNavigate("/manageHODs");
      } catch (error: any) {
        toast(error.response?.data || error.message);
      }
    } else {
      toast("Please fill all fields");
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <GestureHandlerRootView className="flex-col items-center justify-center font-notoSB">
          <View className="w-full p-5">
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

            <Cbutton title="Add" onclickFn={() => handleSubmit()} />
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddHOD;
