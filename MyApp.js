/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';


import { StackNavigator, SwitchNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import LoginScreen from './src/components/SignIn';
import SignUpScreen from './src/components/SignUp'
import HomeScreen from './src/components/Home'
import UserScreen from './src/components/User'
import AuthLoadingScreen from './src/components/Loading'
import DataScreen from './src/components/DataBase'
import ListSreen from './src/components/ListView'
import DetailsScreen from './src/components/Details'
import HistoryScreen from './src/components/History'
import { MyColor } from './config/Color'

const MyTab = TabNavigator({
    Home: { screen: HomeScreen },
    History: { screen: HistoryScreen },
    //DataScreen: { screen: DataScreen },
    // ListSreen: { screen: ListSreen },
    User: { screen: UserScreen }
},
    {
        tabBarOptions: {
            activeTintColor: MyColor.TabBarActive,
            inactiveTintColor: 'gray',
            style: {
                backgroundColor: MyColor.TabBarColor
            }
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
    }
)

const AuthStack = StackNavigator({
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen }
})

const AppStack = StackNavigator({
    App: { screen: MyTab },
    CarList: { screen: ListSreen },
    Details: { screen: DetailsScreen },
    // Pay: { screen: PayScreen }
})

const MyApp = SwitchNavigator({
    App: AppStack,
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen
},
    {
        initialRouteName: 'AuthLoading'
    }
)

console.disableYellowBox = true
export default MyApp;