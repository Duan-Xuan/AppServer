import { StyleSheet, View, Image, TouchableOpacity, Alert, Text, TextInput, ImageBackground } from 'react-native';
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import background from '../assets/background.jpg'
import User from '../assets/user.png'
import Lock from '../assets/lock.png'

var api = 'http://192.168.0.106:3000/api/user/login'

const Login = ({ navigation }) => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const login = () => {
        if (user === '' || pass === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin')
            return;
        }
        postServer()
    }

    const reg = () => {
        navigation.navigate('Reg')
    }

    const postServer = () => {
        axios.post(api, {
            username: user,
            password: pass
        })
            .then(function (response) {
                if (response.data.status) {
                    Alert.alert("Thông báo", "Đăng nhập thành công")
                    // AsyncStorage.setItem('token', response.data.message)
                    navigation.replace('Home', { screen: 'Product' })
                } else {
                    Alert.alert("Thông báo", response.data.message)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <ImageBackground source={background} style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.box}>
                <View style={styles.textInputNgoai}>
                    <Image style={styles.image} source={User} />
                    <TextInput style={styles.textInputTrong} onChangeText={(content) => { setUser(content) }} placeholder='Username' />
                </View>
                <View style={styles.textInputNgoai}>
                    <Image style={styles.image} source={Lock} />
                    <TextInput style={styles.textInputTrong} onChangeText={(content) => { setPass(content) }} secureTextEntry placeholder='Password' />
                </View>
                <TouchableOpacity onPress={login} style={styles.button}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ top: '10%' }}>Have not account yet?</Text>
            <TouchableOpacity onPress={reg} style={{ top: '10%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Register</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    title: {
        marginTop: '15%',
        fontSize: 60,
        fontWeight: 'bold',
        color: 'white',
    },
    box: {
        width: 320,
        height: 340,
        borderWidth: 1,
        marginTop: '15%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#00CCFF',
        backgroundColor: 'white',
    },
    textInputNgoai: {
        width: 250,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '10%',
        borderColor: '#9999FF',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
    },
    textInputTrong: {
        width: '75%',
        height: 60,
        paddingLeft: 10,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        width: '40%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#33FFCC',
        backgroundColor: '#6699FF',
        justifyContent: 'center'
    },
})