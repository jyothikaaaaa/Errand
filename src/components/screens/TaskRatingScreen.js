import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const TaskRatingScreen = ({ navigation }) => {
  const route = useRoute();
  const { task } = route.params;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    loadPreviousRating();
  }, []);

  // Load any previous rating if exists
  const loadPreviousRating = async () => {
    const storedRatings = await AsyncStorage.getItem("taskRatings");
    const ratings = storedRatings ? JSON.parse(storedRatings) : [];
    const existingRating = ratings.find((r) => r.taskDescription === task.description);
    if (existingRating) {
      setRating(existingRating.rating);
      setReview(existingRating.review);
    }
  };

  // Save the rating & review
  const submitRating = async () => {
    if (rating === 0) {
      Alert.alert("Error", "Please provide a rating.");
      return;
    }

    const newRating = { taskDescription: task.description, rating, review };
    const storedRatings = await AsyncStorage.getItem("taskRatings");
    const ratings = storedRatings ? JSON.parse(storedRatings) : [];

    const updatedRatings = [...ratings.filter((r) => r.taskDescription !== task.description), newRating];

    await AsyncStorage.setItem("taskRatings", JSON.stringify(updatedRatings));
    Alert.alert("Success", "Your rating has been submitted!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate & Review</Text>
      <Text style={styles.label}>Rate the Task:</Text>

      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={[styles.star, rating >= star && styles.selectedStar]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Write a Review:</Text>
      <TextInput
        style={styles.input}
        placeholder="Share your experience..."
        value={review}
        onChangeText={setReview}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
        <Text style={styles.submitText}>Submit</Text>
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
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  star: {
    fontSize: 30,
    color: "#ccc",
    marginHorizontal: 5,
  },
  selectedStar: {
    color: "#FFD700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#fff",
    minHeight: 80,
  },
  submitButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TaskRatingScreen;