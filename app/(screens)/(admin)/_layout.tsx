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
      <Stack.Screen name="manageHODs" options={{ headerShown: false }} />
      <Stack.Screen
        name="addHOD"
        options={{
          title: "Add HOD",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="hod/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default HodMain;
