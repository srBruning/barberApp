import React, {useEffect, useContext, useState} from 'react'; 
import {useNavigation, useRoute}  from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import {
    Container,
    Scroller, 

    FakeSwiper,
    SwipeDot,
    SwipeDotActive,
    SwiperItem, 
    SwiperImage,

    PageBody,
    UserInfoArea,
    ServiceArea,
    TestimonialArea,

    UserAvatar, 
    UserInfo, 
    UserInfoName, 
    UserFavButton
} from './styles'
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
import Stars from '../../components/Stars';
import FavoriteIcon from '../../assets/favorite.svg';


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
                console.log(json)
            }else {
                alert("Erro: "+json.error);
            }
            setLoading(false);
        };
        getBarberInfo();

    }, []);

    return (
        <Container>
            <Scroller>
                { userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper
                        style={{height:240}}
                        dot={<SwipeDot/>}
                        activeDot={<SwipeDotActive/>}
                        paginationStyle={{top: 15, right:15, bottom:null, left: null}}
                        autoplay={true}
                    >
                        {userInfo.photos.map((item, k) => (
                            <SwiperItem>
                                <SwiperImage source={{uri:item.url}} resizeModel="cover" />
                            </SwiperItem>
                        ))}
                    </Swiper>
                    :
                    <FakeSwiper></FakeSwiper>
                }

                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri: userInfo.avatar}}/>
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true}/>
                        </UserInfo>
                        <UserFavButton >
                            <FavoriteIcon width="24" height="24" fill="#FF0000" />
                        </UserFavButton>
                    </UserInfoArea>
                    <ServiceArea>

                    </ServiceArea>
                    <TestimonialArea>

                    </TestimonialArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}