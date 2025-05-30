import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../views/Home'
import FirstView from '../views/FirstView'
import Login from '../views/Login'
import Register from '../views/Register'
import User from '../views/User'
import EditUser from '../views/UserViews/EditUser'
import Appointments from '~/views/Appointments'

const Stack = createNativeStackNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="FirstView" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FirstView" component={FirstView} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Appointments" component={Appointments} />
            <Stack.Screen name="EditUser" component={EditUser} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}
