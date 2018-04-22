import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Body } from 'native-base';
import { material, iOSColors, systemWeights } from 'react-native-typography';
import { View, Dimensions, Image, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native';

export default class CardListExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //car: '',
            //loading: 'true'
        }
    }

    _parseCityName(destination) {
        if (destination == 'VT') return 'Vũng Tàu'
        if (destination == 'NT') return 'Nha Trang'
        if (destination == 'CT') return 'Cần Thơ'

    }

    render() {
        return (
            <Card>
                {/* <CardItem>
                    <Icon name="ios-car" />
                    <Text>{this.props.item.CarInfo.name}</Text>
                </CardItem> */}

                <CardItem>
                    <Left>
                        <Icon name="ios-car" />
                        <Body>
                            <Text style={[systemWeights.bold, material.title]}>{this.props.item.CarInfo.name} </Text>
                            <Text style={systemWeights.semibold}>To: {this._parseCityName(this.props.item.CarInfo.destination)}</Text>
                        </Body>
                    </Left>

                    <Right>
                        <CardItem>
                            <Content>
                                <Text style={[material.headline, styles.red, systemWeights.semibold]}>{this.props.item.CarInfo.price}
                                    <Text style={[systemWeights.bold]}> đ</Text>
                                </Text>
                            </Content>
                        </CardItem>
                    </Right>
                </CardItem>
            </Card>

        );
    }
}

const styles = StyleSheet.create({
    red: {
        color: iOSColors.red,
    },
});
