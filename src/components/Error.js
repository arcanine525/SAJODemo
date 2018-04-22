import React, { Component } from 'react';
import { View, Button, Image } from 'react-native';

import { Container, Content, Text, Body } from 'native-base';

export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View>
                <Image
                    resizeMode="contain"
                    style={{ height: 256, width: 256 }}
                    source={require('../../assets/img/ic_error.png')} />              
            </View>

        );
    }
}
