import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Background from "../Background";
import { darkGreen } from "../Constants";
import Field from "../Field";
import Btn from "../Btn";

const ChangePassword = ({ navigation }) => {

  const [inputs,setInputs] = useState({
    currentPassword:"",
    newPassword:"",
    confirmNewPassword:"",
  })

  // Función para validar que los campos de contraseña no estén vacíos
  const validateInputs = (currentPassword, newPassword, confirmNewPassword) => {
    if(!currentPassword || currentPassword.length <= 0) return false;
    if(!newPassword || newPassword.length <= 0) return false;
    if(!confirmNewPassword || confirmNewPassword.length <= 0) return false;
    return true;
  }

  const handleSubmit = () => {
    // Validar los campos de entrada aquí...
  
    // Hacer una solicitud de API para cambiar la contraseña
    fetch('', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentPassword: inputs.currentPassword,
        newPassword: inputs.newPassword
      })
    })
    .then(response => {
      if(response.ok) {
        alert('Contraseña actualizada exitosamente!');
        navigation.goBack();
      } else {
        alert('Error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
      }
    })
    .catch(error => {
      alert('Error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
    });
  }
  const handleCancel = () => {
    navigation.goBack();
  }
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
          Change Password
        </Text>
      
          <Text style={{ fontSize: 30, color: darkGreen, fontWeight: "bold" }}>
            Cambia tu contraseña
          </Text>
          <Field 
            placeholder="Contraseña actual" 
            secureTextEntry={true}
            onChangeText={(currentPassword)=>setInputs({...inputs, currentPassword})}
            value={inputs.currentPassword}
          />
          <Field 
            placeholder="Nueva contraseña" 
            secureTextEntry={true}
            onChangeText={(newPassword)=>setInputs({...inputs, newPassword})}
            value={inputs.newPassword}
          />
          <Field 
            placeholder="Confirmar nueva contraseña" 
            secureTextEntry={true}
            onChangeText={(confirmNewPassword)=>setInputs({...inputs, confirmNewPassword})}
            value={inputs.confirmNewPassword}
          />
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Cambiar contraseña"
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

export default ChangePassword;
