import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { darkGreen } from '../Constants';
import Btn1 from '../Btn1';
import Background from '../Background';

const RegistroCasa = () => {
  const [calle, setCalle] = useState('');
  const [colonia, setColonia] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [numHabitaciones, setNumHabitaciones] = useState('');

  const handleSubmit = () => {
    // Aquí se puede agregar la lógica para registrar la casa, por ejemplo, enviar los datos al servidor
    const casa = {
      calle,
      colonia,
      codigoPostal,
      numHabitaciones,
    };
    console.log('Registro de casa', casa);
  };
  
  return (
    <Background>
      <View style={{ alignItems: "center", width: 400 }}>
        <Text
          style={{
            color: "green",
            fontSize: 50,
          }}
        ></Text>
        <View style={styles.container}>
          <Text style={styles.title}>Registro de Casa</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setCalle(text)}
            value={calle}
            placeholder="Calle"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setColonia(text)}
            value={colonia}
            placeholder="Colonia"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setCodigoPostal(text)}
            value={codigoPostal}
            keyboardType="numeric"
            placeholder="Código postal"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setNumHabitaciones(text)}
            value={numHabitaciones}
            keyboardType="numeric"
            placeholder="Número de habitaciones"
          />
          <TouchableOpacity>
            <Btn1
              textColor="white"
              bgColor={darkGreen}
              btnLabel="Registrar Casa"
              Press={handleSubmit}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    marginVertical: 10,
    paddingHorizontal: 30,
    width: '80%',
  },
});
  
export default RegistroCasa;
