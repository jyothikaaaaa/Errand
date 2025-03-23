import PushNotification from "react-native-push-notification";

const NotificationService = {
  configure: () => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("Notification received: ", notification);
      },
      requestPermissions: true,
    });

    PushNotification.createChannel(
      {
        channelId: "task-updates",
        channelName: "Task Updates",
        channelDescription: "Receive updates about your tasks",
        soundName: "default",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(Notification channel created: ${created})
    );
  },

  sendNotification: (title, message) => {
    PushNotification.localNotification({
      channelId: "task-updates",
      title: title,
      message: message,
    });
  },
};

export default NotificationService;