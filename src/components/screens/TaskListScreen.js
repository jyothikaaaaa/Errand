import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationService from "../utils/NotificationService";
import { useRoute } from "@react-navigation/native";

const TaskListScreen = ({ navigation }) => {
  const route = useRoute();
  const { categories } = route.params || { categories: [] };
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  // Load tasks from AsyncStorage and filter by selected categories
  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem("tasks");
    let allTasks = storedTasks ? JSON.parse(storedTasks) : [];

    // Filter tasks based on helper's selected categories
    const availableTasks = allTasks.filter(
      (task) => task.status === "Pending" && categories.includes(task.category)
    );
    setTasks(availableTasks);
  };

  // Helper accepts a task
  const acceptTask = async (index) => {
    let updatedTasks = [...tasks];
    updatedTasks[index].status = "Accepted";

    // Update global tasks in AsyncStorage
    const storedTasks = await AsyncStorage.getItem("tasks");
    let allTasks = storedTasks ? JSON.parse(storedTasks) : [];
    allTasks = allTasks.map((task) =>
      task.description === updatedTasks[index].description ? updatedTasks[index] : task
    );

    await AsyncStorage.setItem("tasks", JSON.stringify(allTasks));
    setTasks(updatedTasks);

    NotificationService.sendNotification("Task Accepted", "A helper has accepted a task!");
    Alert.alert("Success", "Task Accepted!");

    // Reload tasks
    loadTasks();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Tasks</Text>

      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>No tasks available in your selected categories.</Text>
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
                <TouchableOpacity style={styles.acceptButton} onPress={() => acceptTask(index)}>
                  <Text style={styles.acceptText}>Accept Task</Text>
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
  acceptButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  acceptText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TaskListScreen;