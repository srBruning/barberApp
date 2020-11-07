import React, {useEffect, useContext} from 'react'; 
import AsyncStorage from '@react-native-community/async-storage'
import {Container, LoadingIcon} from './styles'
import BarberLogo from '../../assets/barber.svg';  
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';
export default () => {

 

    return (
        <Container>
            <BarberLogo width="100%" height="160" /> 
            <Text>Favorites</Text>    
        </Container>
    );
}