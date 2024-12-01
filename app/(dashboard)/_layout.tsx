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
          name="courses"
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
        <Stack.Screen
          name="course/[id]"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="notices"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="createNotice"
          options={{
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "white" },
            title: "Create Notice",
          }}
        />

        <Stack.Screen
          name="course/(tabs)/addPeople"
          options={{
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "white" },
            title: "Add Student",
          }}
        />

        <Stack.Screen
          name="schedule"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default DashboardLayout;
