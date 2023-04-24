import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Context";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getData } from "../API/api";
import Btn1 from "../Btn1";
import { IP_SERVER, darkGreen } from "../Constants";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const MEDIDAS_HABITACION = [
  {
    displayName: "Primera medida",
    name: "primeraMedida",
    value: "Largo",
  },
  {
    displayName: "Segunda medida",
    name: "segundaMedida",
    value: "Largo",
  },
  {
    displayName: "Tercera medida",
    name: "terceraMedida",
    value: "Largo",
  },
  {
    displayName: "Cuarta medida",
    name: "cuartaMedida",
    value: "Largo",
  },
  {
    displayName: "Medida de altura",
    name: "alturaMedida",
    value: "Alto",
  },
];

const RegistroCasa = () => {
  const [isRegistroHabitacion, setIsRegistroHabitacion] = useState(false);

  return !isRegistroHabitacion ? (
    <RegistroCasaForm updateForm={setIsRegistroHabitacion} />
  ) : (
    <RegistroHabitacionForm updateForm={setIsRegistroHabitacion} />
  );
};

const RegistroCasaForm = ({ updateForm }) => {
  const [calle, setCalle] = useState("");
  const [colonia, setColonia] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [numHabitaciones, setNumHabitaciones] = useState("");
  const { user } = useContext(AuthContext);
  const createCasa = useMutation({
    mutationFn: ({ postData }) => {
      return axios.post(`${IP_SERVER}/api/casas/`, postData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    },
    onSuccess: () => {
      console.log("Registro de habitacion exitoso");
    },
    onError: (data) => {
      console.log(data);
      console.log("Error al registrar habitacion");
    },
  });

  const handleSubmit = () => {
    // Aquí se puede agregar la lógica para registrar la casa, por ejemplo, enviar los datos al servidor
    const casa = {
      Calle: calle,
      Colonia: colonia,
      CodigoPostal: codigoPostal,
      Numero: numHabitaciones,
    };
    createCasa.mutate({ postData: casa });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            paddingHorizontal: "15%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              paddingHorizontal: "15%",
            }}
          >
            <Text style={styles.title}>Registro de Casa</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setCalle(text)}
              value={calle}
              placeholder="Calle"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setColonia(text)}
              value={colonia}
              placeholder="Colonia"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setCodigoPostal(text)}
              value={codigoPostal}
              keyboardType="numeric"
              placeholder="Código postal"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNumHabitaciones(text)}
              value={numHabitaciones}
              keyboardType="numeric"
              placeholder="Número exterior"
            />
            <TouchableOpacity>
              <Btn1
                textColor="white"
                bgColor={darkGreen}
                btnLabel="Registrar Casa"
                Press={handleSubmit}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Btn1
                textColor="white"
                bgColor={darkGreen}
                btnLabel="Registrar habitacion"
                Press={() => updateForm(true)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const RegistroHabitacionForm = ({ updateForm }) => {
  const [medidas, setMedidas] = useState({}); // [{nombre: "Primera medida", valor: 0}, {nombre: "Segunda medida", valor: 0}
  const [nombreHabitacion, setNombreHabitacion] = useState("");
  const [selectedValue, setSelectedValue] = useState("none");
  const { user } = useContext(AuthContext);
  const { isError, isLoading, data } = useQuery(
    "medidas",
    () =>
      axios.get(`${IP_SERVER}/api/casas`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const createHabitacion = useMutation({
    mutationFn: ({ postData, casaId }) => {
      return axios.post(
        `${IP_SERVER}/api/casas/${casaId}/habitacion`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    },
    onSuccess: () => {
      console.log("Registro de habitacion exitoso");
    },
    onError: (data) => {
      console.log(data);
      console.log("Error al registrar habitacion");
    },
  });

  const handleSubmit = () => {
    const arrayMedidas = Object.keys(medidas).map((key) => {
      if (key.includes("altura")) {
        return {
          tipo: "Alto",
          valor: medidas[key],
        };
      }

      return {
        tipo: "Largo",
        valor: medidas[key],
      };
    });

    const objectoMedidas = {
      Nombre: nombreHabitacion,
      Medidas: arrayMedidas,
    };

    createHabitacion.mutate({
      postData: objectoMedidas,
      casaId: selectedValue,
    });
  };

  const getDataFromModule = (name, value) => {
    // Aquí se puede agregar la lógica para obtener los datos de la habitación, por ejemplo, enviar los datos al servidor
    getData()
      .then((data) => {
        setMedidas((prev) => ({
          ...prev,
          [name]: `${data}`,
        }));
      })
      .catch((error) => {
        setMedidas((prev) => ({
          ...prev,
          [name]: "No se pudo leer la informacion",
        }));

        console.log(error);
      });
  };

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (isError) {
    return <Text>Error al cargar las casas</Text>;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Casa</Text>
        <View>
          <View>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Seleccione una medida" value="none" />
              {data.data.casas.map((casa) => (
                <Picker.Item
                  label={`${casa.Calle} - ${casa.Colonia}`}
                  value={casa._id}
                  key={casa._id}
                />
              ))}
            </Picker>
          </View>
        </View>

        {selectedValue !== "none" && (
          <View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: 100,
              }}
            >
              <TextInput
                style={styles.input}
                onChangeText={(text) => setNombreHabitacion(text)}
                value={nombreHabitacion}
                placeholder="Nombre de la habitacion"
              />
            </View>

            {MEDIDAS_HABITACION.map((medida) => (
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: 100,
                  padding: 20,
                }}
                key={medida.name}
              >
                <TextInput
                  style={styles.input}
                  value={medidas[medida.name]}
                  placeholder={medidas[medida.name] || medida.name}
                  editable={false}
                  selectTextOnFocus={false}
                  underlineColorAndroid={"transparent"}
                />
                <TouchableOpacity>
                  <Btn1
                    textColor="white"
                    bgColor={darkGreen}
                    btnLabel="Leer"
                    Press={() => getDataFromModule(medida.name)}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity>
              <Btn1
                textColor="white"
                bgColor={darkGreen}
                btnLabel="Registrar Habitacion"
                Press={handleSubmit}
              />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity>
          <Btn1
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Volver a registro de casa"
            Press={() => updateForm(false)}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollView: {
    marginHorizontal: 20,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 30,
    marginVertical: 10,
    paddingHorizontal: 30,
  },
});

export default RegistroCasa;
