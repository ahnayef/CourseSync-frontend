import { useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  NotoSansBengali_400Regular,
} from "@expo-google-fonts/noto-sans-bengali";
import { Href, router, Stack } from "expo-router";
import { GlobalProvider } from "@/context/globalContext";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import isTokenExpired from "@/constants/checkTokenExpirity";

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
      const { user, token } = res.data;

      await Promise.all([
        AsyncStorage.setItem("token", token),
        AsyncStorage.setItem("user", JSON.stringify(user)),
      ]);

      setUser(user);
      setIsLoggedIn(true);
      router.navigate("/dashboard" as Href);
    } catch (error: any) {
      toast(error.response?.data || error.message);
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

      await Promise.all([
        AsyncStorage.setItem("token", token),
        AsyncStorage.setItem("user", JSON.stringify(user)),
      ]);

      setUser(user);
      setIsLoggedIn(true);
      router.navigate("/dashboard" as Href);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      await Promise.all([
        AsyncStorage.removeItem("token"),
        AsyncStorage.removeItem("user"),
      ]);
      setIsLoggedIn(false);
      router.navigate("/" as Href);
      setUser(null);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };



  const checkIsLoggedIn = async () => {
    // Auto logout if token is expired
    if (await isTokenExpired()) {
      await logout()
        .then(() => {
          toast("Session expired. Please login again.");
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }

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

  const getAndSetUser = async () => {
    await AsyncStorage.getItem("user")
      .then((user) => {
        if (user) {
          setUser(JSON.parse(user));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    checkIsLoggedIn();
    getAndSetUser();
  }, []);

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
      <GlobalProvider
        value={{
          isLoading,
          setLoading,
          isLoggedIn,
          login,
          register,
          logout,
          user,
        }}
      >
        <View style={{ flex: 1 }}>
          <RootLayout />
        </View>
      </GlobalProvider>
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
          statusBarHidden: false,
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
      <Stack.Screen
        name="(hod)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
