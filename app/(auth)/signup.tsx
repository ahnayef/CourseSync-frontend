import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput/FormInput";
import Cbutton from "../components/Cbutton/Cbutton";
import { Href, router } from "expo-router";

const Signup = () => {
  const [formState, setFormState] = useState({
    sid: "",
    name: "",
    email: "",
    password: "",
    department: "",
    session: "",
    role: "",
  });

  const handleSubmit = () => {
    if (formState.role === "Teacher") {
      setFormState({ ...formState, sid: "" });
      setFormState({ ...formState, session: "" });
      if (
        formState.email &&
        formState.name &&
        formState.department &&
        formState.password
      ) {
        console.log(formState);
        router.navigate("/dashboard" as Href);
      } else {
        alert("Please fill all the fields");
      }
    } else {
      setFormState({ ...formState, email: "" });
      if (
        formState.sid &&
        formState.name &&
        formState.department &&
        formState.session &&
        formState.password
      ) {
        console.log(formState);
        router.navigate("/dashboard" as Href);
      } else {
        alert("Please fill all the fields");
      }
    }
  };

  return (
    <SafeAreaView>
      <GestureHandlerRootView className="flex h-full flex-col items-center justify-center bg-white font-notoSB">
        <Text className="text-xl font-bold text-primary">Sign Up</Text>
        <View className="w-3/4">
          <FormInput
            value={formState.name}
            title="Name"
            onChangeFn={(e: any) => setFormState({ ...formState, name: e })}
          />

          <FormInput
            value={formState.role}
            title="Role"
            onChangeFn={(e: any) => setFormState({ ...formState, role: e })}
            type="select"
          />

          {formState.role === "Teacher" ? (
            <>
              <FormInput
                value={formState.email}
                title="Email"
                onChangeFn={(e: any) =>
                  setFormState({ ...formState, email: e })
                }
              />
            </>
          ) : formState.role === "Student" || formState.role === "CR" ? (
            <>
              <FormInput
                value={formState.sid}
                title="Student ID"
                onChangeFn={(e: any) => setFormState({ ...formState, sid: e })}
              />
              <FormInput
                value={formState.session}
                title="Session"
                onChangeFn={(e: any) =>
                  setFormState({ ...formState, session: e })
                }
              />
            </>
          ) : (
            <></>
          )}

          {formState.role !== "" && (
            <>
              <FormInput
                value={formState.department}
                title="Department"
                onChangeFn={(e: any) =>
                  setFormState({ ...formState, department: e })
                }
              />
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

          <Cbutton title="Signup" onclickFn={() => handleSubmit()} />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Signup;
