import React, {useEffect, useContext} from 'react'; 
import AsyncStorage from '@react-native-community/async-storage'
import {Container, LoadingIcon} from './styles'
import BarberLogo from '../../assets/barber.svg';
import { useNavigation } from '@react-navigation/native'
import {validaToken} from '../../dao/UserDao' 
import {UserContext} from '../../contexts/UserContext'

export default () => {


    const {dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async  ()=>{

            if( await validaToken(userDispatch)){
                // goto home
                navigation.reset({
                    routes:[{name: 'MainTab'}]
                })
            }else{
                navigation.navigate('SignIn');
            }

        }
        checkToken();
    },[]);

    return (
        <Container>
            <BarberLogo width="100%" height="160" /> 
            <LoadingIcon size='large' color='#FFFFFF' />       
        </Container>
    );
}