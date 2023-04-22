import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import Background from "./Background";
import { darkGreen } from "./Constants";
import Field from "./Field";
import Btn from "./Btn";
import { AuthContext } from "./Context/Context";
import { useNavigation } from "@react-navigation/native";

const Login = (props) => {

  const [inputs,setInputs] = useState({
    Email:"",
    Password:''
  })

  const navigation = useNavigation()
  // Función para validar que los campos de Email y Password no estén vacíos
  const validateInputs = (Email, Password) => {
    if(!Email || Email.length <= 0) return false;
    if(!Password || Password.length <= 0) return false;
    return true;
  }
 
  const {login} = useContext(AuthContext)
  
  // Función para manejar el envío del formulario
  const handleSubmit = async() => {
    if(!validateInputs(inputs.Email, inputs.Password)) {
      alert("Por favor, ingresa tu correo y contraseña.");
      return;
    }
    if (await login(inputs)) {
      navigation.navigate("BottomTab");
      setInputs({
        Email: "",
        Password: "",
      })
    } else {
      Alert.alert(
        "Usuario y/o contraseña incorrectos",
        "Por favor intentelo nuevamente",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    }
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
          Login
        </Text>
        <View
          style={{
            backgroundColor: "#302E2E",
            height: 700,
            width: 400,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 40, color: darkGreen, fontWeight: "bold" }}>
            Bienvenido
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Inicia tu sesión
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={"email-address"}
            onChangeText={(email)=>setInputs({...inputs, Email: email})}
            value={inputs.Email}
          />
          <Field 
            placeholder="Password" 
            secureTextEntry={true}
            onChangeText={(password)=>setInputs({...inputs, Password: password})}
            value={inputs.Password}
          />
          <View
            style={{
              alignItems: "flex-end",
              width: "78%",
              paddingRight: 16,
              marginBottom: 200,
            }}
          >
            <Text
              style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
            >
              Olvidaste tu contraseña?
           

            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Login"
            Press={handleSubmit}
          />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center"}}>

            <Text style={{fontSize: 16, fontWeight:"bold", color:"white"}}>No tienes una cuenta?</Text>

            <TouchableOpacity onPress={() =>props.navigation.navigate("Signup") }>
              
            <Text  style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});

export default Login;
