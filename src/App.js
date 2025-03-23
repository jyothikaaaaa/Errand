import React, { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import NotificationService from "./src/utils/NotificationService";

const App = () => {
  useEffect(() => {
    NotificationService.configure();
  }, []);

  return <AppNavigator />;
};

export default App;