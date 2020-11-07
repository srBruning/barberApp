import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import UserContextProvider from './src/contexts/UserContext'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
 

const styles = StyleSheet.create({ 
});

export default () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStack/>
      </NavigationContainer>
    </UserContextProvider>
  );
};
