import { Image, Text, TouchableOpacity, View } from "react-native";
import logo from "../assets/images/favicon.png";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white font-notoSB">
      <Image source={logo} style={{ width: 100, height: 100 }} />

      <Text className="text-xl font-bold text-primary">CourseSync</Text>
      <Text className="text-primary">
        Bring order to your academic life, all in one place.
      </Text>

      <View className="flex flex-row gap-5 p-10">
        <TouchableOpacity className="rounded bg-primary px-5 py-2 text-white">
          <Text className="text-white">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity className="rounded bg-primary px-5 py-2 text-white">
          <Text className="text-white">Sign Up</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}
