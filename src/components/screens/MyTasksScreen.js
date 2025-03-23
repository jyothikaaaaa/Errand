import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationService from "../utils/NotificationService";

const MyTasksScreen = () => {
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  // Load only the tasks accepted by the helper
  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem("tasks");
    let allTasks = storedTasks ? JSON.parse(storedTasks) : [];

    // Filter only accepted tasks for this Helper
    const acceptedTasks = allTasks.filter((task) => task.status === "Accepted");
    setMyTasks(acceptedTasks);
  };

  // Mark task as completed
  const markAsCompleted = async (index) => {
    let updatedTasks = [...myTasks];
    updatedTasks[index].status = "Completed (Pending Confirmation)";

    // Update global tasks
    const storedTasks = await AsyncStorage.getItem("tasks");
    let allTasks = storedTasks ? JSON.parse(storedTasks) : [];
    allTasks = allTasks.map((task) =>
      task.description === updatedTasks[index].description ? updatedTasks[index] : task
    );

    await AsyncStorage.setItem("tasks", JSON.stringify(allTasks));
    setMyTasks(updatedTasks);

    NotificationService.sendNotification("Task Completed", "A helper has completed a task. Please confirm.");
    Alert.alert("Success", "Task marked as completed! Waiting for requester's confirmation.");

    // Reload tasks
    loadTasks();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Accepted Tasks</Text>

      {myTasks.length === 0 ? (
        <Text style={styles.noTasks}>No accepted tasks yet.</Text>
      ) : (
        <FlatList
          data={myTasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskCategory}>{item.category}</Text>
              <Text>{item.description}</Text>
              <Text>Due: {item.dueDate}</Text>
              <Text>Amount: ${item.amount}</Text>
              <Text>Status: {item.status}</Text>

              {item.status === "Accepted" && (
                <TouchableOpacity style={styles.completeButton} onPress={() => markAsCompleted(index)}>
                  <Text style={styles.completeText}>Mark as Completed</Text>
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
  completeButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#28a745",
    borderRadius: 5,
    alignItems: "center",
  },
  completeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MyTasksScreen;