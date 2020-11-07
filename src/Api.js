import AsyncStorage from '@react-native-community/async-storage';
import { add } from 'react-native-reanimated';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';

const doPost =  async (body, path) => {
    const reqParam={
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) 
    };
    const req = await fetch(`${BASE_API}${path}`, reqParam);
    const json = await req.json();      
    return json;
}

export default {
    checkToken: async (token) => {     
        return await doPost({token}, '/auth/refresh');
    },
    signIn: async (email, password) => {
        return  await doPost({email, password}, '/auth/login');
    },
    signUp: async (name, email, password) => {
        return await doPost({name, email, password}, '/user');
    },
    getBarbers: async (lat=null, lng=null, address=null) => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();
        return json;
    }

};