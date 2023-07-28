import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, ImageBackground, FlatList, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import backdround from '../assets/background4.jpg'

var api = 'http://192.168.0.106:3000/api/ct'

const Category = ({ navigation }) => {
    const [object, setObject] = useState([]);
    const [object2, setObject2] = useState([]);
    const [name, setName] = useState('');
    const [seach, setSeach] = useState('');
    const [isModal, setIsModal] = useState(false);

    const modal = (x) => {
        setName(x)
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
        <ImageBackground onLayout={this.getList} source={backdround} style={styles.container}>
            <Text style={styles.title}>Bảng Category</Text>
            <View style={styles.textInput}>
                <TextInput style={{ flex: 1 }} onChangeText={(content) => { setSeach(content) }} placeholder='Seach...' />
                <TouchableOpacity onPress={getSp}>
                    <FontAwesome name='search' size={25} />
                </TouchableOpacity>
            </View>
            <FlatList numColumns={2} data={object2} showsVerticalScrollIndicator={false} renderItem={(data) => (
                <TouchableOpacity style={styles.buttonModel} onPress={modal.bind(this, data.item.name)}>
                    <Text style={{ fontWeight: 'bold' }}>Name</Text>
                    <Text style={{ fontWeight: 'bold' }}>{data.item.name}</Text>
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
                        }}>Thông Tin Category</Text>
                        <View style={{ marginTop: '5%', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Name</Text>
                            <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setIsModal(!isModal)} style={styles.button}>
                            <Text>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    )
}

export default Category

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
        margin: '2%',
        height: 60,
        width: 180,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#00FFFF',
        backgroundColor: '#CCFFFF',
    },
    khungngoai: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    khungtrong: {
        width: '80%',
        height: 200,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: '#0033FF',
    },
    button: {
        marginTop: '5%',
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