import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, ImageBackground, FlatList, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import backdround from '../assets/background3.png'

var api = 'http://192.168.0.106:3000/api/pr'

const Product = ({ navigation }) => {
    const [object, setObject] = useState([]);
    const [object2, setObject2] = useState([]);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [seach, setSeach] = useState('');
    const [isModal, setIsModal] = useState(false);

    const modal = (x) => {
        setName(x.name)
        setAvatar(x.avatar)
        setDescription(x.description)
        setPrice(x.price)
        setIsModal(!isModal)
    }

    const getSp = () => {
        if (seach != '') {
            const array = object.filter(element => element.name.includes(seach))
            setObject2(array)
        } else {
            setObject2(object)
        }
    }

    const getServer = () => {
        axios.get(api)
            .then(function (response) {
                if (response.data.status) {
                    setObject(response.data.message)
                    setObject2(response.data.message)
                } else {
                    console.log(response.data.massage)
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    useEffect(() => {
        getServer()
    }, [])

    return (
        <ImageBackground source={backdround} style={styles.container}>
            <Text style={styles.title}>Bảng Product</Text>
            <View style={styles.textInput}>
                <TextInput style={{ flex: 1 }} onChangeText={(content) => { setSeach(content) }} placeholder='Seach...' />
                <TouchableOpacity onPress={getSp}>
                    <FontAwesome name='search' size={25} />
                </TouchableOpacity>
            </View>
            <FlatList numColumns={2} data={object2} showsVerticalScrollIndicator={false} renderItem={(data) => (
                <TouchableOpacity key={data.index} style={styles.buttonModel} onPress={modal.bind(this, data.item)}>
                    <Image style={styles.image} source={{ uri: data.item.avatar }} />
                    <Text style={{ fontWeight: 'bold' }}>Name: {data.item.name}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Price: {data.item.price} VND</Text>
                </TouchableOpacity>
            )} />

            <Modal animationType="slide"
                transparent={true}
                visible={isModal}
                onRequestClose={() => { modal }}>
                <View style={styles.khungngoai}>
                    <View style={styles.khungtrong}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            marginTop: '5%'
                        }}>Thông Tin Product</Text>
                        <Image style={styles.image} source={{ uri: avatar }} />
                        <Text style={{ fontWeight: 'bold' }}>Name: {name}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Price: {price} VND</Text>
                        <Text style={{ fontWeight: 'bold' }}>{description}</Text>
                        <TouchableOpacity onPress={() => setIsModal(!isModal)} style={styles.button}>
                            <Text>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    )
}

export default Product

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        marginTop: '15%',
        fontWeight: 'bold',
        color: 'white'
    },
    textInput: {
        width: 350,
        height: 50,
        borderWidth: 1,
        alignItems: 'center',
        margin: '2%',
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#00FFFF'
    },
    buttonModel: {
        height: 210,
        width: 180,
        backgroundColor: '#CCFFFF',
        margin: '2%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#00FFFF',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 140,
        margin: 10,
        borderWidth: 1,
        borderColor: '#00CC33',
        borderRadius: 10,
    },

    khungngoai: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    khungtrong: {
        width: '80%',
        height: 350,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: '#0033FF',
    },
    button: {
        marginTop: '3%',
        width: 100,
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: '#CCFFCC',
        justifyContent: 'center',
        backgroundColor: '#6699FF'
    },
})