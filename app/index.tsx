import { Image, Text, View } from "react-native";
import { Redirect } from "expo-router";
import Cbutton from "./components/Cbutton/Cbutton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { logo } from "@/constants/assets";
import { useContext } from "react";
import GlobalContext from "@/context/globalContext";
import { handleNavigate } from "@/utils/navigate";

export default function Index() {
  const { isLoggedIn } = useContext(GlobalContext);
  if (isLoggedIn) {
    return <Redirect href="/dashboard" />;
  }


  return (
    <GestureHandlerRootView className="flex-1 items-center justify-center bg-white font-notoSB">
      <Image source={logo} style={{ width: 100, height: 100 }} />

      <Text className="text-xl font-bold text-primary">CourseSync</Text>
      <Text className="text-primary">
        Bring order to your academic life, all in one place.
      </Text>

      <View className="flex w-full flex-col py-10">
        <Cbutton
          title="Login"
          styles="rounded-sm m-4"
          onclickFn={() => handleNavigate("login")}
        />

        <Cbutton
          title="Signup"
          styles="rounded-sm m-4"
          onclickFn={() => handleNavigate("signup")}
        />
      </View>
    </GestureHandlerRootView>
  );
}
