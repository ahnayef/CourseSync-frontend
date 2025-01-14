import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import GlobalContext from "@/context/globalContext";
import createSocket from "@/utils/socket";
import { request } from "@/utils/request";
import { Socket } from "socket.io-client";
import { toast } from "@/utils/toast";
import { Answer, Question } from "@/models/model";

const DiscussionThread = () => {
  const { id } = useLocalSearchParams();
  const { user } = useContext(GlobalContext);

  const [messages, setMessages] = useState<Answer[]>([]);
  const [question, setQuestion] = useState<Question>();
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const getOne = async () => {
      try {
        const res = await request.get(`/discussion/question/${id}`);
        setQuestion(res.data);
      } catch (error: any) {
        toast(error.response?.data || error.message);
      }
    };
    getOne();

    const fetchAnswers = async () => {
      try {
        const res = await request.get(`/discussion/answers/${id}`);
        setMessages(res.data);
      } catch (error: any) {
        toast(error.response?.data || error.message);
      }
    };

    fetchAnswers();

    const newSocket = createSocket();
    setSocket(newSocket);

    newSocket.emit("joinRoom", { question_id: parseInt(id as string, 10) });

    newSocket.on("newAnswer", (answer: Answer) => {
      console.log("New:", answer);
      setMessages((prev) => [...prev, answer]);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id, user.id]);

  const addMessage = () => {
    if (newMessage.trim()) {
      socket?.emit("sendAnswer", {
        content: newMessage.trim(),
        question_id: parseInt(id as string, 10),
        answered_by: user.id,
      });
      setNewMessage("");
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-3">
      {/* Question Heading */}
      <View className="mb-3 flex items-start justify-start rounded-xl border border-primary bg-white px-4 py-3 shadow-lg">
        <Text className="mb-1 text-left text-base font-semibold text-primary">
          {question?.userName}
        </Text>
        <Text className="text-left text-gray-800">
          {question?.content}
        </Text>

        <Text className="mt-2 text-xs text-gray-600">
          {question?.created_at ? new Date(question.created_at).toDateString() : ""}
        </Text>

      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            className={`my-1 max-w-[80%] rounded-xl px-3 py-2 shadow-sm ${
              item.answered_by === user.id
                ? "self-end bg-primary"
                : "self-start bg-white"
            }`}
          >
            {/* Display User Name for Non-Mine Messages */}
            {item.answered_by !== user.id && (
              <Text className="mb-1 text-xs text-gray-600">
                {item.userName}
              </Text>
            )}
            <Text
              className={`text-base ${
                item.answered_by === user.id ? "text-white" : "text-black"
              }`}
            >
              {item.content}
            </Text>
          </View>
        )}
        inverted={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      />

      {/* Input */}
      <View className="mt-3 flex-row items-center">
        <TextInput
          className="mr-2 flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm"
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your reply..."
        />
        <TouchableOpacity
          onPress={addMessage}
          className="rounded-full bg-primary px-4 py-2"
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DiscussionThread;
