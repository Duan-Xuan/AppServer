import { Text, StyleSheet, View, Alert, ScrollView, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import background from '../assets/background.png'
import User from '../assets/user.png'
import Email from '../assets/email.png'
import Lock from '../assets/lock.png'
import Back from '../assets/back.png'

var api_url = 'http://10.24.6.31:3000/api/user/reg';
var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export default class Reg extends Component {
    state = {
        Username: '',
        Email: '',
        Password: '',
        Password2: ''
    }

    render() {
        const { navigation } = this.props

        const reg = () => {
            if (this.state.Username == '' || this.state.Email == '' || this.state.Password == '' || this.state.Password2 == '') {
                Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin')
                return;
            }
            if (!email.test(this.state.Email)) {
                Alert.alert('Thông báo', 'Email không hợp lệ')
                return;
            }
            if (this.state.Password != this.state.Password2) {
                Alert.alert('Thông báo', 'Password không trùng nhau')
                return;
            }
            let obj = { username: this.state.Username, email: this.state.Email, password: this.state.Password, role: 'user' };
            fetch(api_url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            })
                .then((res) => {
                    if (res.status == 201) {
                        Alert.alert('Thông báo', 'Thêm thông tin thành công!')
                        navigation.replace('Login')
                    }
                })
        }

        const back = () => {
            navigation.replace('Login')
        }

        return (
            <ImageBackground source={background} style={styles.container}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.boxTitle}>
                            <TouchableOpacity onPress={back} style={styles.back}>
                                <Image style={styles.image} source={Back} />
                            </TouchableOpacity>
                            <Text style={styles.title}>Register</Text>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.textInputNgoai}>
                                <Image style={styles.image} source={User} />
                                <TextInput style={styles.textInputTrong} onChangeText={(content) => { this.setState({ Username: content }) }} placeholder='Nhập Username'>{this.state.Username}</TextInput>
                            </View>
                            <View style={styles.textInputNgoai}>
                                <Image style={styles.image} source={Email} />
                                <TextInput style={styles.textInputTrong} onChangeText={(content) => { this.setState({ Email: content }) }} placeholder='Nhập Email'>{this.state.Email}</TextInput>
                            </View>
                            <View style={styles.textInputNgoai}>
                                <Image style={styles.image} source={Lock} />
                                <TextInput style={styles.textInputTrong} onChangeText={(content) => { this.setState({ Password: content }) }} secureTextEntry placeholder='Nhập Password'>{this.state.Password}</TextInput>
                            </View>
                            <View style={styles.textInputNgoai}>
                                <Image style={styles.image} source={Lock} />
                                <TextInput style={styles.textInputTrong} onChangeText={(content) => { this.setState({ Password2: content }) }} secureTextEntry placeholder='Xác nhận Password'>{this.state.Password2}</TextInput>
                            </View>
                            <TouchableOpacity onPress={reg} style={styles.button1}>
                                <Text style={styles.text1}>
                                    Đăng ký
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
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
    back: {
        marginRight: '10%'
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white'
    },
    boxTitle: {
        marginTop: '20%',
        marginRight: '20%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    box: {
        width: 300,
        height: 500,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#00CCFF',
        marginTop: '5%',
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
    }
})