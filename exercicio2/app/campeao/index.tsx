import Header from "@/components/Header";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <Text> Você é um campeão</Text>
    </View>
  );
}
