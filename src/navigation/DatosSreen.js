import { View, Text, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import React, { useEffect, useState } from 'react';
import { getData } from '../API/api';

const DatosSreen = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const datos = await getData();
    setData(datos);
  };

  useEffect(() => {
    loadData();
  }, []);

  const tableHead = ['Distancia'];
  const tableData = data.slice(-3).map((item) => [`${item.sensors.distance} cm`]);


  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6, textAlign: 'center' } // Cambiar de arreglo a objeto
  });
  

  return (
    <View style={styles.container}>
      <Table>
        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
        <Rows data={tableData} textStyle={styles.text}/>
      </Table>
    </View>
  );
};

export default DatosSreen;
