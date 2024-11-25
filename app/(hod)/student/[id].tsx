import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Student = () => {
  const { id } = useLocalSearchParams();

  console.log(id);

  return (
    <View>
      <Text>Student : {id}</Text>
    </View>
  );
};

export default Student;
