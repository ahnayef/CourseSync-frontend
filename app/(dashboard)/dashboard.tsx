import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import notice from "../../assets/icons/notice.png";
import discussion from "../../assets/icons/discussion.png";
import course from "../../assets/icons/course.png";
import schedule from "../../assets/icons/schedule.png"; 

const Dashboard = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <GestureHandlerRootView className="h-screen items-center justify-center align-middle">
          <View className="flex items-center justify-center py-10 text-center align-middle">
            <Text className="text-2xl text-primary">Dashboard</Text>
            <Text className="">CourseSync | Student dashboard</Text>
          </View>

          <View className="flex w-full flex-col items-center justify-center gap-5">
            <TouchableOpacity className="flex  w-2/5 flex-row items-center justify-center p-4  text-center text-xl rounded bg-primary" onPress={()=> alert("Under Construction")}>
              <Image source={notice} className="h-5 w-5" />
              <Text className="text-white ml-2" >Notices</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex  w-2/5 flex-row items-center justify-center p-4  text-center text-xl rounded bg-primary" onPress={()=> alert("Under Construction")}>
              <Image source={discussion} className="h-5 w-5" />
              <Text className="text-white ml-2" >Discussion</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex  w-2/5 flex-row items-center justify-center p-4  text-center text-xl rounded bg-primary" onPress={()=> alert("Under Construction")}>
              <Image source={course} className="h-5 w-5" />
              <Text className="text-white ml-2" >Cources</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex  w-2/5 flex-row items-center justify-center p-4  text-center text-xl rounded bg-primary" onPress={()=> alert("Under Construction")}>
              <Image source={schedule} className="h-5 w-5" />
              <Text className="text-white ml-2" >Schedule</Text>
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
