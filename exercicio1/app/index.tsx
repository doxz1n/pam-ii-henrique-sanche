import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Modal,
  ActivityIndicator,
  FlatList,
} from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import ButtonProps from "@/components/Button";

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
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const produtosCollection = firebase.firestore().collection("Produtos");
      const snapshot = await produtosCollection.get();

      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setTimeout(() => {
        setProdutos(data);
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text> Lista de Produtos </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
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
        />
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text>Hello World!</Text>
            <ButtonProps
              corFundo="red"
              label="Fechar"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <ButtonProps
        label="Abrir Modal"
        corFundo="green"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
