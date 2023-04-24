import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Background from "./Background";
import { IP_SERVER, darkGreen } from "./Constants";
import Field from "./Field";
import Btn from "./Btn";

const Signup = (props) => {
  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
  });

  const validateInputs = (Email, Password) => {
    if (!Email || Email.length <= 0) return false;
    if (!Password || Password.length <= 0) return false;
    return true;
  };

  const handleSubmit = () => {
    if (!validateInputs(inputs.Email, inputs.Password)) {
      alert("Error en los datos ingresados");
      return;
    }

    const url = `${IP_SERVER}/api/users/`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((resp) => {
        if (!resp.ok) {
          alert("Por favor, verifica tus datos.");
          return;
        }
        //Aqui se mandarria a la pagina de inicio
        props.navigation.navigate("BottomTab");
      })
      .catch((err) => alert("Hubo un error en la peticion"));
  };

  return (
    <Background>
      <View style={{ alignItems: "center", width: 400 }}>
        <Text
          style={{
            color: "green",
            fontSize: 50,
            fontWeight: "bold",
            marginTop: 40,
          }}
        >
          Registrate
        </Text>
        <Text
          style={{
            color: "green",
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Create una cuenta
        </Text>
        <View
          style={{
            backgroundColor: "#302E2E",
            height: 700,
            width: 400,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: "center",
          }}
        >
          <Field
            placeholder="Nombre"
            onChangeText={(nombre) => setInputs({ ...inputs, Nombre: nombre })}
            value={inputs.Nombre}
          />
          <Field
            placeholder="Apellido "
            onChangeText={(apellido) =>
              setInputs({ ...inputs, Apellido: apellido })
            }
            value={inputs.Apellido}
          />
          <Field
            placeholder="Email / Username"
            keyboardType={"email-address"}
            onChangeText={(email) => setInputs({ ...inputs, Email: email })}
            value={inputs.Email}
          />
          <Field
            placeholder="Numero Telefonico"
            keyboardType={"number"}
            onChangeText={(telefono) =>
              setInputs({ ...inputs, Telefono: telefono })
            }
            value={inputs.Telefono}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) =>
              setInputs({ ...inputs, Password: password })
            }
            value={inputs.Password}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "78%",
              paddingRight: 16,
            }}
          >
            <Text
              style={{
                color: "grey",
                fontSize: 16,
              }}
            >
              Acepto los{" "}
            </Text>
            <Text
              style={{
                color: darkGreen,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Términos y Condiciones
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "78%",
              paddingRight: 16,
              marginBottom: 100,
            }}
          >
            <Text style={{ color: "grey", fontSize: 16 }}>Y(" ")</Text>
            <Text
              style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
            >
              Política de privacidad
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={handleSubmit}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              Ya tienes una cuenta?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text
                style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});

export default Signup;
