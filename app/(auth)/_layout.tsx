import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import AuthContext from "@/context/authContext";

const AuthLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn) {
    return <Redirect href="/dashboard" />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
