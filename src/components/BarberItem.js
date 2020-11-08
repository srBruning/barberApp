import React, {useContext} from 'react';
import styled from 'styled-components/native';
import Stars from './Stars' 
import { useNavigation } from '@react-navigation/native'

const Area = styled.TouchableOpacity`
    background-color: #FFF;
    margin-bottom: 20px;  
    border-radius: 20px; 
    padding: 15px;
    flex-direction: row;

`;
const Avatar = styled.Image`
    width: 88px;
    height: 88px
    border-radius: 20px; 
`;
const InfoArea = styled.View`
    margin-left: 20px;  
    justify-content: space-between;
`;
const UserName = styled.Text`
    font-weight: bold;
    font-size: 17px;
`;
const SeeProfileButton = styled.View`
    width: 85px;
    height: 26px
    border: 1px solid #4EADBE
    border-radius: 10px;
    justify-content: center;
    align-items: center;    
`;
const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #268596;
`;

const TabItem = styled.TouchableOpacity`
    width: 70px;
    height: 70px
    font-size: 24px;
    flex: 1;
    justify-content: center;
    align-items: center;    
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #4EADBE;
    margin-top: -20px;   
`;

export default ({data}) => {
    const navigation  = useNavigation();
    const handleClick = () => {
        navigation.navigate('Barber', data);
    };

    return (
        <Area  onPress={handleClick}>
            <Avatar source={{uri: data.avatar}}/>
            <InfoArea>
                <UserName>{data.name}</UserName>

                <Stars  stars={data.stars} showNumber={true}/>

                <SeeProfileButton>
                    <SeeProfileButtonText>Ver Perfil</SeeProfileButtonText>
                </SeeProfileButton>
            </InfoArea>
        </Area>
    );
}