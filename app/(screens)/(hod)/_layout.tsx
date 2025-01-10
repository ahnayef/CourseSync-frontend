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
      <Stack.Screen
        name="addCourse"
        options={{
          animation: "slide_from_bottom",
          contentStyle: { backgroundColor: "white" },
          title: "Add Course",
        }}
      />
      <Stack.Screen
        name="addSchedule"
        options={{
          animation: "slide_from_bottom",
          contentStyle: { backgroundColor: "white" },
          title: "Add Schedule",
        }}
      />
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
      {/* <Stack.Screen name="manageSchedule" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default HodMain;
