import { View, Text } from "react-native";
import React from "react";
import Background from "../Background";

const HomeScreen = () => {
  return (
    <Background>
      <View style={{ alignItems: "center", width: 400 }}>
        <Text
          style={{
            color: "black",
            fontSize: 20,
            fontWeight: "bold",
            marginVertical: 40,
            marginLeft:14,
            
          }}>
          <Text style={{ fontSize: 20,   fontStyle:"italic",  fontWeight: "bold" }}>
            ¡Bienvenido/a a nuestra app! Esperamos que disfrutes de todas las
            características y funciones que hemos diseñado para hacerte la vida
            más fácil. Si necesitas ayuda, estamos aquí para asistirte.
            ¡Disfruta la experiencia!
          </Text>
        </Text>
      </View>
    </Background>
  );
};

export default HomeScreen;
