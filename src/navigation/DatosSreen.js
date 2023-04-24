import axios from "axios";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useQuery } from "react-query";
import { AuthContext } from "../Context/Context";
import { Picker } from "@react-native-picker/picker";
import { IP_SERVER } from "../Constants";

const DatosSreen = () => {
  const { user } = useContext(AuthContext);
  const [casaSeleccionada, setCasaSeleccionada] = useState({
    value: "none",
  });
  const { isLoading, isError, data } = useQuery({
    queryKey: "casas",
    queryFn: () =>
      axios.get(`${IP_SERVER}/api/casas`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
    refetchInterval: 5000,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 30,
      backgroundColor: "#fff",
    },
    head: { height: 40, backgroundColor: "#f1f8ff" },
    text: { margin: 6, textAlign: "center" },
    containerLista: {
      flex: 1,
      paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    }, // Cambiar de arreglo a objeto
    header: {
      fontSize: 25,
      fontWeight: "bold",
    },
    subHeader: {
      fontSize: 15,
      fontWeight: "bold",
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>Error al cargar la informacion de las casas</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View>
            <Picker
              selectedValue={casaSeleccionada.value}
              style={{ height: 50, width: "80%" }}
              onValueChange={(itemValue) => {
                const casa = data.data.casas.find(
                  (casa) => casa._id === itemValue
                );
                setCasaSeleccionada({ value: itemValue, casa });
              }}
            >
              <Picker.Item label="Seleccione una casa" value="none" />
              {data.data.casas.map((casa) => (
                <Picker.Item
                  label={`${casa.Calle} - ${casa.Colonia}`}
                  value={casa._id}
                  key={casa._id}
                />
              ))}
            </Picker>
          </View>
          {casaSeleccionada.value !== "none" ? (
            <View>
              <Text style={styles.header}>Informacion de la casa</Text>
              <View>
                {Object.keys(casaSeleccionada.casa).map((key) => {
                  if (
                    key === "Habitaciones" ||
                    key === "_id" ||
                    key === "__v"
                  ) {
                    return null;
                  }
                  return (
                    <Text style={styles.item} key={key}>
                      {key}: {casaSeleccionada.casa[key]}
                    </Text>
                  );
                })}
              </View>
              <Text style={styles.header}>Habitaciones</Text>
              <View style={styles.containerLista}>
                {casaSeleccionada.casa.Habitaciones &&
                casaSeleccionada.casa.Habitaciones.length > 0 ? (
                  <View>
                    {casaSeleccionada.casa.Habitaciones.map((habitacion) => (
                      <View key={habitacion._id}>
                        <Text style={styles.subHeader}>
                          {habitacion.Nombre}
                        </Text>
                        {habitacion.Medidas.map((medida) => (
                          <Text style={styles.item} key={medida._id}>
                            {medida.tipo} : {medida.valor}
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>
                ) : (
                  <View>
                    <Text>No hay habitaciones</Text>
                  </View>
                )}
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DatosSreen;
