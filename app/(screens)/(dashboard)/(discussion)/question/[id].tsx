import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

interface Message {
  text: string;
  isMine: boolean;
  userName: string;
}

const DiscussionThread = () => {
  const { title } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "You can use Firebase Authentication for implementing auth in React Native.",
      isMine: false,
      userName: "Demo User 1",
    },
    {
      text: "Consider using Redux or Context API for state management.",
      isMine: false,
      userName: "Demo User 2",
    },
    {
      text: "Great suggestions! Thanks!",
      isMine: true,
      userName: "You",
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
        { text: newMessage.trim(), isMine: true, userName: "You" },
      ]);
      setNewMessage("");

      // Optionally, simulate a reply from another user after a delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thank you for your question! I'll look into it.",
            isMine: false,
            userName: "Demo User 1",
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
      <View className="mb-3 flex items-start justify-start rounded-xl bg-white px-4 py-3 align-baseline shadow-lg border border-primary">
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
              item.isMine ? "self-end bg-primary" : "self-start bg-white"
            }`}
          >
            {/* Display User Name for Non-Mine Messages */}
            {!item.isMine && (
              <Text className="mb-1 text-xs text-gray-600">
                {item.userName}
              </Text>
            )}
            <Text
              className={`text-base ${
                item.isMine ? "text-white" : "text-black"
              }`}
            >
              {item.text}
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