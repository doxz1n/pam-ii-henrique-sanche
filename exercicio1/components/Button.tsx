import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button(props) {
  const buttonStyle = {
    backgroundColor: props.corFundo,
    padding: 10,
    borderRadius: 5,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
      <Text>{props.label}</Text>
    </TouchableOpacity>
  );
}
