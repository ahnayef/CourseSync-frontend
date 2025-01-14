// src/screens/Discussion.tsx
import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { handleNavigate } from "@/utils/navigate";
import GlobalContext from "@/context/globalContext";
import createSocket from "@/utils/socket";
import { request } from "@/utils/request";
import { Socket } from "socket.io-client";
import { toast } from "@/utils/toast";
import { Question } from "@/models/model";

const Discussion = () => {
  const { user } = useContext(GlobalContext);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { session, department } = user;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await request.get(
          `/discussion/questions/${session}/${department}`,
        );
        setQuestions(res.data);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 1000);
      } catch (error: any) {
        toast(error.response?.data || error.message);
      }
    };

    fetchQuestions();

    if (session && department) {
      const newSocket = createSocket();
      setSocket(newSocket);

      newSocket.emit("joinRoom", { session, department });

      newSocket.on("newQuestion", (question: Question) => {
        setQuestions((prev) => [...prev, question]);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      });

      return () => {
        newSocket.disconnect();
      };
    } else {
      toast("Session and Department are required.");
    }
  }, [session, department, user.id]);

  const addQuestion = () => {
    if (newQuestion.trim()) {
      socket?.emit("sendQuestion", {
        content: newQuestion.trim(),
        asked_by: user.id,
        department: user.department,
        session: user.session,
      });
      setNewQuestion("");
    }
  };

  const deleteQuestion = async (id: number) => {
    Alert.alert(
      "Delete Question",
      "Are you sure you want to delete this question?",
      [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
        try {
          await request.delete(`/discussion/question/${id}`);
          setQuestions((prev) => prev.filter((item) => item.id !== id));
        } catch (error: any) {
          toast(error.response?.data || error.message);
        }
        },
      },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <View className="w-full text-center">
        <Text className="text-center text-lg font-semibold text-primary">
          Chatroom | {user.session} - {user.department}
        </Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={questions}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="my-3 rounded-lg bg-white px-5 py-4 shadow-lg">
            {/* User Name */}
            <Text className="mb-1 text-xs text-primary">{item.userName}</Text>
            {/* Question Content */}
            <Text className="mb-3 text-base font-semibold text-gray-800">
              {item.content}
            </Text>
            {/* Question Date */}
            <Text className="mb-3 text-xs text-gray-500">
              {new Date(item.created_at).toDateString()}
            </Text>
            {/* Reply Button */}
            <View className="w-full flex-row gap-2 p-1">
              <TouchableOpacity
                className="flex items-center justify-center rounded-full bg-primary px-4 py-2 text-center"
                onPress={() => handleNavigate(`question/${item.id}`)}
              >
                <Text className="text-sm font-medium text-white">Reply</Text>
              </TouchableOpacity>

              {user.id == item.asked_by && (
                <TouchableOpacity
                  className="flex items-center justify-center rounded-full bg-red-500 px-4 py-2 text-center"
                  onPress={() => deleteQuestion(item.id)}
                >
                  <Text className="text-sm font-medium text-white">Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
      {/* Input Section */}
      <View className="mt-4 flex-row items-center">
        {/* Input for New Question */}
        <TextInput
          className="mr-2 flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm"
          placeholder="Ask a question..."
          value={newQuestion}
          onChangeText={setNewQuestion}
        />
        {/* Send Button */}
        <TouchableOpacity
          onPress={addQuestion}
          className="rounded-full bg-primary px-4 py-2"
        >
          <Text className="text-sm font-medium text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Discussion;
