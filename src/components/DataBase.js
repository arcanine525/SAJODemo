import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base';
import { Alert, TouchableOpacity, Button } from 'react-native';
import { firebaseApp } from '../../config/FireBase/FireBaseConfig'


export default class DataBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            review: '',
            start: '',
            destination: '',
            price: '',
            seat: ''
        }
    }
    
    _addCar(name, review, start, destination, price, seat) {
        this.setState({
            name: '',
            review: '',
            start: '',
            destination: '',
            price: '',
            seat: ''
        });

        firebaseApp.database().ref('Cars/').push({
            name: name,
            review: review,
            start: start,
            destination: destination,
            price: price,
            seat: seat
        });

        Alert.alert(
            'Alert',
            'Car added ' + name,

            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Rewiew</Label>
                            <Input
                                onChangeText={(review) => this.setState({ review })}
                                value={this.state.review}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Start</Label>
                            <Input
                                onChangeText={(start) => this.setState({ start })}
                                value={this.state.start}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Destination</Label>
                            <Input
                                onChangeText={(destination) => this.setState({ destination })}
                                value={this.state.destination}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Price</Label>
                            <Input
                                onChangeText={(price) => this.setState({ price })}
                                value={this.state.price}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Num of Seat</Label>
                            <Input
                                onChangeText={(seat) => this.setState({ seat })}
                                value={this.state.seat}
                            />
                        </Item>
                    </Form>
                    
                    <Button title='Data'
                        onPress={() => { this._addCar(this.state.name, this.state.review, this.state.start, this.state.destination, this.state.price, this.state.seat) }}
                    />

                </Content>
            </Container>
        );
    }
}