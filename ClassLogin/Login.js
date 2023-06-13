import { StyleSheet, View, Image, TouchableOpacity, Alert, Text, TextInput, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import background from '../assets/background.png'
import User from '../assets/user.png'
import Lock from '../assets/lock.png'

var api_url = 'http://10.24.6.31:3000/api/user/login';

export default class Login extends Component {
    state = {
        Username: '',
        Password: ''
    }

    render() {
        const { navigation } = this.props

        const login = () => {
            if (this.state.Username == '' || this.state.Password == '') {
                Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin')
                return
            }
            let obj = { username: this.state.Username, password: this.state.Password };
            fetch(api_url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            })
                .then((res) => { return res.json(); })
                .then((data_json) => {
                    if (typeof (data_json.token) != 'undefined') {
                        // Lưu thông tin
                        if (data_json.user.role != 'admin') {
                            Alert.alert('Thông báo', 'Đăng nhập thành công')
                            AsyncStorage.setItem('token', data_json.token)
                            navigation.navigate('Home', { screen: 'Product' })
                        } else {
                            Alert.alert('Thông báo', 'Chỉ đăng nhập với vai trò user')
                        }
                    } else {
                        Alert.alert('Thông báo', 'Sai thông tin đăng nhập')
                    }
                })
        }

        const reg = () => {
            navigation.navigate('Reg')
        }

        return (
            <ImageBackground onLayout={this.getList} source={background} style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.box}>
                    <View style={styles.textInputNgoai}>
                        <Image style={styles.image} source={User} />
                        <TextInput style={styles.textInputTrong} onChangeText={(content) => { this.setState({ Username: content }) }} placeholder='Nhập Username'>{this.state.Username}</TextInput>
                    </View>
                    <View style={styles.textInputNgoai}>
                        <Image style={styles.image} source={Lock} />
                        <TextInput style={styles.textInputTrong} onChangeText={(content) => { this.setState({ Password: content }) }} secureTextEntry placeholder='Nhập Password'>{this.state.Password}</TextInput>
                    </View>
                    <TouchableOpacity onPress={login} style={styles.button1}>
                        <Text style={styles.text1}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={reg} style={styles.button2}>
                    <Text style={styles.text2}>
                        Register
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 70,
        marginTop: '20%',
        fontWeight: 'bold',
        color: 'white'
    },
    box: {
        width: 300,
        height: 300,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#00CCFF',
        marginTop: '15%',
        backgroundColor: '#F8F8FF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputNgoai: {
        width: 250,
        flexDirection: 'row',
        marginBottom: '10%',
        borderBottomWidth: 1,
        borderBottomColor: '#9999FF',
        alignItems: 'center',
    },
    textInputTrong: {
        padding: 20
    },
    text1: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button1: {
        width: 100,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#33FFCC',
        backgroundColor: '#6699FF',
        justifyContent: 'center'
    },
    text2: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button2: {
        width: 150,
        height: 70,
        marginTop: '20%',
        marginLeft: '50%',
        backgroundColor: '#FFCCCC',
        justifyContent: 'center',
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 40
    }
})