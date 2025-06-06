import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../views/Home'
import User from '../views/User'
import Appointments from '../views/Appointments'
import Favorites from '../views/Favorites'
import FirstView from '../views/FirstView'
import Login from '../views/Login'
import Register from '../views/Register'
import EditUser from '../views/UserViews/EditUser'
import AppointmentDetail from '../views/AppointmentsViews/AppointmentDetail'
import SpecialtyDoctors from '../views/HomeViews/SpecialtyDoctors'
import ForgotPassword from '../views/ForgotPassword'
import VerifyCode from '../views/VerifyCode'
import ResetPassword from '../views/ResetPassword'
import PrivacyPolicy from '../views/UserViews/PrivacyPolicy'
import ContactUs from '../views/UserViews/ContactUs'
import Rating from '../views/UserViews/Rating'
import Faq from '../views/UserViews/Faq'
import Settings from '../views/UserViews/Settings'
import ChangePassword from '../views/UserViews/ChangePassword'
import BottomNavbar from '../components/BotomNavbar/BottomNavbar'
import AppointmentsSchedule from '../views/AppointmentsViews/AppointmentsSchedule'
import VerifyDeleteCode from '../views/DeleteAccount/VerifyDeleteCode'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={props => <BottomNavbar {...props} />}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Appointments" component={Appointments} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name="User" component={User} />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="FirstView" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="FirstView" component={FirstView} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="EditUser" component={EditUser} />
                <Stack.Screen name="AppointmentDetail" component={AppointmentDetail} />
                <Stack.Screen name="SpecialtyDoctors" component={SpecialtyDoctors} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="VerifyCode" component={VerifyCode} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                <Stack.Screen name="ContactUs" component={ContactUs} />
                <Stack.Screen name="Rating" component={Rating} />
                <Stack.Screen name="Faq" component={Faq} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="AppointmentsSchedule" component={AppointmentsSchedule} />
                <Stack.Screen name="VerifyDeleteCode" component={VerifyDeleteCode} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}