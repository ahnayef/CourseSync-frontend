import React, { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import GlobalContext from "@/context/globalContext";

const DashboardLayout = () => {
  const { isLoggedIn } = useContext(GlobalContext);

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="dashboard"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="cources"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="addCourse"
          options={{
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "white" },
            title: "Add Course",
          }}
        />
      </Stack>
    </>
  );
};

export default DashboardLayout;
