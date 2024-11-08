import { useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  NotoSansBengali_400Regular,
} from "@expo-google-fonts/noto-sans-bengali";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/authContext";
import { request } from "@/utils/request";
import { toastError } from "@/utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  let [fontsLoaded] = useFonts({
    NotoSansBengali_400Regular,
  });

  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const register = async ({
    role,
    sid,
    name,
    email,
    password,
    department,
    session,
  }: any) => {
    setLoading(true);
    try {
      const res = await request.post("/users/register", {
        role,
        sid: sid || null,
        name,
        email: email || null,
        password,
        department,
        session: session || null,
      });
      console.log(res.data);
      // setUser(res.data);
    } catch (error: any) {
      toastError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ role, identification, password }: any) => {
    setLoading(true);
    try {
      const res = await request.post("/users/login", {
        role,
        identification,
        password,
      });
      const { user, token } = res.data;
      AsyncStorage.setItem("token", token);
      AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error: any) {
      toastError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error: any) {
      toastError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkIsLoggedIn = async () => {
    setLoading(true);
    await AsyncStorage.getItem("token")
      .then((token) => {
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
      <AuthProvider value={{ isLoading, isLoggedIn, login, register, logout }}>
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
