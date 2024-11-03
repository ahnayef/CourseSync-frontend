import { useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  NotoSansBengali_400Regular,
} from "@expo-google-fonts/noto-sans-bengali";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/authContext";
import { request } from "@/constants/request";

export default function App() {
  let [fontsLoaded] = useFonts({
    NotoSansBengali_400Regular,
  });

  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async ({ email, password }: any) => {
    setLoading(true);
    try {
      const res = await request.post("/auth/login", {
        email,
        password,
      });
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const register = async ({ email, password }: any) => {
    setLoading(true);
    try {
      const res = await request.post("/auth/register", {
        email,
        password,
      });
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const checkIsLoggedIn = () => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, [user]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    return (
      <AuthProvider value={{isLoggedIn}}>
        <View style={{ flex: 1 }}>
          <RootLayout />
        </View>
      </AuthProvider>
    );
  }
}

function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(dashboard)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
