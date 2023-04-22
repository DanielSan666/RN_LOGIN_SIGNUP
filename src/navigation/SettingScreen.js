import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Background from '../Background'

const SettingScreen = () => {
  const navigation = useNavigation()

  const handleEditProfilePress = () => {
    navigation.navigate('EditProfile')
  }

  const handleChangePasswordPress = () => {
    navigation.navigate('ChangePassword')
  }

  const handleLogoutPress = () => {
    // Aquí iría el código para eliminar la sesión del usuario
    // ...

    // Redirigir al usuario a la pantalla de inicio de sesión
    navigation.navigate('Home')
  }

  return (
    <Background>
    <View style={{ alignItems: "center", width: 400 }}>
        <Text
          style={{fontSize: 50}}></Text>
          
      <Button title="Editar perfil" onPress={handleEditProfilePress} style={{
          borderRadius: 100,
          alignItems: "center",
          width: 200,  // Ajustar el ancho a 200
          height: 40,  // Ajustar la altura a 40
          paddingVertical: 5, 
          marginHorizontal:10,
          marginTop:10}}/>

      <Button title="Cambiar contraseña" onPress={handleChangePasswordPress} style={{
           borderRadius: 100,
           alignItems: "center",
           width: 200,  // Ajustar el ancho a 200
           height: 40,  // Ajustar la altura a 40
           paddingVertical: 5, 
           marginHorizontal:10,
           marginTop:10
        }}/>
      <Button title="Cerrar sesión" onPress={handleLogoutPress} style={{
           borderRadius: 100,
           alignItems: "center",
           width: 200,  // Ajustar el ancho a 200
           height: 40,  // Ajustar la altura a 40
           paddingVertical: 5, 
           marginHorizontal:10,
           marginTop:10
        }} />
    </View>
    </Background>
  )
}

export default SettingScreen

