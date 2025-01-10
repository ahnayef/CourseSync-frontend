import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

type FormInputProps = {
  value: any;
  title: string;
  onChangeFn: Function;
  isPassword?: boolean;
  type?: string;
} & (
  | { type: "select"; selectItems: { label: string; value: any }[] }
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
  const [showTimePicker, setShowTimePicker] = useState(false);

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
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        ) : type === "textarea" ? (
          <TextInput
            value={value}
            onChangeText={(e) => onChangeFn(e)}
            multiline
            numberOfLines={4}
            style={{ textAlignVertical: "top" }}
          />
        ) : type === "time" ? (
          <>
            <TextInput
              value={value && value.toLocaleTimeString()}
              placeholder={`Enter time for ${title}`}
              onPress={() => setShowTimePicker(true)}
            />
            {showTimePicker && (
              <RNDateTimePicker
                value={value && new Date(value)}
                mode="time"
                onChange={(e) => {
                  const formatedTime = new Date(e.nativeEvent.timestamp)
                    .toLocaleTimeString("en-GB", { hour12: false })
                    .padStart(8, "0");

                  console.log(formatedTime);
                  onChangeFn(formatedTime);
                  setShowTimePicker(false);
                }}
              ></RNDateTimePicker>
            )}
          </>
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
