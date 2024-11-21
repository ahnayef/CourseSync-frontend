import { View, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput/FormInput";
import Cbutton from "../components/Cbutton/Cbutton";
import { toast } from "@/utils/toast";
import { request } from "@/utils/request";
import GlobalContext from "@/context/globalContext";
import { router, useLocalSearchParams } from "expo-router";

const CreateNotice = () => {
  const { isLoading, setLoading } = useContext(GlobalContext);

  const { courseId } = useLocalSearchParams();
  console.log(courseId);
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    courseId: courseId || null,
  });

  const handleSubmit = async () => {
    if (formState.title !== "" && formState.content !== "") {
      setLoading(true);
      try {
        console.log(formState);
        const res = await request.post("/notices/create", formState);
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
              value={formState.title}
              title="Title"
              onChangeFn={(e: any) => setFormState({ ...formState, title: e })}
            />

            <FormInput
              value={formState.content}
              title="Description"
              type="textarea"
              onChangeFn={(e: any) =>
                setFormState({ ...formState, content: e })
              }
            />

            <Cbutton title="Post" onclickFn={() => handleSubmit()} />
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CreateNotice;
