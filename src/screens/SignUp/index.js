import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {Container, InputArea, 
    CustomButton, CustomButtonText, 
    SingMessageButton, SingMessageButtonText, 
    SingMessageButtonTextBold
} from './styles'
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';
import { useNavigation } from '@react-navigation/native'
import SignInput from '../../components/SignInput'
import Api from '../../Api';
import {UserContext} from '../../contexts/UserContext'
 import {validaUserResponse, validarSingUpData} from '../../dao/UserDao'

export default () => {
    const {dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();
    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleMessagButtonClike = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        })
    }

    const handleSingClike = async() => {
        const msg = validarSingUpData(nameField, emailField,passwordField);
        if(msg){
            alert(nsg);
            return ;
        }

        json = await Api.signUp(nameField, emailField, passwordField);
        if(validaUserResponse(json, userDispatch)){
            // Goto home
            navigation.reset({routes:[{name: 'MainTab'}]})
        }else{ 
            alert("Erro no cadastro!\n"+(json.error? json.error:''));
        }
    }

    return (
        <Container>
            <BarberLogo width="90%" height="20%" /> 

            <InputArea>
                 <SignInput IconSvg={PersonIcon} 
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                 />
                 <SignInput IconSvg={EmailIcon} 
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                 />
                 <SignInput IconSvg={LockIcon} 
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                /> 

                <CustomButton onPress={handleSingClike}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>

            </InputArea>

            <SingMessageButton onPress={handleMessagButtonClike}>
            <SingMessageButtonText>Já possui conta? </SingMessageButtonText>
            <SingMessageButtonTextBold>Faça Login</SingMessageButtonTextBold>
            </SingMessageButton>
                
        </Container>
    );
}