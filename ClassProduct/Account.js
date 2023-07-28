import { Text, StyleSheet, View, Image, TouchableOpacity, ImageBackground, Alert, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import backdround from '../assets/background5.jpg'
import user2 from '../assets/user2.png'
import addUser from '../assets/add-user.png'
import Lock from '../assets/lock.png'

var api_url = 'http://192.168.0.106:3000/api/user/profile'
var api_url2 = 'http://192.168.0.106:3000/api/user'
var api_url3 = 'http://192.168.0.106:3000/api/user/logout'

const Account = (props) => {
    const { navigation } = props
    const [token, setToken] = useState('')
    const [obj, setObj] = useState([])
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [passwordOld, setPasswordOld] = useState('')
    const [isModal, setIsModal] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem('token').then(result => {
            setToken(result)
        })
    }, [])

    const modal = () => {
        setIsModal(!isModal)
    }

    const profile = () => {
        fetch(api_url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setObj(data_json)
            })
    }

    const update = () => {
        if (password == '' || password2 == '' || passwordOld == '') {
            Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin')
            return
        }
        if (password != password2) {
            Alert.alert('Thông báo', 'Password không trùng nhau')
            return
        }
        let objUs = { username: obj.username, password: password, passwordOld: passwordOld };
        fetch(api_url2, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(objUs)
        })
            .then((res) => {
                if (res.status == 500) {
                    return Alert.alert('Thông báo', 'Sai password')
                }
                return res.json();
            })
            .then((data_json) => {
                if (typeof (data_json) != 'undefined') {
                    Alert.alert('Thông báo', data_json.msg);
                    AsyncStorage.clear()
                    navigation.replace('Login')
                }
            })
    }

    const logout = () => {
        fetch(api_url3, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((res) => { return res.json(); })
            .then((data_json) => {
                Alert.alert('Thông báo', data_json.msg);
                AsyncStorage.clear()
                navigation.replace('Login')
            })
    }
    return (
        <ImageBackground onLayout={profile} source={backdround} style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Thông Tin</Text>
                <View style={styles.box12}>
                    <ImageBackground style={styles.image2} source={user2} >
                        <TouchableOpacity>
                            <Image source={addUser} style={styles.image} />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <Text style={styles.text2}>Xin chào: {obj.username}</Text>
                <TouchableOpacity onPress={modal} style={styles.button}>
                    <Text style={styles.text}>Đổi Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout} style={styles.button}>
                    <Text style={styles.text}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            <Modal animationType="slide"
                transparent={true}
                visible={isModal}
                onRequestClose={() => { modal }}>
                <View style={styles.khungngoai}>
                    <View style={styles.khungtrong}>
                        <Text style={styles.title2}>Update Password</Text>
                        <View style={styles.textInputNgoai}>
                            <Image style={styles.image} source={Lock} />
                            <TextInput style={styles.textInputTrong} onChangeText={(content) => { setPasswordOld(content) }} secureTextEntry placeholder='Nhập Password cũ' />
                        </View>
                        <View style={styles.textInputNgoai}>
                            <Image style={styles.image} source={Lock} />
                            <TextInput style={styles.textInputTrong} onChangeText={(content) => { setPassword(content) }} secureTextEntry placeholder='Nhập Password mới' />
                        </View>
                        <View style={styles.textInputNgoai}>
                            <Image style={styles.image} source={Lock} />
                            <TextInput style={styles.textInputTrong} onChangeText={(content) => { setPassword2(content) }} secureTextEntry placeholder='Nhập lại Password' />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={modal} style={styles.button2}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                    Đóng
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={update} style={styles.button2}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                    Lưu
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    )
}

export default Account

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        width: 40,
        height: 40
    },
    image2: {
        width: 170,
        height: 170,
        borderColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 40,
        marginTop: '20%',
        fontWeight: 'bold',
        color: 'white'
    },
    title2: {
        fontSize: 30,
        marginTop: '5%',
        fontWeight: 'bold'
    },
    box: {
        flex: 10,
        alignItems: 'center',
    },
    box12: {
        width: 180,
        height: 180,
        borderWidth: 1,
        borderRadius: 35,
        borderColor: 'white',
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 300,
        height: 70,
        borderRadius: 25,
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CCFFFF',
        borderWidth: 2,
        borderColor: '#00FFFF'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15
    },
    text2: {
        marginTop: '5%',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    },
    khungngoai: {
        flex: 1,
        justifyContent: 'center',
    },
    khungtrong: {
        height: 400,
        borderRadius: 20,
        backgroundColor: 'white',
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0033FF',
    },
    textInputNgoai: {
        width: 250,
        flexDirection: 'row',
        marginBottom: '7%',
        borderBottomWidth: 1,
        borderBottomColor: '#9999FF',
        alignItems: 'center',
    },
    textInputTrong: {
        padding: 20
    },
    button2: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CCFFCC',
        backgroundColor: '#6699FF'
    },
})