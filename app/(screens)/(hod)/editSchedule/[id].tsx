import { View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FormInput from "@/app/components/FormInput/FormInput";
import Cbutton from "@/app/components/Cbutton/Cbutton";
import GlobalContext from "@/context/globalContext";
import { request } from "@/utils/request";
import { toast } from "@/utils/toast";
import { handleNavigate } from "@/utils/navigate";
import { useLocalSearchParams } from "expo-router";

const editSchedule = () => {
  const { user } = useContext(GlobalContext);
  const { id } = useLocalSearchParams();

  const [schedule, setSchedule] = useState<any>({
    session: "",
    day: "",
    start: "",
    end: "",
    course: "",
    room: "",
  });

  const getSchedule = async () => {
    try {
      const res = await request.get(`/schedules/hodGet/${id}`);
      console.log(res.data);
      setSchedule(res.data);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    }
  };

 
  const [courses, setCourses] = useState<any>([]);

  const getCourses = async () => {
    try {
      const res = await request.get("/courses/getAll");
      setCourses(res.data);
    } catch (error: any) {
      toast(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getSchedule();
    getCourses();
  }, []);

  const handleSubmit = async () => {
    if (
      schedule?.session &&
      schedule?.day &&
      schedule?.start &&
      schedule?.end &&
      schedule?.course &&
      schedule?.room
    ) {
      if (schedule?.start > schedule?.end) {
        toast("Start time should be less than end time");
        return;
      }

      try {
        setSchedule({ ...schedule, department: user.department });
        const res = await request.put("/schedules/update", schedule);
        toast(res as any);
        handleNavigate("/schedule");
      } catch (error: any) {
        toast(error.response?.data || error.message);
      }
    } else {
      toast("Please fill all fields");
      return;
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <GestureHandlerRootView className="flex-col items-center justify-center font-notoSB">
          <View className="w-full p-5">
            <FormInput
              value={schedule?.session}
              title="Session"
              onChangeFn={(e: any) => setSchedule({ ...schedule, session: e })}
            />
            <FormInput
              value={schedule?.day}
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
              value={new Date(`1970-01-01T${schedule?.start}`)}
              type="time"
              title="Start"
              onChangeFn={(e: any) => setSchedule({ ...schedule, start: e })}
            />
            <FormInput
              value={new Date(`1970-01-01T${schedule?.end}`)}
              type="time"
              title="End"
              onChangeFn={(e: any) => setSchedule({ ...schedule, end: e })}
            />

            <FormInput
              value={schedule?.course}
              title="Course"
              type="select"
              selectItems={courses.map((course: any) => ({
                label: course.name,
                value: course.id,
              }))}
              onChangeFn={(e: any) => setSchedule({ ...schedule, course: e })}
            />
            <FormInput
              value={schedule?.room}
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
