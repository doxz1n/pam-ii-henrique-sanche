import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, Modal, Pressable } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import ButtonProps from "@/components/Button";
import { FlatList } from "react-native-gesture-handler";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(firebaseConfig);

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [produtos, setProdutos] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const produtosCollection = firebase.firestore().collection("Produtos");
      const snapshot = await produtosCollection.get();

      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setProdutos(data);
    };

    fetchData();
  }, []);

  const Press = () => {
    setModalVisible(true);
    console.log("Botão Pressionado");
  };

  return (
    <View style={styles.container}>
      <Text> Lista de Produtos </Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.Nome} - {item.Preço}
            </Text>
          </View>
        )}
      ></FlatList>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal está fechando");
          setModalVisible(!modalVisible);
        }}
      />
      <ButtonProps label="Clique aqui" corFundo="green" onPress={Press} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
