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

interface Question {
  id: string;
  content: string;
  asked_by: string;
  created_at: string;
}

interface Answer {
  id: string;
  content: string;
  answered_by: string;
  created_at: string;
  userName: string;
}

const DiscussionThread = () => {
  const { title } = useLocalSearchParams();

  const { user } = useContext(GlobalContext);

  const [messages, setMessages] = useState<Answer[]>([
    {
      id: "1",
      content:
        "You can use Firebase Authentication for implementing auth in React Native.",
      answered_by: "1",
      userName: "Demo User 1",
      created_at: "2021-09-01T12:00:00Z",
    },
    {
      id: "2",
      content: "Consider using Redux or Context API for state management.",
      answered_by: "2",
      userName: "Demo User 2",
      created_at: "2021-09-02T12:00:00Z",
    },
    {
      id: "3",
      content: "Thank you for your question! I'll look into it.",
      answered_by: "1",
      userName: "Demo User 1",
      created_at: "2021-09-03T12:00:00Z",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const dummyUserName = "JohnDoe"; // Dummy user name
  const flatListRef = useRef<FlatList>(null);

  const addMessage = () => {
    if (newMessage.trim()) {
      // Add user's message
      setMessages((prev) => [
        ...prev,
        {
          id: newMessage.length.toString(),
          content: newMessage.trim(),
          answered_by: user.id,
          userName: "You",
          created_at: new Date().toISOString(),
        },
      ]);
      setNewMessage("");

      // Optionally, simulate a reply from another user after a delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: setMessages.length.toString(),
            content: "Thank you for your question! I'll look into it.",
            answered_by: "1",
            userName: "Demo User 1",
            created_at: new Date().toISOString(),
          },
        ]);
      }, 1000);
    }
  };

  // Auto-scroll to the latest message when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View className="flex-1 bg-gray-100 p-3">
      {/* Question Heading */}
      <View className="mb-3 flex items-start justify-start rounded-xl border border-primary bg-white px-4 py-3 align-baseline shadow-lg">
        <Text className="mb-1 text-left text-base font-semibold text-primary">
          {dummyUserName}
        </Text>
        <Text className="text-left text-gray-800">
          {title ||
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur soluta repellendus similique exercitationem, ratione at fuga officia maxime debitis saepe."}
        </Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            className={`my-1 max-w-[80%] rounded-xl px-3 py-2 shadow-sm ${
              item.answered_by == user.id ? "self-end bg-primary" : "self-start bg-white"
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
                item.answered_by == user.id ? "text-white" : "text-black"
              }`}
            >
              {item.content}
            </Text>
          </View>
        )}
        // Ensure the FlatList starts at the bottom
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
