/* eslint-disable prettier/prettier */
import { Alert, Platform } from "react-native";

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://192.168.1.112:3000'

function showError(err){
    if(err.response && err.response.data){
        Alert.alert('Ops! Ocorreu um Problema!', err.response.data)
    }else{
        Alert.alert('', 'Ops! Ocorreu um Problema!')
    }
}

function showSucess(msg){
    Alert.alert('Sucesso!', msg)
}

export {server, showError, showSucess}