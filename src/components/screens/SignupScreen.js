const handleSignup = async () => {
    if (!email || !password) return Alert.alert("Error", "All fields are required");
  
    const user = { email, password };
    await AsyncStorage.setItem("user", JSON.stringify(user));
  
    // Save empty profile data
    const profile = { name: "", email, phone: "", darkMode: false, notificationsEnabled: true };
    await AsyncStorage.setItem("userProfile", JSON.stringify(profile));
  
    Alert.alert("Success", "Account Created!");
    navigation.replace("Login");
  };