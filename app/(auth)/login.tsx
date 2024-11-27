import { View, Text, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput/FormInput";
import Cbutton from "../components/Cbutton/Cbutton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Href, Link, router } from "expo-router";
import GlobalContext from "@/context/globalContext";
import { toast } from "@/utils/toast";

export default function Login() {
  const [formState, setFormState] = useState({
    sid: "",
    email: "",
    password: "",
    role: "",
  });

  const { login } = useContext(GlobalContext);

  const handleSubmit = () => {
    console.log(formState.role);
    if (
      (formState.role === "Teacher" || formState.role === "Admin/HOD") &&
      formState.email !== "" &&
      formState.password !== ""
    ) {
      login({
        role: formState.role,
        identification: formState.email,
        password: formState.password,
      });
    } else if (
      formState.role === "Student" &&
      formState.sid !== "" &&
      formState.password !== ""
    ) {
      login({
        role: formState.role,
        identification: formState.sid,
        password: formState.password,
      });
    } else {
      toast("Please fill all fields");
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <GestureHandlerRootView className="h-screen flex-1 flex-col items-center justify-center bg-white font-notoSB">
          <Text className="text-xl font-bold text-primary">Login</Text>
          <View className="w-3/4">
            <FormInput
              value={formState.role}
              title="Role"
              onChangeFn={(e: any) => setFormState({ ...formState, role: e })}
              type="select"
              selectItems={["Teacher", "Student", "Admin/HOD"]}
            />

            {formState.role === "Teacher" || formState.role === "Admin/HOD" ? (
              <>
                <FormInput
                  value={formState.email}
                  title="Email"
                  onChangeFn={(e: any) =>
                    setFormState({ ...formState, email: e })
                  }
                />
              </>
            ) : formState.role === "Student" ? (
              <>
                <FormInput
                  value={formState.sid}
                  title="Student ID"
                  onChangeFn={(e: any) =>
                    setFormState({ ...formState, sid: e })
                  }
                />
              </>
            ) : (
              <></>
            )}

            {formState.role !== "" && (
              <>
                <FormInput
                  value={formState.password}
                  title="Password"
                  onChangeFn={(e: any) =>
                    setFormState({ ...formState, password: e })
                  }
                  isPassword={true}
                />
              </>
            )}

            <Cbutton title="Login" onclickFn={() => handleSubmit()} />
              <Text className="w-full text-center p-2">
                Don't have an account? <Link className="text-primary" href="/signup"> Signup</Link>
              </Text>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ScrollView>
  );
}
