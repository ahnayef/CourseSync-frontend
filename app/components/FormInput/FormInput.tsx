import {Picker} from '@react-native-picker/picker';
import { View, Text, TextInput } from "react-native";

const FormInput = ({
  value,
  title,
  onChangeFn,
  isPassword,
  type,
}: {
  value: string;
  title: string;
  onChangeFn: Function;
  isPassword?: boolean;
  type?: string;
}) => {
  return (
    <View className="flex w-full gap-2 py-3">
      <Text className="font-medium text-primary">{title}:</Text>

      <View className="rounded-sm border border-primary p-2">
        {type === "select" ? (
          <Picker selectedValue={value} onValueChange={(e) => onChangeFn(e)}>
            <Picker.Item label="Select a role..." value="" />
            <Picker.Item label="Teacher" value="Teacher" />
            <Picker.Item label="CR" value="CR" />
            <Picker.Item label="Student" value="Student" />
          </Picker>
        ):
        <TextInput
          value={value}
          keyboardType="default"
          onChangeText={(e) => onChangeFn(e)}
          placeholder={`Enter your ${title}`}
          secureTextEntry={isPassword}
        />}
      </View>
    </View>
  );
};

export default FormInput;
