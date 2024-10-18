// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCr5T_8KzwoPWoHH6eUcr6Y9nj8W6-mXoo",
  authDomain: "dussan-d3e25.firebaseapp.com",
  projectId: "dussan-d3e25",
  storageBucket: "dussan-d3e25.appspot.com",
  messagingSenderId: "828164781029",
  appId: "1:828164781029:web:b97a240b9b97ec5ce9b50c",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
