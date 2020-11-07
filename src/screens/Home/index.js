import React, {useState, useEffect, useContext} from 'react'; 
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { request, PERMISSIONS } from 'react-native-permissions'
import { useNavigation } from '@react-navigation/native';
import GeoLocation from '@react-native-community/geolocation';
import Api from '../../Api';
import {
    Container, Scroller,
    HeaderArea, HeaderTitle, SearchButton,
    LocationArea, LocationInput, LocationFinder,
    LoadingIcon
} from './styles'
import BarberLogo from '../../assets/barber.svg';  
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';
  import SearchIcon from '../../assets/search.svg';
  import MyLocationIcon from '../../assets/my_location.svg';


export default () => {
    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    
    
    const handlerLocationFinder = async ()=>{
        setCoords(null);
        let result = await request(
            Platform.OS === 'ios' ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if( result === 'granted'){
            setLoading(true);
            setLocationText('');
            setList([]);
            GeoLocation.getCurrentPosition( (info)=>{
                setCoords(info.coords);
                getBarbers();
            })
        }

    }
    const getBarbers = async ()=>{
        setLoading(true);
        setList([]);

        let res = await Api.getBarbers();
        console.log(res);
        if(res.error ===''){
            setList(res.data);
            if(res.loc)
                setLocationText(res.loc)
        }else{
            alert("Erro: "+res.error)
        }
        setLoading(false);

    }

    useEffect(()=>{
        getBarbers()
    }, []);

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={()=> navigation.navigate('Search')}>
                        <SearchIcon width='26' height='26' fill='#FFFFFF'/>
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=> setLocationText(t)}
                    />
                    <LocationFinder onPress={handlerLocationFinder}>
                        <MyLocationIcon width='24' height='24' fill='#FFFFFF'/>
                    </LocationFinder>
                </LocationArea>

                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
            </Scroller>
        </Container>
    );
}