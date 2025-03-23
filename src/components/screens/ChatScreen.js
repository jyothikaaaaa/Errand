import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const ChatScreen = () => {
  const route = useRoute();
  const task = route.params?.task;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const storedMessages = await AsyncStorage.getItem(chat_${task.description});
    setMessages(storedMessages ? JSON.parse(storedMessages) : []);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const newChat = [...messages, { sender: "You", text: newMessage }];
    setMessages(newChat);
    setNewMessage("");

    await AsyncStorage.setItem(chat_${task.description}, JSON.stringify(newChat));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat for: {task.description}</Text>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.message, item.sender === "You" ? styles.myMessage : styles.otherMessage]}>
            <Text>{item.sender}: {item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d1e7ff",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  sendText: {
    color: "#fff",
  },
});

export default ChatScreen;