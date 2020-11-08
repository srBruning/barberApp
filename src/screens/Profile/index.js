import React, {useEffect, useContext} from 'react'; 
import AsyncStorage from '@react-native-community/async-storage'
import {Container, LoadingIcon} from './styles'
import BarberLogo from '../../assets/barber.svg';  
import { useNavigation } from '@react-navigation/native';
import {
    Button,
    Text
  } from 'react-native';

import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    const handleLogoutClick = async () => {
        await Api.logout();
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });

    }

    return (
        <Container> 
            <Text>Profile</Text>    
            <Button title="Logout" onPress={handleLogoutClick}/>
        </Container>
    );
}