import React, { Component } from 'react';
import { View, FlatList, AsyncStorage, TouchableOpacity, Dimensions, Alert } from 'react-native';

import { Container, Content, Button, Icon, Text, Spinner, Left, Body, Thumbnail, Item } from 'native-base';
import { material, iOSColors, systemWeights } from 'react-native-typography';
import { firebaseApp } from '../../config/FireBase/FireBaseConfig'

import Noti from './Notification'
import { MyColor } from '../../config/Color'
const { height, width } = Dimensions.get("window");

export default class HistoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this._loadUserAsync()
        this.state = {
            UserName: '',
            Bookings: [],
            loading: 'true'
        }

    }
    static navigationOptions = {
        header: null,
        tabBarIcon: ({ focused, tintColor }) => { return <Icon name="ios-calendar-outline" style={{ color: tintColor }} /> }
    }

    _loadUserAsync = async () => {
        const userToken = await AsyncStorage.getItem('Login');
        firebaseApp.database().ref('Bookings/').once('value', (childSnapshot) => {
            const newBookings = [];
            childSnapshot.forEach((data) => {
                if (data.toJSON().name == this.state.UserName) {
                    newBookings.push({
                        key: data.key,
                        name: data.toJSON().name,
                        CarInfo: data.toJSON().CarInfo
                    });
                }
                this.setState({
                    Bookings: newBookings,
                    loading: 'false'
                });

            });
        });

        this.setState({
            UserName: userToken,
        })
    };


    componentDidMount() {
        this._loadUserAsync()
        firebaseApp.database().ref('Bookings/').on('value', (childSnapshot) => {
            const newBookings = [];
            childSnapshot.forEach((data) => {
                if (data.toJSON().name == this.state.UserName) {
                    newBookings.push({
                        key: data.key,
                        //name: data.toJSON().name,
                        CarInfo: data.toJSON().CarInfo
                    });
                }

                this.setState({
                    Bookings: newBookings,
                    loading: 'false'
                });

            });
        });
    }

    _dellOne(key) {
        firebaseApp.database().ref('Bookings/' + key).remove()
        if (this.state.Bookings.length == 1) {
            this.setState({
                Bookings: []
            })
        }
    }

    _onItemPress(key) {
        Alert.alert(
            'Alert!',
            'Do you to cancel?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => { this._dellOne(key) } },

            ],
            { cancelable: true }
        )
    }

    render() {
        if (this.state.loading == 'true') {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='red' />
                </View>
            )
        } else {

            if (this.state.Bookings.length == 0) {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>No Bookings</Text>
                    </View>
                )
            }

            return (
                <Content>
                    <Text>Your Bookings: {this.state.Bookings.length}</Text>
           
                    <FlatList
                        data={this.state.Bookings}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => { this._onItemPress(item.key) }}>
                                    <Noti item={item} />
                                </TouchableOpacity>
                            )
                        }}>
                    </FlatList>
                </Content>

            );
        }
    }

}
