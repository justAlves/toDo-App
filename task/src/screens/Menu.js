/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Gravatar } from 'react-native-gravatar'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'
import { CommonActions } from '@react-navigation/native'

export default props => {

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Auth'
                    }
                ]
            })
        )
    }

    return (
        <DrawerContentScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Saturn</Text>
                <View style={styles.info}>
                    <Gravatar style={styles.avatar} options={{
                        email: props.email,
                        secure: true
                    }}/>
                    <View style={styles.userInfo}>
                        <Text style={styles.welcome}>Bem vindo,</Text>
                        <Text style={styles.name}>{props.name}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Icon name='sign-out' size={30} color='#800'/>
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    title: {
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: Platform.OS === 'ios' ? 70 : 30,
        padding: 10,
        //justifyContent: 'center',
        marginLeft: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
        marginTop: Platform.OS === 'ios' ? 30 : 10
    },
    userInfo: {
        margin: 20
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        fontWeight: '700',
    },
    welcome: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20
    },
    info: {
        flexDirection: 'row'
    },
    logoutIcon: {
        marginLeft: 20,
        marginBottom: 10
    }
})