import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import { handleNavigate } from "@/utils/navigate";

interface Question {
  id: string;
  title: string;
  userName: string;
}

const Discussion = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      title: "How to implement authentication in React Native?",
      userName: "Demo User 1",
    },
    {
      id: "2",
      title: "Best practices for state management?",
      userName: "Demo User 2",
    },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          title: newQuestion.trim(),
          userName: "You",
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
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg px-5 py-4 my-3 shadow-lg">
            {/* User Name */}
            <Text className="text-xs text-primary mb-1">{item.userName}</Text>
            {/* Question Title */}
            <Text className="text-base font-semibold text-gray-800 mb-3">
              {item.title}
            </Text>
            {/* Reply Button */}
            <View className="flex-row w-full p-1">
              <TouchableOpacity
                className="bg-primary px-4 py-2 rounded-full text-center flex items-center justify-center"
                onPress={() => handleNavigate(`question/${item.id}`)}
              >
                <Text className="text-white text-sm font-medium">Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* Input Section */}
      <View className="flex-row items-center mt-4">
        {/* Input for New Question */}
        <TextInput
          className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 mr-2 text-sm"
          placeholder="Ask a question..."
          value={newQuestion}
          onChangeText={setNewQuestion}
        />
        {/* Send Button */}
        <TouchableOpacity
          onPress={addQuestion}
          className="bg-primary rounded-full px-4 py-2"
        >
          <Text className="text-white text-sm font-medium">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Discussion;