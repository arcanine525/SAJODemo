import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Footer, Button, Fab, Card, CardItem, Spinner, List, ListItem, Badge } from 'native-base';
import { material, iOSColors, systemWeights } from 'react-native-typography';
// import Communications from 'react-native-communications';
// import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get("window");

export default class MyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car: '',
            loading: 'true'
        }
    }
    
    componentWillMount() {
        return (
            <Spinner color='red' />
        )
    }

    componentDidMount() {
        const car = this.props.item;
        this.setState({
            car: car,
            loading: 'false'
        })
    }
    _parseCityName(destination) {
        if (destination == 'VT') return 'Vũng Tàu'
        if (destination == 'NT') return 'Nha Trang'
        if (destination == 'CT') return 'Cần Thơ'

    }
    _getCarPicture(uri) {
        let link = ''
        if (uri == null) {
            link = 'https://firebasestorage.googleapis.com/v0/b/sajodemo.appspot.com/o/NoPicAvailable.png?alt=media&token=dcd0a2bf-29f6-47d7-9a97-3b19dea9e343'
        } else link = uri

        return link
    }
    render() {
        if (this.state.loading == 'true') {
            return (
                <Spinner color='red' />
            )
        } else {
            return (
                <Card>
                    <CardItem cardBody>
                        <Body>
                            <ImageBackground
                                resizeMode="stretch"
                                source={{ uri: this._getCarPicture(this.state.car.pic) }}
                                style={{ height: height / 3, width: width, flex: 1 }}>

                                <Badge style={{ backgroundColor: 'white' }}>
                                    <Icon name='ios-man' style={[systemWeights.semibold, material.title]}>
                                        <Text style={[systemWeights.semibold]}> {this.state.car.seat}</Text>
                                    </Icon>
                                </Badge>
                            </ImageBackground>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Content>
                                <Text style={[systemWeights.bold, material.title]}>{this.state.car.name} </Text>
                                <Text style={systemWeights.semibold}>{this.state.car.start} -> {this._parseCityName(this.state.car.destination)}</Text>
                            </Content>
                        </Left>

                        <Right>
                            <CardItem>
                                <Content>
                                    <Text style={[material.headline, styles.red, systemWeights.semibold]}>{this.state.car.price}
                                        <Text style={[systemWeights.bold]}> đ</Text>
                                    </Text>
                                </Content>
                            </CardItem>
                        </Right>
                    </CardItem>

                </Card>

            )
        }
    }
}

const styles = StyleSheet.create({
    red: {
        color: iOSColors.red,
    },
});



