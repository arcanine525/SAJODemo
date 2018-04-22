import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    Alert,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Button, Body, Icon, Label } from 'native-base';
import { firebaseApp } from '../../config/FireBase/FireBaseConfig'


const { HEIGHT, WIDTH } = Dimensions.get("window");

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    static navigationOptions = {
        header: null,
        /*
        tabBarLable: 'Notification',
        tabBarIcon: ({ focused, tintColor }) => { return <Icon name="ios-pin" style={{ color: tintColor }} /> }
        */
    }
    _login(email, password) {
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert(
                    '',
                    'Welcome Back! ' + email,
                    [
                        { text: 'OK', onPress: () => { this._signInAsync() } },
                    ],
                    { cancelable: false }
                )

            }).
            catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                Alert.alert(
                    '',
                    'FAILED ' + errorMessage,

                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
            });
    }
    _signInAsync = async () => {
        await AsyncStorage.setItem('Login', this.state.email);

        this.props.navigation.navigate('App');
    };

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ height: HEIGHT / 3, width: WIDTH, marginTop: 50, padding: 10 }} >
                        <Image
                            resizeMode='contain'
                            style={{ height: 250, width: WIDTH }}
                            source={require('../../assets/img/Logo.png')} />

                        <Body>
                            <Text style={{ fontFamily: 'Luna', fontSize: 31 }}>Sign In</Text>
                        </Body>
                    </View>
                    <Form>
                        <Item floatingLabel>
                            <Label>Your Email</Label>
                            <Input
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                            />

                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                            />
                        </Item>
                    </Form>

                    <Body>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#0644a0',
                                margin: 20,
                                paddingVertical: 15,
                                borderRadius: 40,
                                width: 250
                            }}
                            onPress={() => { this._login(this.state.email, this.state.password) }}
                        >
                            <Text style={{ textAlign: 'center', color: 'white' }}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#d1ecef',
                                paddingVertical: 15,
                                borderRadius: 40,
                                width: 250
                            }}
                            onPress={() => { this.props.navigation.navigate('SignUp') }}
                        >
                            <Text style={{ textAlign: 'center' }}>Sign Up Now</Text>
                        </TouchableOpacity>
                    </Body>
                </Content>

            </Container >

        );
    }
}


