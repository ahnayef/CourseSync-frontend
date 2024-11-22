import { View, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { toast } from "@/utils/toast";
import { request } from "@/utils/request";
import GlobalContext from "@/context/globalContext";
import { router, useLocalSearchParams } from "expo-router";
import FormInput from "@/app/components/FormInput/FormInput";
import Cbutton from "@/app/components/Cbutton/Cbutton";

const AddPeople = () => {
  const { isLoading, setLoading } = useContext(GlobalContext);

  const { courseId } = useLocalSearchParams();
  
  const [formState, setFormState] = useState({
    sid: "",
    courseId: courseId || null,
  });

  const handleSubmit = async () => {
    if (formState.sid !== "" && formState.courseId !== null) {
      setLoading(true);
      try {
        const res = await request.post("/courses/addStudent", formState);
        setLoading(false);
        toast(res as any);
        router.back();
      } catch (error: any) {
        toast(error.response?.data || error.message);
      } finally {
        setLoading(false);
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
              value={formState.sid}
              title="Student ID"
              onChangeFn={(e: any) => setFormState({ ...formState, sid: e })}
            />
            <Cbutton title="Add" onclickFn={() => handleSubmit()} />
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddPeople;
