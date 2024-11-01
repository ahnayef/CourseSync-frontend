import { Image, Text, View } from "react-native";
import { Href, router } from "expo-router";
import Cbutton from "./components/Cbutton/Cbutton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { logo } from "@/constants/assets";

export default function Index() {
  const handleRouter = (page: string) => {
    // router.replace("/login");
    router.navigate(`/${page}` as Href)
  };

  return (
    <GestureHandlerRootView className="flex-1 items-center justify-center bg-white font-notoSB">
      <Image source={logo} style={{ width: 100, height: 100 }} />

      <Text className="text-xl font-bold text-primary">CourseSync</Text>
      <Text className="text-primary">
        Bring order to your academic life, all in one place.
      </Text>

      <View className="flex flex-col w-full py-10">
        <Cbutton
          title="Login"
          styles="rounded-sm m-4"
          onclickFn={() => handleRouter("login")}
        />

        <Cbutton
          title="Signup"
          styles="rounded-sm m-4"
          onclickFn={() => handleRouter("signup")}
        />
      </View>
    </GestureHandlerRootView>
  );
}
