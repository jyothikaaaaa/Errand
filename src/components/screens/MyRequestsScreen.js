import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationService from "../utils/NotificationService";

const MyRequestsScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  // Load all tasks posted by the Requester
  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem("tasks");
    const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
    setTasks(allTasks);
  };

  // Cancel a task if it's still pending
  const cancelTask = async (index) => {
    let updatedTasks = tasks.filter((_, i) => i !== index);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    Alert.alert("Success", "Task canceled successfully.");
  };

  // Confirm a completed task and navigate to rating screen
  const confirmCompletion = async (index) => {
    let updatedTasks = [...tasks];
    updatedTasks[index].status = "Completed";

    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

    NotificationService.sendNotification("Task Confirmed", "The requester has confirmed task completion.");
    Alert.alert("Success", "Task confirmed as completed!");

    // Navigate to Task Rating Screen
    navigation.navigate("TaskRating", { task: updatedTasks[index] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Requests</Text>

      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>No tasks posted yet.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskCategory}>{item.category}</Text>
              <Text>{item.description}</Text>
              <Text>Due: {item.dueDate}</Text>
              <Text>Amount: ${item.amount}</Text>
              <Text>Status: {item.status}</Text>

              {item.status === "Pending" && (
                <TouchableOpacity style={styles.cancelButton} onPress={() => cancelTask(index)}>
                  <Text style={styles.cancelText}>Cancel Task</Text>
                </TouchableOpacity>
              )}

              {item.status === "Completed (Pending Confirmation)" && (
                <TouchableOpacity style={styles.confirmButton} onPress={() => confirmCompletion(index)}>
                  <Text style={styles.confirmText}>Confirm Completion</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}
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
    marginBottom: 10,
    textAlign: "center",
  },
  noTasks: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  taskCategory: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cancelButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#dc3545",
    borderRadius: 5,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
  confirmButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MyRequestsScreen;