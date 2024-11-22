import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { addPeopleIcon, peopleIcon, removeIcon, trashIcon } from "@/constants/icons";
import GlobalContext from "@/context/globalContext";

const CoursePeople = ({ peoples }: any) => {
  const { user } = useContext(GlobalContext);

  const instructor = {
    name: "Dr. John Doe",
  };

  const students = [
    {
      id: 1,
      name: "Student 1",
    },
    {
      id: 2,
      name: "Student 2",
    },
    {
      id: 3,
      name: "Student 3",
    },
    {
      id: 4,
      name: "Student 4",
    },
    {
      id: 5,
      name: "Student 5",
    },
  ];

  const renderPeople = ({ item }: any) => {
    return (
      <View className="m-4 flex w-full flex-row items-center justify-between py-2 align-middle">
        <View className="inline-flex flex-row items-center justify-between gap-2 align-middle">
          <View className="h-7 w-7 rounded-full bg-white">
            <Image source={peopleIcon} className="h-full w-full" />
          </View>

          <Text className="">{item?.name}</Text>
        </View>

        <Image source={removeIcon} className="h-5 w-5 rounded-full" />
      </View>
    );
  };

  return (
    <GestureHandlerRootView className="flex h-full w-full flex-col items-center justify-center py-5 align-middle">
      <View className="flex w-full flex-col justify-start px-3 text-center text-primary">
        <Text className="border-b-2 border-primary py-2 text-2xl font-bold text-primary">
          Instructor
        </Text>
        <View className="flex-col items-center justify-center">
          {renderPeople({ item: instructor })}
        </View>
      </View>

      <FlatList
        className="flex w-full mt-10 px-3 text-center"
        data={students}
        ListHeaderComponent={() => (
          <View className="flex w-full flex-row px-3 items-center justify-center align-middle text-center border-b-2 border-primary py-2c">
            {user.role === "teacher" ? (
              <>
                <Text className="w-full text-2xl font-bold text-primary">
                  Students
                </Text>
                <Image source={addPeopleIcon} className="h-6 w-6" />
              </>
            ) : (
              <Text className="w-full text-2xl font-bold text-primary">
                Classmates
              </Text>
            )}
          </View>
        )}
        renderItem={({ item }: any) => (
          <View className="flex-col items-center justify-center" key={item.id}>
            {renderPeople({ item })}
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex w-full flex-col items-center justify-center text-center">
            <Text className="text-red-500">No people yet</Text>
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default CoursePeople;
