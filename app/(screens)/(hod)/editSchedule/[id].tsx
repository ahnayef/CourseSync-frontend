import { View, Text, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FormInput from "@/app/components/FormInput/FormInput";
import Cbutton from "@/app/components/Cbutton/Cbutton";
import GlobalContext from "@/context/globalContext";
import { useLocalSearchParams } from "expo-router";

const editSchedule = () => {
  const { user } = useContext(GlobalContext);

  const { id } = useLocalSearchParams();

  const [schedule, setSchedule] = useState({
    day: "",
    from: new Date(1736498040000),
    to: new Date(1736498040000),
    course: "",
    instructor: "",
    room: "",
    department: "",
  });

  const instructors = [
    {
      id: 1,
      name: "Muthmainna Mou",
    },
    {
      id: 2,
      name: "Dr Arif Ahmad",
    },
    {
      id: 3,
      name: "K. M. Asifuzzaman",
    },
  ];

  const courses = [
    {
      id: 1,
      name: "Operating System",
    },
    {
      id: 2,
      name: "Theory Of Computation",
    },
    {
      id: 3,
      name: "Operating System Lab",
    },
  ];

  const handleSubmit = () => {
    setSchedule({ ...schedule, department: user.department });
    console.log(schedule);
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <GestureHandlerRootView className="flex-col items-center justify-center font-notoSB">
          <View className="w-full p-5">
            <FormInput
              value={schedule.day}
              title="Day"
              type="select"
              selectItems={[
                { label: "Sunday", value: "Sunday" },
                { label: "Monday", value: "Monday" },
                { label: "Tuesday", value: "Tuesday" },
                { label: "Wednesday", value: "Wednesday" },
                { label: "Thursday", value: "Thursday" },
              ]}
              onChangeFn={(e: any) => setSchedule({ ...schedule, day: e })}
            />

            <FormInput
              value={schedule.from as any}
              type="time"
              title="From"
              onChangeFn={(e: any) => setSchedule({ ...schedule, from: e })}
            />
            <FormInput
              value={schedule.to}
              type="time"
              title="To"
              onChangeFn={(e: any) => setSchedule({ ...schedule, to: e })}
            />

            <FormInput
              value={schedule.course}
              title="Course"
              type="select"
              selectItems={courses.map((course: any) => ({
                label: course.name,
                value: course.id,
              }))}
              onChangeFn={(e: any) => setSchedule({ ...schedule, course: e })}
            />

            <FormInput
              value={schedule.instructor}
              type="select"
              selectItems={instructors.map((instructor: any) => ({
                label: instructor.name,
                value: instructor.id,
              }))}
              title="Instructor"
              onChangeFn={(e: any) =>
                setSchedule({ ...schedule, instructor: e })
              }
            />

            <FormInput
              value={schedule.room}
              title="Room"
              onChangeFn={(e: any) => setSchedule({ ...schedule, room: e })}
            />

            <Cbutton title="Save" onclickFn={() => handleSubmit()} />
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default editSchedule;
