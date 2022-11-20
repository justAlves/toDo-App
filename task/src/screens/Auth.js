/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import commonStyles from "../commonStyles";
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from '../../assets/imgs/icon.png'
import AuthInput from '../components/AuthInput'
import { server, showError, showSucess } from "../common";
import { CommonActions } from "@react-navigation/native";


const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false,
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    signinOrSignout = () => {
        if(this.state.stageNew){
            this.signup()
        }else{
            this.signin()
        }
    } 

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })
            showSucess('Sucesso!')
            this.setState({ ...initialState })
        } catch (e) {
            showError(e)
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            //this.props.navigation.navigate('Home', res.data)
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Home',
                            params: res.data,
                        },
                    ],
                })
            )
        } catch (e) {
            showError(e)
        }
    }

    render(){

        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 8)

        if(this.state.stageNew){
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validations.reduce((t, a) => t && a)

        return(
            <LinearGradient colors={["rgba(232,231,242,1)", 'rgba(185,185,210,1)', 'rgba(87,185,205,1)']} style={styles.bg}>
                <View style={styles.form}>
                    <Image source={Icon} style={styles.icon}/>
                    <Text style={styles.title}>Saturn</Text>
                    <Text style={styles.subtitle}>{this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}</Text>
                    {this.state.stageNew && <AuthInput icon='user' placeholder="Informe o seu Nome..." placeholderTextColor={'#999'} value={this.state.name} style={styles.input} onChangeText={name => this.setState({name})}/>}
                    <AuthInput icon='at' placeholder="Informe o E-Mail..." placeholderTextColor={'#999'} value={this.state.email} style={styles.input} onChangeText={email => this.setState({email})}/>
                    <AuthInput icon='lock' placeholder="Informe a Senha..." placeholderTextColor={'#999'} value={this.state.password} style={styles.input} onChangeText={password => this.setState({ password  })} secureTextEntry={true}/>
                    {this.state.stageNew && <AuthInput icon='lock' placeholder="Confirme a Senha..." placeholderTextColor={'#999'} value={this.state.confirmPassword} style={styles.input} onChangeText={confirmPassword => this.setState({ confirmPassword  })} secureTextEntry={true}/>}
                    <TouchableOpacity style={{padding: 10}} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                        <Text>{this.state.stageNew ? 'Já possui uma conta? Entre agora!' : 'Não possui um conta? Crie uma!' }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!validForm} onPress={this.signinOrSignout}>
                        <View style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar-se' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
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
        color: commonStyles.colors.mainText,
        fontSize: 60,
        marginBottom: 10,
    },
    input: {
        marginTop: 15,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderColor: '#222',
        borderWidth: 0.2,
        borderRadius: 45,
        color: '#000',
        //padding: Platform.OS === 'ios' ? 10 : 15,
        width: 240,
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        padding: 20,
        width: '75%',
        borderRadius: 10,
        alignItems: 'center'
    },
    icon: {
        width: 50,
        height: 50,
        //marginLeft: 100
    },
    button: {
        backgroundColor: '#3B656B',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 45,
        width: 240
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 20,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    }
})