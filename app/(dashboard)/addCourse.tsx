import { View, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput/FormInput";
import Cbutton from "../components/Cbutton/Cbutton";
import { toastError } from "@/utils/toast";
import { request } from "@/utils/request";
import GlobalContext from "@/context/globalContext";
import { handleNavigate } from "@/utils/navigate";

const AddCourse = () => {
  const { isLoading, setLoading } = useContext(GlobalContext);

  const [formState, setFormState] = useState({
    name: "",
    code: "",
    description: "",
    department: "",
    session: "",
    credit: "",
  });

  const handleSubmit = async () => {
    if (
      formState.name !== "" &&
      formState.code !== "" &&
      formState.description !== "" &&
      formState.department !== "" &&
      formState.session !== "" &&
      formState.credit !== ""
    ) {
      setLoading(true);
      // request
      //   .post("/courses/create", formState)
      //   .then((res) => {
      //     console.log(res);
      //     setLoading(false);
      //     handleNavigate("./cources");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     toastError(err.response?.data || err.message);
      //     setLoading(false);
      //   });

      try {
        const res = await request.post("/courses/create", formState);
        console.log(res);
        setLoading(false);
        handleNavigate("./cources");
      } catch (error: any) {
        toastError(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toastError("Please fill all fields");
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <GestureHandlerRootView className="flex-1 flex-col items-center justify-center bg-white font-notoSB">
          <View className="w-full px-10">
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
              value={formState.description}
              title="Description"
              onChangeFn={(e: any) =>
                setFormState({ ...formState, description: e })
              }
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
              selectItems={["CSE", "BBA", "ENG", "LAW"]}
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
