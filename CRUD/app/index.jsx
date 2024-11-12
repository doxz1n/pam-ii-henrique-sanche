import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUPny1J7lFfLiiDhiLkYaBGXTndo_ktLQ",
  authDomain: "meuprimeirofirebase-3aee1.firebaseapp.com",
  projectId: "meuprimeirofirebase-3aee1",
  storageBucket: "meuprimeirofirebase-3aee1.firebasestorage.app",
  messagingSenderId: "730116861460",
  appId: "1:730116861460:web:a84db6abb79379a5804101",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [NomeItem, setNomeItem] = useState("");
  const [PrecoItem, setPrecoItem] = useState("");
  const [items, setItems] = useState([]);
  const [itemEditando, setItemEditando] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "itemMercado"));
    const listaItem = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setItems(listaItem);
  };

  const handleAdicionarItem = async () => {
    if (NomeItem.trim() && PrecoItem.trim()) {
      if (itemEditando) {
        await updateDoc(doc(db, "itemMercado", itemEditando.id), {
          nome: NomeItem,
          preco: PrecoItem,
        });
        setItemEditando(null);
      } else {
        await addDoc(collection(db, "itemMercado"), {
          nome: NomeItem,
          preco: PrecoItem,
        });
      }
      setNomeItem("");
      setPrecoItem("");
      fetchItems();
    }
  };

  const handleEditarItem = (item) => {
    setNomeItem(item.nome);
    setPrecoItem(item.preco);
    setItemEditando(item);
  };

  const handleDeletarItem = async (id) => {
    await deleteDoc(doc(db, "itemMercado", id));
    fetchItems();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mercado CRUD</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do item"
        value={NomeItem}
        onChangeText={setNomeItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço do item"
        value={PrecoItem}
        onChangeText={setPrecoItem}
        keyboardType="numeric"
      />
      <Button
        title={itemEditando ? "Atualizar Item" : "Adicionar Item"}
        onPress={handleAdicionarItem}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>
              {item.nome} - R$ {item.preco}
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => handleEditarItem(item)}
                style={styles.botaoEditar}
              >
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeletarItem(item.id)}
                style={styles.botaoDeletar}
              >
                <Text style={styles.textoBotao}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  botaoEditar: {
    marginRight: 10,
    backgroundColor: "#4caf50",
    padding: 5,
    borderRadius: 5,
  },
  botaoDeletar: {
    backgroundColor: "#f44336",
    padding: 5,
    borderRadius: 5,
  },
  textoBotao: {
    color: "#fff",
  },
});
