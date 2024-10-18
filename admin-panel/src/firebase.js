import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyCr5T_8KzwoPWoHH6eUcr6Y9nj8W6-mXoo",
  authDomain: "dussan-d3e25.firebaseapp.com",
  projectId: "dussan-d3e25",
  storageBucket: "dussan-d3e25.appspot.com",
  messagingSenderId: "828164781029",
  appId: "1:828164781029:web:b97a240b9b97ec5ce9b50c",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: "BMiD12pd3P-fhDuw7rKt6xR0CO3TfuPHuOCxsnf_ZrmmxILNGmh8OXHzQg_HKoTLqWY82uyQhl3fitApu35XW6o" })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        return currentToken;
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log("No registration token available. Request permission to generate one.");
        // shows on the UI that permission is required
        return null;
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
      return null;
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
