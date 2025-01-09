import React, { useContext, useEffect } from "react";
import { Redirect, Stack } from "expo-router";
import GlobalContext from "@/context/globalContext";

const HodMain = () => {
  const { user, isLoggedIn } = useContext(GlobalContext);

  const verifyAccess = () => {
    if (!isLoggedIn || user.role !== "hod") {
      return <Redirect href="/login" />;
    }
  };

  useEffect(() => {
    verifyAccess();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="hodMain" options={{ headerShown: false }} />
      <Stack.Screen name="manageStudents" options={{ headerShown: false }} />
      <Stack.Screen
        name="student/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="manageCourses" options={{ headerShown: false }} />
      <Stack.Screen
        name="hodcourse/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="manageSchedule" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HodMain;
