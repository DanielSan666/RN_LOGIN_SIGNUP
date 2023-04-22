import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Btn1({ bgColor, btnLabel, textColor, Press }) {
  return (
    <TouchableOpacity
  onPress={Press}
  style={{
    backgroundColor: bgColor,
    borderRadius: 100,
    alignItems: "center",
    width: 200,  // Ajustar el ancho a 200
    height: 40,  // Ajustar la altura a 40
    paddingVertical: 5, 
    marginHorizontal:10,
    marginTop:10,
  }}
>
  <Text style={{ color: textColor, fontSize: 20, fontWeight: 'bold' }}>
    {btnLabel}
  </Text>
</TouchableOpacity>

  );
}
