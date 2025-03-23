import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const categories = [
  "Home Maintenance",
  "Shopping & Delivery",
  "Vehicle & Transportation",
  "Government Paperwork",
  "Personal Assistance",
  "School & University",
  "Office Affairs",
  "Pet Care",
  "Other",
];

const distances = ["500m", "1km", "2km", "5km", "10km", "25km", "25km+"];

const HelperCategoriesScreen = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDistances, setSelectedDistances] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleDistance = (distance) => {
    setSelectedDistances((prev) =>
      prev.includes(distance) ? prev.filter((d) => d !== distance) : [...prev, distance]
    );
  };

  const proceed = () => {
    navigation.navigate("TaskList", { categories: selectedCategories, distances: selectedDistances });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Work Categories</Text>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, selectedCategories.includes(category) && styles.selected]}
          onPress={() => toggleCategory(category)}
        >
          <Text style={styles.buttonText}>{category}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.title}>Select Your Work Distance</Text>
      {distances.map((distance, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, selectedDistances.includes(distance) && styles.selected]}
          onPress={() => toggleDistance(distance)}
        >
          <Text style={styles.buttonText}>{distance}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.proceedButton} onPress={proceed}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  button: {
    width: "80%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#007bff",
    marginBottom: 8,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  proceedButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#000",
    borderRadius: 10,
  },
});

export default HelperCategoriesScreen;