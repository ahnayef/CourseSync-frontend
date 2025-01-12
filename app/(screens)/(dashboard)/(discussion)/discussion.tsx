import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { handleNavigate } from "@/utils/navigate";
import GlobalContext from "@/context/globalContext";

interface Question {
  id: string;
  content: string;
  asked_by: string;
  userName: string;
  created_at: string;
}

const Discussion = () => {
  const { user } = useContext(GlobalContext);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      content: "How to implement authentication in React Native?",
      asked_by: "1",
      userName: "Demo User 1",
      created_at: "2021-09-01T12:00:00Z",
    },
    {
      id: "2",
      content: "Best practices for state management?",
      asked_by: "2",
      userName: "Demo User 2",
      created_at: "2021-09-02T12:00:00Z",
    },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions((prev) => [
        ...prev,
        {
          id: newQuestion.length.toString() +1,
          content: newQuestion.trim(),
          asked_by: user.id,
          userName: "You",
          created_at: new Date().toISOString(),
        },
      ]);
      setNewQuestion("");

      // Auto-scroll to the latest question
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  // Optional: Auto-scroll when the component mounts to show the latest questions
  useEffect(() => {
    if (flatListRef.current && questions.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <FlatList
        ref={flatListRef}
        data={questions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="w-full text-center">
            <Text className="text-center text-lg font-semibold text-primary">
              Chatroom | {user.session} - {user.department}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="my-3 rounded-lg bg-white px-5 py-4 shadow-lg">
            {/* User Name */}
            <Text className="mb-1 text-xs text-primary">{item.userName}</Text>
            {/* Question Title */}
            <Text className="mb-3 text-base font-semibold text-gray-800">
              {item.content}
            </Text>
            {/* Question Date */}
            <Text className="mb-3 text-xs text-gray-500">
              {new Date(item.created_at).toDateString()}
            </Text>
            {/* Reply Button */}
            <View className="w-full flex-row p-1">
              <TouchableOpacity
                className="flex items-center justify-center rounded-full bg-primary px-4 py-2 text-center"
                onPress={() => handleNavigate(`question/${item.id}`)}
              >
                <Text className="text-sm font-medium text-white">Reply</Text>
              </TouchableOpacity>
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
