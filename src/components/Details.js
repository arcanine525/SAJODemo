import React, { Component } from 'react';
import { View, Button, Dimensions, Image, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native';

import { Container, Content, Footer, FooterTab, Icon, Text, Card, CardItem, Left, Right, Body, List, ListItem, Fab, Spinner } from 'native-base';
import { material, iOSColors, systemWeights } from 'react-native-typography';
import Communications from 'react-native-communications';

import MyCard from './CardItem'
import { MyBTN } from '../../config/Button'
import { firebaseApp } from '../../config/FireBase/FireBaseConfig'

const { height, width } = Dimensions.get("window");

export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            Car: '',
            //loading: 'true'
        }
    }
    static navigationOptions = {
        //header: null,
        // tabBarLable: 'Car Infomation',
        // tabBarIcon: ({ focused, tintColor }) => { return <Icon name="ios-home" style={{ color: tintColor }} /> }
        title: 'Car Infomation',
    }

    componentDidMount() {
        this._loadUserAsync()
    }

    _loadUserAsync = async () => {
        const userToken = await AsyncStorage.getItem('Login');
        this.setState({
            UserName: userToken,
        })
    };

    _bookCar(Car) {
        firebaseApp.database().ref('Bookings/').push({
            name: this.state.UserName,
            CarInfo: {
                name: Car.name,
                price: Car.price,
                destination: Car.destination
            }
        });

        Alert.alert(
            'Alert',
            'Book Successful',
            [
                { text: 'OK', onPress: () => this.props.navigation.navigate('App', { loading: 'true' }) },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <Container>
                <Content>
                    <MyCard item={params.item} />
                    <Card>
                        <Content>
                            <List>                          
                                <ListItem icon>
                                    <Left>
                                        <Icon name="ios-information-circle-outline" style={{ color: 'blue' }} />
                                    </Left>
                                    <Body>
                                        <Content>
                                            <Text style={[material.body1]}>Giá trên đã bao gồm tiền xe, tiền xăng, tiền lưu trú, phí cầu đường và tiền tài xế.</Text>
                                        </Content>
                                    </Body>
                                </ListItem>

                                <ListItem icon>
                                    <Left>
                                        <Icon name="ios-information-circle-outline" style={{ color: 'blue' }} />
                                    </Left>
                                    <Body>
                                        <Text style={[material.body1]}>Phí thêm thời gian: 50.000 ₫/1h</Text>
                                    </Body>
                                </ListItem>

                                <ListItem icon>
                                    <Left>
                                        <Icon name="ios-information-circle-outline" style={{ color: 'blue' }} />
                                    </Left>
                                    <Body>
                                        <Text style={[material.body1]}>Phí thêm km: 6.000 ₫/1km</Text>
                                    </Body>
                                </ListItem>

                            </List>
                        </Content>
                    </Card>

                    <Fab
                        position="bottomRight"
                        onPress={() => Communications.phonecall('0123456789', true)}
                        style={{ backgroundColor: 'blue' }}
                    >
                        <Icon name="ios-call-outline" />
                    </Fab>
                </Content>

                <TouchableOpacity
                    style={{
                        backgroundColor: MyBTN.backgroundColor,
                        margin: 20,
                        paddingVertical: 15,
                        borderRadius: 40,

                    }}
                    onPress={() => { this._bookCar(params.item) }}
                >
                    <Text style={{ textAlign: 'center', color: 'white' }}>BOOK NOW!</Text>
                </TouchableOpacity>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    red: {
        color: iOSColors.red,
    },
});

