import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addIcon } from "@/constants/icons";

const Cources = () => {
  const handleAddCource = () => {
    alert("Under Construction");
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <GestureHandlerRootView className="flex-col items-center justify-center py-5 align-middle">
          <Text className="text-xl text-primary">Cources</Text>

          <TouchableOpacity
            className="my-5 flex w-2/5 flex-row items-center justify-center rounded bg-primary p-3 text-center text-xl"
            onPress={() => handleAddCource()}
          >
            <Image source={addIcon} className="h-5 w-5" />
            <Text className="ml-2 text-white">Add Cource</Text>
          </TouchableOpacity>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Cources;
