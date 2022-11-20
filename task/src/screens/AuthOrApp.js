/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { 
    View,
    ActivityIndicator,
    StyleSheet,
    Text
} from 'react-native'

import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import commonStyles from '../commonStyles';


export default class AuthOrApp extends Component {

    async componentDidMount(){
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null

        try {
            userData = JSON.parse(userDataJson)
        } catch (e) {
            
        }

        if(userData && userData.token){
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.navigate('Home', userData)
        }else{
            this.props.navigation.navigate('Auth')
        }
    }

    render(){
        return(
            <LinearGradient colors={["rgba(232,231,242,1)", 'rgba(185,185,210,1)', 'rgba(87,185,205,1)']} style={styles.bg}>
                <View style={styles.container}>
                    <Text style={styles.title}>Saturn</Text>
                    <ActivityIndicator size='large' color='#FFF'/>
                </View> 
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 60,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#000'
    }
})