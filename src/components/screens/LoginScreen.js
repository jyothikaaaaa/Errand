import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (!storedUser) return Alert.alert("Error", "User not found");

    const user = JSON.parse(storedUser);
    if (user.email === email && user.password === password) {
      Alert.alert("Success", "Login Successful");
      navigation.replace("RoleSelection");
    } else {
      Alert.alert("Error", "Invalid Credentials");
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text>Email:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={{ padding: 10, backgroundColor: "blue" }}>
        <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={{ textAlign: "center", marginTop: 10 }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;