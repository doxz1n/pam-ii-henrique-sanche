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
  apiKey: "AIzaSyAUPny1J7lFfLiiDhiLkYaBGXTndo_ktLQ",
  authDomain: "meuprimeirofirebase-3aee1.firebaseapp.com",
  projectId: "meuprimeirofirebase-3aee1",
  storageBucket: "meuprimeirofirebase-3aee1.appspot.com",
  messagingSenderId: "730116861460",
  appId: "1:730116861460:web:a84db6abb79379a5804101"
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

      const data:any = [];
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

  const AlertaBotao = () => {
    Alert.alert('Isso é um alerta', 'Você é uma pessoa maravilhosa!!!', [
      {
        text: 'Fechar',
        onPress: () => console.log('Você fechou!'),
        style: 'cancel',
      },
      {text: 'Okay', onPress: () => console.log("Você tambem está OK!")}
    ]);
  };

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
        label="Alerta!(Somente no celular ou emulador)"
        corFundo='red'
        onPress={AlertaBotao} 
      />
      
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
