import React, { Component } from 'react';
import { View, AsyncStorage, TouchableOpacity, Image, Dimensions } from 'react-native';

import { Container, Content, Icon, Text } from 'native-base';
import { MyBTN } from '../../config/Button'

const { height, width } = Dimensions.get("window");

export default class UserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: ''
        }
    }
    static navigationOptions = {
        header: null,
        tabBarLable: 'User',
        tabBarIcon: ({ focused, tintColor }) => { return <Icon name="ios-person" style={{ color: tintColor }} /> }
    }

    _loadUserAsync = async () => {
        const userToken = await AsyncStorage.getItem('Login');

        this.setState({
            UserName: userToken
        })

    };
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    componentDidMount() {
        this._loadUserAsync()
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    resizeMode="contain"
                    style={{ height: width / 2, width: width / 2 }}
                    source={require('../../assets/img/ic_user.png')}
                />

                <Text style={{ fontFamily: 'Luna', fontSize: 14 }}>{this.state.UserName}</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: MyBTN.backgroundColor,
                        margin: 20,
                        paddingVertical: 15,
                        borderRadius: 40,
                        width: 250
                    }}
                    onPress={() => { this._signOutAsync() }}
                >
                    <Text style={{ textAlign: 'center', color: 'white' }}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
