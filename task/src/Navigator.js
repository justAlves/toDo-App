/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer  } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import TaskList from './screens/TaskList'
import Auth from './screens/Auth';
import commonStyles from './commonStyles';
import Menu from './screens/Menu';
import AuthOrApp from './screens/AuthOrApp';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const menuConfig = {
    labelStyle: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'normal',
        fontSize: 20,
    },
    activeTintColor: '#080',
    headerShown: false,
}

const DrawerNavigator = props => {
    const {email, name} = props.route.params
    return(
        <Drawer.Navigator screenOptions={menuConfig} drawerContent={(props) => <Menu {...props} email={email} name={name}/>}>
            <Drawer.Screen name="Today" options={{ title: 'Hoje' }}>
                {props => <TaskList {...props} daysAhead={0} title='Hoje'/>}
            </Drawer.Screen>
            <Drawer.Screen name="Tomorrow" options={{ title: 'Amanhã' }}>
                {props => <TaskList {...props} daysAhead={1} title='Amanhã'/>}
            </Drawer.Screen>
            <Drawer.Screen name="Week" options={{ title: 'Semana' }}>
                {props => <TaskList {...props} daysAhead={7} title='Semana'/>}
            </Drawer.Screen>
            <Drawer.Screen name="Month" options={{ title: 'Mês' }}>
                {props => <TaskList {...props} daysAhead={30} title='Mês'/>}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='AuthOrApp' component={AuthOrApp}/>
            <Stack.Screen name="Auth" component={Auth}/>
            <Stack.Screen name="Home" component={DrawerNavigator}/>
        </Stack.Navigator>
    )
}

const Navigator = () => {
    return (
        <NavigationContainer>
            <AuthNavigator/>
        </NavigationContainer>
    )
}

export default Navigator