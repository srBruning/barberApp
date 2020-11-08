import React, {useState, useEffect} from 'react'; 
import { Platform, RefreshControl } from 'react-native'; 
import { request, PERMISSIONS } from 'react-native-permissions'
import { useNavigation } from '@react-navigation/native';
import GeoLocation from '@react-native-community/geolocation';
import Api from '../../Api';
import {
    Container, Scroller,
    HeaderArea, HeaderTitle, SearchButton,
    LocationArea, LocationInput, LocationFinder,
    LoadingIcon, ListArea
} from './styles'

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

import BarberItem from '../../components/BarberItem';


export default () => {
    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    
    
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
            GeoLocation.getCurrentPosition( async (info)=>{
                await setCoords(info.coords); 
                getBarbers(info.coords);
            })
        }

    }
    const getBarbers = async (icoords=null)=>{
        setLoading(true);
        setList([]);
        if(!icoords)
            icoords = coords;

        let lat = null;
        let lng = null;
        if(icoords){
            lat = icoords.latitude;
            lng = icoords.longitude;
        }

        let res = await Api.getBarbers(lat, lng, locationText);
        if(res.error ===''){
            setList(res.data);
            if(res.loc)
                setLocationText(res.loc)
        }else{
            alert("Erro: "+res.error)
        }
        setLoading(false);

    }

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    const handlerLocationSearch = ()=>{
        setCoords(null);
        getBarbers();
    }

    useEffect(()=>{
        getBarbers()
    }, []);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl  refreshing={refreshing} onRefresh={onRefresh} />
            }>

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
                        onEndEditing={handlerLocationSearch}
                    />
                    <LocationFinder onPress={handlerLocationFinder}>
                        <MyLocationIcon width='24' height='24' fill='#FFFFFF'/>
                    </LocationFinder>
                </LocationArea>

                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF" />
                }

                <ListArea>
                    {list.map((item, k)=>(
                            <BarberItem key={k} data={item} />
                        )
                    )}
                </ListArea>


            </Scroller>
        </Container>
    );
}