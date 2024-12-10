import { View, Text, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput/FormInput";
import Cbutton from "../components/Cbutton/Cbutton";
import { Href, Link, router } from "expo-router";
import GlobalContext from "@/context/globalContext";

const Signup = () => {
  const { register } = useContext(GlobalContext);

  type FormState = {
    sid: string | null;
    name: string;
    email: string | null;
    password: string;
    department: string;
    session: string | null;
    role: string;
  };

  const [formState, setFormState] = useState<FormState>({
    sid: null,
    name: "",
    email: null,
    password: "",
    department: "",
    session: null,
    role: "",
  });

  const handleSubmit = () => {
    if (formState.role === "Teacher") {
      setFormState({ ...formState, sid: null });
      setFormState({ ...formState, session: null });
      if (
        formState.email &&
        formState.name &&
        formState.department &&
        formState.password
      ) {
        register({
          email: formState.email,
          name: formState.name,
          department: formState.department,
          password: formState.password,
          role: formState.role,
        });
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
        register({
          sid: formState.sid,
          name: formState.name,
          department: formState.department,
          session: formState.session,
          password: formState.password,
          role: formState.role,
        });
        // console.log(formState);
        // router.navigate("/dashboard" as Href);
      } else {
        alert("Please fill all the fields");
      }
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <GestureHandlerRootView className="h-screen flex-1 flex-col items-center justify-center bg-white font-notoSB">
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
              selectItems={["Teacher", "Student"]}
            />

            {formState.role === "Teacher" ? (
              <>
                <FormInput
                  value={formState.email || ""}
                  title="Email"
                  onChangeFn={(e: any) =>
                    setFormState({ ...formState, email: e })
                  }
                />
              </>
            ) : formState.role === "Student" ? (
              <>
                <FormInput
                  value={formState.sid || ""}
                  title="Student ID"
                  onChangeFn={(e: any) => setFormState({ ...formState, sid: e })}
                />
                <FormInput
                  value={formState.session || ""}
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
                  type="select"
                  selectItems={["CSE", "BBA", "English", "LLB"]}
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
            <Text className="w-full text-center p-2">
              Already have an account? <Link className="text-primary" href="/login"> Login</Link>
            </Text>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Signup;
