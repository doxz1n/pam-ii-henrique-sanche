import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Dados Sensíveis
const firebaseConfig = {
  apiKey: "AIzaSyAUPny1J7lFfLiiDhiLkYaBGXTndo_ktLQ",
  authDomain: "meuprimeirofirebase-3aee1.firebaseapp.com",
  projectId: "meuprimeirofirebase-3aee1",
  storageBucket: "meuprimeirofirebase-3aee1.appspot.com",
  messagingSenderId: "730116861460",
  appId: "1:730116861460:web:a84db6abb79379a5804101",
};

firebase.initializeApp(firebaseConfig);

import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function App() {
  const [nomes, setNomes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const nomesCollection = firebase.firestore().collection("Nomes");
      const snapshot = await nomesCollection.get();

      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setNomes(data);
    };

    fetchData();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Lista de Nomes</Text>
      <FlatList
        data={nomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.Nome} {item.Sobrenome}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
