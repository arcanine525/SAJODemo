import React, { Component } from 'react';
import { View, Button, Alert, Image, Dimensions, TouchableOpacity } from 'react-native';

import { Container, Content, Footer, FooterTab, Icon, Header, Text, Form, Item, Label, Input, Picker, Title, Body } from 'native-base';
import { MyBTN } from '../../config/Button'
import { material, iOSColors, systemWeights } from 'react-native-typography';
import { MyColor } from '../../config/Color'
const { height, width } = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Cars: [],
      seat: 'all',
      destination: 'None',
    }
  }

  static navigationOptions = {
    header: null,
    tabBarLable: 'Home',
    tabBarIcon: ({ focused, tintColor }) => { return <Icon name="ios-home" style={{ color: tintColor }} /> }
  }

  onSeatChange(value) {
    this.setState({
      seat: value
    });
  }

  onDestinationChange(value) {
    this.setState({
      destination: value
    });
  }
  _findCar() {
    if (this.state.destination == 'None') {
      Alert.alert(
        '',
        'Please Select Your Destination',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: true}
      )
    } else {
      this.props.navigation.navigate('CarList', { filter: { seat: this.state.seat, destination: this.state.destination } })
    }
  }
  render() {
    return (

      <Content>
        <View style={{ alignItems: 'center', width: width, height: height }}>
          <Image
            resizeMode="contain"
            style={{ height: 256, width: 256 }}
            source={require('../../assets/img/ic_logo.png')} />

          <Form>
            <Text style={[material.title]}>Select Your Destination</Text>

            <Picker
              mode="dialog"
              style={{ width: width }}
              itemStyle={[systemWeights.bold, material.title]}
              selectedValue={this.state.destination}
              onValueChange={this.onDestinationChange.bind(this)}
            >
              <Picker.Item label="None" value='None' />
              <Picker.Item label="Vũng Tàu" value='VT' />
              <Picker.Item label="Nha Trang" value='NT' />
              <Picker.Item label="Cần Thơ" value='CT' />

            </Picker>

            <Text style={[material.title]}>Select Number of seat</Text>
            <Picker
              placeholder="Select Number of seat"
              mode="dialog"
              style={{ width: width }}
              itemStyle={[systemWeights.bold, material.title]}
              selectedValue={this.state.seat}
              onValueChange={this.onSeatChange.bind(this)}
            >
              <Picker.Item label="All types" value='all' />
              <Picker.Item label="4 seats" value={4} />
              <Picker.Item label="7 seats" value={7} />
              <Picker.Item label="16 seats" value={16} />
            </Picker>
          </Form>

          <TouchableOpacity
            style={{
              backgroundColor: MyBTN.backgroundColor,
              margin: 20,
              paddingVertical: 15,
              borderRadius: 40,
              width: 250
            }}
            onPress={() => { this._findCar() }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>FIND CAR</Text>
          </TouchableOpacity>
        </View>


      </Content>




    );
  }
}
