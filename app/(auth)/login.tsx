import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput/FormInput";
import Cbutton from "../components/Cbutton/Cbutton";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Login() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log(formState);
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <GestureHandlerRootView className="h-screen flex-1 flex-col items-center justify-center bg-white font-notoSB">
          <Text className="text-xl font-bold text-primary">Login</Text>
          <View className="w-3/4">
            <FormInput
              value={formState.email}
              title="Email"
              onChangeFn={(e: any) => setFormState({ ...formState, email: e })}
            />
            <FormInput
              value={formState.password}
              title="Password"
              onChangeFn={(e: any) => setFormState({ ...formState, password: e })}
              isPassword={true}
            />

            <Cbutton title="Login" onclickFn={() => handleSubmit()} />
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ScrollView>
  );
}
