import { View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../components/FormInput/FormInput";
import Cbutton from "../../components/Cbutton/Cbutton";
import { toast } from "@/utils/toast";
import { request } from "@/utils/request";
import GlobalContext from "@/context/globalContext";
import { handleNavigate } from "@/utils/navigate";

const AddCourse = () => {
  const { isLoading, setLoading, user } = useContext(GlobalContext);

  const [formState, setFormState] = useState({
    name: "",
    code: "",
    department: "",
    credit: "",
    instructor: NaN,
  });

  const [instructors, setInstructors] = useState<any>([]);

  const getInstructors = async () => {
    try {
      const res = await request.get(`/users/getTeachers/`);
      setInstructors(res.data);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getInstructors();
  }, []);

  const handleSubmit = async () => {
    if (
      formState.name !== "" &&
      formState.code !== "" &&
      formState.department !== "" &&
      formState.credit !== "" &&
      !Number.isNaN(formState.instructor)
    ) {
      setLoading(true);
      try {
        const res = await request.post("/courses/create", formState);
        setLoading(false);
        toast(res as any);
        handleNavigate("./manageCourses");
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
              selectItems={[
                { label: "3", value: "3" },
                { label: "1.5", value: "1.5" },
              ]}
              onChangeFn={(e: any) => setFormState({ ...formState, credit: e })}
            />

            <FormInput
              value={formState.department}
              type="select"
              selectItems={[
                { label: "CSE", value: "CSE" },
                { label: "BBA", value: "BBA" },
                { label: "English", value: "English" },
                { label: "LLB", value: "LLB" },
              ]}
              title="Department"
              onChangeFn={(e: any) =>
                setFormState({ ...formState, department: e })
              }
            />

            <FormInput
              value={formState.instructor}
              type="select"
              selectItems={instructors.map((instructor: any) => ({
                label: instructor.name,
                value: instructor.id,
              }))}
              title="Instructor"
              onChangeFn={(e: any) =>
                setFormState({ ...formState, instructor: e })
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
