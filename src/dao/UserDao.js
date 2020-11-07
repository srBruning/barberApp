
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import Api from '../Api'

export const validaUserResponse = async (json, userDispatch)=>{

    if(!json.token)return false;
    // salva o token
    await AsyncStorage.setItem('token', json.token);
    console.log('#.4');
    // seta o avatar no contexto
    if(userDispatch){
        console.log("# Meu Avatar:  "+json.data.avatar)
        userDispatch({
            type: 'setAvatar',
            payload: {
                avatar: json.data.avatar
            }
        });
    }
    const token = await AsyncStorage.getItem('token');
    return true;
}

export const validaToken = async (userDispatch)=>{
    const token = await AsyncStorage.getItem('token'); 
    if(token ){
        json = await Api.checkToken(token);
        return await validaUserResponse(json, userDispatch);
    }
    return false;
}

export const validarSingUpData = (nome, email, senha)=>{
    if(nameField =='') return 'Inform seu nome';
    
    if(emailField =='')return 'Inform seu e-mail';
        
    if(passwordField =='') return 'Inform uma senha valida';

    return false;
}

