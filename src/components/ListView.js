import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text, View, Spinner, Icon, Picker } from 'native-base';
import { Alert, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { firebaseApp } from '../../config/FireBase/FireBaseConfig'

import MyCard from './CardItem'
import ErrorScreen from './Error'

export default class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Cars: [],
            loading: 'true',

        }
    }
    static navigationOptions = {
        //title: 'Details',
        header: null,
        // tabBarLable: 'Home',
        // tabBarIcon: ({ focused, tintColor }) => { return < Icon name="ios-home" style={{ color: tintColor }} /> }
    }
    componentDidMount() {
        const { params } = this.props.navigation.state;

        const seat = params.filter.seat;
        const destination = params.filter.destination;

        this.setState({
            loading: 'true'
        })

        firebaseApp.database().ref('Cars/').on('value', (childSnapshot) => {
            const Cars = [];
            childSnapshot.forEach((data) => {
                if ((data.toJSON().destination == destination) && ((seat == 'all') || (data.toJSON().seat == seat))) {
                    Cars.push({
                        key: data.key,
                        name: data.toJSON().name,
                        review: data.toJSON().review,
                        start: data.toJSON().start,
                        destination: data.toJSON().destination,
                        price: data.toJSON().price,
                        pic: data.toJSON().pic,
                        seat: data.toJSON().seat
                    });
                }
                this.setState({
                    Cars: Cars,
                    loading: 'false'
                });

            });
        });
    }
    render() {
        // queryAll = this.props.queryAll;    
        if (this.state.loading == 'true') {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='red' />
                </View>
            )
        } else {
            if (this.state.Cars.length == 0) {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ErrorScreen />
                        <Text>No Cars match your search</Text>
                    </View>
                )
            }
            return (
                <Content>
                    <FlatList
                        data={this.state.Cars}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('Details', { item: item }) }}
                                >
                                    <MyCard item={item} />
                                </TouchableOpacity>
                            )
                        }}>
                    </FlatList>
                </Content >

            );
        }


    }
}


