import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput } from "react-native";

type FormInputProps = {
  value: string;
  title: string;
  onChangeFn: Function;
  isPassword?: boolean;
  type?: string;
} & (
  | { type: "select"; selectItems: string[] }
  | { type?: Exclude<string, "select">; selectItems?: never }
);

const FormInput = ({
  value,
  title,
  onChangeFn,
  isPassword,
  type,
  selectItems = [],
}: FormInputProps) => {
  return (
    <View className="flex w-full gap-2 py-3">
      <Text className="font-medium text-primary">{title}:</Text>

      <View className="rounded-sm border border-primary p-2">
        {type === "select" ? (
          <Picker selectedValue={value} onValueChange={(e) => onChangeFn(e)}>
            <Picker.Item
              label="Please select an option"
              value=""
              enabled={false}
            />
            {selectItems.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        ) : type === "textarea" ? (
          <TextInput
            value={value}
            onChangeText={(e) => onChangeFn(e)}
            placeholder={`Enter your ${title}`}
            multiline
            numberOfLines={4}
            style={{ textAlignVertical: "top" }}
          />
        ) : (
          <TextInput
            value={value}
            keyboardType="default"
            onChangeText={(e) => onChangeFn(e)}
            placeholder={`Enter your ${title}`}
            secureTextEntry={isPassword}
          />
        )}
      </View>
    </View>
    // {type === "textarea" && (
    //   <TextInput
    //     value={value}
    //     onChangeText={(e) => onChangeFn(e)}
    //     placeholder={`Enter your ${title}`}
    //     multiline
    //     numberOfLines={4}
    //     style={{ textAlignVertical: "top" }}
    //   />
    // )}
  );
};

export default FormInput;
