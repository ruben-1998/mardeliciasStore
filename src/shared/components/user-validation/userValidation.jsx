import React from 'react'
import Typography from '../typography'
import { Button } from '../buttons'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { normalize } from '@/shared/helpers'

const UserValidation = () => {
    const {navigate} = useNavigation();

    const navigateToLogInUser = () => {
        navigate('login');
      }
    
      const navigateToSingInUser = () => {
        navigate('createAccount');
      }
  return (
    <View style={{flex:1, justifyContent: 'center',alignItems:'center',paddingHorizontal: 40}}>
    <Typography
      style={{
        fontWeight: '700',
        fontSize: normalize(24),
        marginLeft: normalize(10),
        textAlign: 'center',
        marginBottom: 20
      }}>
      Parece que no estas dentro de Mardelicias
    </Typography>
    <Button onPress={navigateToLogInUser} title="Inicia Sesión" />
    <View style={{height: 20}}/>
    <Button onPress={navigateToSingInUser} title="Crea una cuenta"  />
  </View>
  )
}

export default UserValidation