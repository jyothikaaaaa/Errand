import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const RequestFormScreen = ({ navigation }) => {
  const route = useRoute();
  const category = route.params?.category || "General";

  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    if (!description || !dueDate || !amount) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const newTask = { category, description, dueDate, amount, status: "Pending" };

    // Get existing tasks from local storage
    const storedTasks = await AsyncStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    // Save updated tasks
    await AsyncStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));

    Alert.alert("Success", "Task posted!");
    navigation.replace("MyRequests"); // Redirect to "My Requests" screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post a Task</Text>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe your errand..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Due Date</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., 5th April 2025, 5:30 PM"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <Text style={styles.label}>Amount ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Task</Text>
      </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  submitButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RequestFormScreen;