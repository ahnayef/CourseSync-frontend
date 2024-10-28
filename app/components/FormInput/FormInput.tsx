import { View, Text, TextInput } from "react-native";

const FormInput = ({
  value,
  title,
  onChangeFn,
  isPassword,
}: {
  value: string;
  title: string;
  onChangeFn: Function;
  isPassword?: boolean;
}) => {
  return (
    <View className="flex w-full gap-2 py-5">
      <Text className="font-medium text-primary">{title}:</Text>

      <View className="rounded-sm border border-primary p-2">
        <TextInput
          value={value}
          keyboardType="default"
          onChangeText={(e) => onChangeFn(e)}
          placeholder={`Enter your ${title}`}
          secureTextEntry={isPassword}
        />
      </View>
    </View>
  );
};

export default FormInput;
