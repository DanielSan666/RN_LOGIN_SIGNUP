import React from "react";
import { View, Text, Image } from "react-native";
import Background from "./Background";
import Btn from "./Btn";
import { darkGreen, green } from "./Constants";

const Home = (props) => {
  return (
    <Background>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginHorizontal: 40, marginVertical: 100 }}>
        <Image
          source={require("../src/assets/img1.png")}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            marginBottom:20
          }}
        />

        <Btn
          bgColor={green}
          textColor="white"
          btnLabel="Login"
          Press={() => props.navigation.navigate("Login")}
        />

        <Btn
          bgColor="white"
          textColor={darkGreen}
          btnLabel="Signup"
          Press={() => props.navigation.navigate("Signup")}
        />
      </View>
    </Background>
  );
};

export default Home;
