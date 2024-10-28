import { View, Text } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

const Cbutton = ({
  title,
  onclickFn,
  styles,
}: {
  title: string;
  onclickFn: Function;
  styles?: string;
}) => {
  return (
    <TouchableOpacity
      onPressIn={() => onclickFn()}
      className={`flex justify-center items-center bg-primary px-5 py-2 text-center text-white ${styles}`}
    >
      <Text className="text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default Cbutton;
