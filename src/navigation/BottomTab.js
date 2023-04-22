import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import DatosSreen from "./DatosSreen";
import SettingScreen from "./SettingScreen";
import RegistroHome from "./RegistroHome";

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Registro"
        component={RegistroHome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Datos"
        component={DatosSreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuracion"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
