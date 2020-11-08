import React, {useEffect, useContext, useState} from 'react'; 
import {useNavigation, useRoute}  from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import {Container, LoadingIcon} from './styles'
import BarberLogo from '../../assets/barber.svg';  
import Api from '../../Api';
import Swiper from 'react-native-swiper';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';
export default () => {
    const navigation =  useNavigation();
    const route = useRoute();
    const [userInfo, setUserInfo] = useState({
        id: route.params.id, 
        avatar: route.params.avatar, 
        name: route.params.name, 
        stars: route.params.stars
    });
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const getBarberInfo = async () => {
            setLoading(true);
            let json = await Api.getBarber(userInfo.id);
            if(json.error == ''){
                setUserInfo(json.data);
            }else {
                alert("Erro: "+json.error);
            }
            setLoading(false);
        };
        getBarberInfo();

    }, []);

    return (
        <Container>
            <BarberLogo width="100%" height="160" /> 
            <Text>Barbeiro: {userInfo.name}</Text>    
        </Container>
    );
}