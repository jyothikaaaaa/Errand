import React from "react";
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

const RequestCategoriesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Category</Text>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate("RequestForm", { category })}
        >
          <Text style={styles.buttonText}>{category}</Text>
        </TouchableOpacity>
      ))}
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#007bff",
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default RequestCategoriesScreen;