import { View, Text } from "react-native";
import React, { useContext } from "react";
import GlobalContext from "@/context/globalContext";
import { Redirect, Stack } from "expo-router";

const disscussionLayout = () => {
  const { isLoggedIn } = useContext(GlobalContext);

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="discussion"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="question/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default disscussionLayout;
