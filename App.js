import { StatusBar } from "expo-status-bar";
import React from "react";
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore/lite";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { StyleSheet, Text, View, Button } from "react-native";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6GOrXwljQSON12zWx5MpCrF8eBqsQYSg",
  authDomain: "tell-me-where-c584f.firebaseapp.com",
  projectId: "tell-me-where-c584f",
  storageBucket: "tell-me-where-c584f.appspot.com",
  messagingSenderId: "951488859835",
  appId: "1:951488859835:web:6a477274aa39aba8e6239e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default function App() {
  const GetData = async () => {
    const restaurantsCol = collection(db, "restaurants");
    const restaurantSnapShot = await getDocs(restaurantsCol);
    const restaurantList = restaurantSnapShot.docs.map((doc) => doc.data());
    // return restaurantList;
    console.log(restaurantList);
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Get Data From Database" onPress={GetData} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
