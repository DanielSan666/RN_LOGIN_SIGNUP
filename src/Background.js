import React from "react";
import { View, ImageBackground } from "react-native";

const Background = ({ children }) => {
  return (
    <View>
      <ImageBackground
        source={require("./assets/leaves.jpg")}
        style={{ height: "100%" }}
      />
      <View style={{ position: "absolute", zIndex: 99 }}>{children}</View>
    </View>
  );
};

export default Background;
