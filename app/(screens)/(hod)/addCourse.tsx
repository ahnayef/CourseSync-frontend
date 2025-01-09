import { View, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../components/FormInput/FormInput";
import Cbutton from "../../components/Cbutton/Cbutton";
import { toast } from "@/utils/toast";
import { request } from "@/utils/request";
import GlobalContext from "@/context/globalContext";
import { handleNavigate } from "@/utils/navigate";

const AddCourse = () => {
  const { isLoading, setLoading } = useContext(GlobalContext);

  const [formState, setFormState] = useState({
    name: "",
    code: "",
    department: "",
    session: "",
    credit: "",
  });

  const handleSubmit = async () => {
    if (
      formState.name !== "" &&
      formState.code !== "" &&
      formState.department !== "" &&
      formState.session !== "" &&
      formState.credit !== ""
    ) {
      setLoading(true);
      try {
        const res = await request.post("/courses/create", formState);
        setLoading(false);
        toast(res as any);
        handleNavigate("./courses");
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
              value={formState.name}
              title="Course Name"
              onChangeFn={(e: any) => setFormState({ ...formState, name: e })}
            />

            <FormInput
              value={formState.code}
              title="Course Code"
              onChangeFn={(e: any) => setFormState({ ...formState, code: e })}
            />

            <FormInput
              value={formState.credit}
              title="Credit"
              type="select"
              selectItems={["3", "1.5"]}
              onChangeFn={(e: any) => setFormState({ ...formState, credit: e })}
            />

            <FormInput
              value={formState.department}
              type="select"
              selectItems={["CSE", "BBA", "English", "LLB"]}
              title="Department"
              onChangeFn={(e: any) =>
                setFormState({ ...formState, department: e })
              }
            />

            <FormInput
              value={formState.session}
              title="Session"
              onChangeFn={(e: any) =>
                setFormState({ ...formState, session: e })
              }
            />

            <Cbutton title="Add Course" onclickFn={() => handleSubmit()} />
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddCourse;
