/* eslint-disable prettier/prettier */
import React from 'react'
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Gravatar } from 'react-native-gravatar'
import commonStyles from '../commonStyles'

export default props => {

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
    }
})