import React, { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import AuthContext from "@/context/authContext";

const DashboardLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);

  console.log("Dashboard", isLoggedIn);

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
      </Stack>
    </>
  );
};

export default DashboardLayout;
