import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import {Container, InputArea, 
    CustomButton, CustomButtonText, 
    SignMessageButton, SignMessageButtonText, 
    SignMessageButtonTextBold
} from './styles'
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import SignInput from '../../components/SignInput'
import Api from '../../Api';
import {UserContext} from '../../contexts/UserContext'
import {validaUserResponse} from '../../dao/UserDao'

export default () => {
    const {dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleMessagButtonClike = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        })
    }

    const handleSingClike = async () => {
        if(emailField != '' && passwordField != ''){
            json = await Api.signIn(emailField, passwordField);
            if(validaUserResponse(json, userDispatch)){
                // Goto home
                navigation.reset({routes:[{name: 'MainTab'}]})
            }else{
                alert("E-mail e/ou senha invalidos")
            }
        }else{
            alert("Informe email e senha!")
        }
    }

    return (
        <Container>
            <BarberLogo width="90%" height="20%" /> 

            <InputArea>
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
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>

            </InputArea>

            <SignMessageButton onPress={handleMessagButtonClike}>
            <SignMessageButtonText>Ainda não possui conta? </SignMessageButtonText>
            <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
                
        </Container>
    );
}