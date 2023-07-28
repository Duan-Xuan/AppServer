import { StyleSheet, View, Image, TouchableOpacity, Alert, Text, TextInput, ImageBackground } from 'react-native';
import React, { useState } from 'react'
import axios from 'axios'
import background from '../assets/background2.jpg'
import User from '../assets/user.png'
import Email from '../assets/email.png'
import Lock from '../assets/lock.png'
import Back from '../assets/back.png'

var api = 'http://192.168.0.106:3000/api/user/reg'
var email_test = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

const Reg = ({ navigation }) => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");

    const reg = () => {
        if (user === '' || email === '' || pass === '' || pass2 === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin')
            return;
        }
        if (!email_test.test(email)) {
            Alert.alert('Thông báo', 'Email không hợp lệ')
            return;
        }
        if (pass != pass2) {
            Alert.alert('Thông báo', 'Password không trùng nhau')
            return;
        }
        postServer()
    }

    const postServer = () => {
        axios.post(api, {
            username: user,
            email: email,
            password: pass,
            role: 'user'
        })
            .then(function (response) {
                if (response.data.status) {
                    Alert.alert("Thông báo", response.data.message)
                    navigation.replace('Login')
                } else {
                    Alert.alert('Thông báo', response.data.message)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <ImageBackground source={background} style={styles.container}>
            <View style={styles.container}>
                <View style={styles.boxTitle}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                        <Image style={styles.image} source={Back} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Register</Text>
                </View>
                <View style={styles.box}>
                    <View style={styles.textInputNgoai}>
                        <Image style={styles.image} source={User} />
                        <TextInput style={styles.textInputTrong} onChangeText={(content) => { setUser(content) }} placeholder='Username' />
                    </View>
                    <View style={styles.textInputNgoai}>
                        <Image style={styles.image} source={Email} />
                        <TextInput style={styles.textInputTrong} onChangeText={(content) => { setEmail(content) }} placeholder='Email' />
                    </View>
                    <View style={styles.textInputNgoai}>
                        <Image style={styles.image} source={Lock} />
                        <TextInput style={styles.textInputTrong} onChangeText={(content) => { setPass(content) }} secureTextEntry placeholder='Password' />
                    </View>
                    <View style={styles.textInputNgoai}>
                        <Image style={styles.image} source={Lock} />
                        <TextInput style={styles.textInputTrong} onChangeText={(content) => { setPass2(content) }} secureTextEntry placeholder='Confirm Password' />
                    </View>
                    <TouchableOpacity onPress={reg} style={styles.button}>
                        <Text style={styles.text}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Reg

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    boxTitle: {
        marginTop: '20%',
        marginRight: '20%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white'
    },
    back: {
        marginRight: '10%'
    },
    box: {
        width: 320,
        height: 480,
        borderWidth: 1,
        marginTop: '10%',
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