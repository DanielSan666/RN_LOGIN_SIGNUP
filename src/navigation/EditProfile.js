import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import Background from "../Background";
import { darkGreen } from "../Constants";
import Field from "../Field";
import Btn from "../Btn";
import { AuthContext } from "../Context/Context";
import { dataUser, updateUser } from "../API/api";

const EditProfile = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  // Función para validar que los campos de nombre, email y contraseña no estén vacíos

  const [userData, setUserData] = useState({});
  const loaduserdata = async () => {
    const id = user.id;
    const usuario = await dataUser(id);
    setUserData(usuario);
  };

  useEffect(() => {
    loaduserdata();
  }, []);

  const handleChange = (name, value) =>
    setUserData({ ...userData, [name]: value });

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    const id = user.id;
    const Updated = await updateUser(id, userData);

    if (Updated) {
      Alert.alert("Datos actualizados correctamente", ":D", [
        {
          text: "Ok",
        },
      ]);
      navigation.navigate("BottomTab");
    }
  };
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <Background>
      <View style={{ alignItems: "center", width: 400 }}>
        <Text
          style={{
            color: "green",
            fontSize: 50,
            fontWeight: "bold",
            marginVertical: 40,
          }}
        >
          Edit Profile
        </Text>

        <Text style={{ fontSize: 30, color: darkGreen, fontWeight: "bold" }}>
          Actualiza tu perfil
        </Text>
        <Field
          placeholder="Nombre"
          onChangeText={(text) => handleChange("Nombre", text)}
          value={userData.Nombre}
        />
        <Field
          placeholder="Apellido "
          onChangeText={(text) => handleChange("Apellido", text)}
          value={userData.Apellido}
        />
        <Field
          placeholder="Email / Username"
          keyboardType={"email-address"}
          onChangeText={(text) => handleChange("Email", text)}
          value={userData.Email}
        />
        <Field
          placeholder="Numero Telefonico"
          keyboardType={"number"}
          onChangeText={(text) => handleChange("Telefono", text)}
          value={userData.Telefono}
        />
        <Btn
          textColor="white"
          bgColor={darkGreen}
          btnLabel="Actualizar"
          Press={handleSubmit}
        />
        <Btn
          textColor={darkGreen}
          bgColor="white"
          btnLabel="Cancelar"
          Press={handleCancel}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});

export default EditProfile;
