import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, ImageBackground, FlatList, Modal } from 'react-native'
import React, { Component } from 'react'
import backdround2 from '../assets/backdround2.png'
import seach from '../assets/seach.png'

var api_url = 'http://10.24.6.31:3000/api/pr'

export default class Product extends Component {
    state = {
        object: [],
        object2: [],
        name: '',
        avatar: '',
        description: '',
        price: '',
        seach: '',
        isModal: false
    }
    set = (x) => {
        this.setState({ name: x.name })
        this.setState({ avatar: x.avatar })
        this.setState({ description: x.description })
        this.setState({ price: x.price })
    }
    modal = (x) => {
        this.set(x)
        this.setState({ isModal: !this.state.isModal })
    }
    getSp = () => {
        if (this.state.seach != '') {
            const array = this.state.object.filter(element => element.name.includes(this.state.seach))
            this.setState({ object2: array })
        } else {
            this.setState({ object2: this.state.object })
        }
    }
    getList = () => {
        fetch(api_url)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                this.setState({ object: data_json.data });
                this.setState({ object2: data_json.data });
            })
    }
    render() {
        return (
            <ImageBackground onLayout={this.getList} source={backdround2} style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.title}>Bảng Product</Text>
                    <View style={styles.textInput}>
                        <TextInput style={{ flex: 1 }} onChangeText={(content) => { this.setState({ seach: content }) }} placeholder='Seach...' />
                        <TouchableOpacity onPress={this.getSp}>
                            <Image style={{ width: 30, height: 30 }} source={seach} />
                        </TouchableOpacity>
                    </View>
                    <FlatList data={this.state.object2} renderItem={(data) => (
                        <TouchableOpacity style={styles.buttonModel} onPress={this.modal.bind(this, data.item)}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image style={styles.image} source={{ uri: data.item.avatar }} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.text}>Tên: {data.item.name}</Text>
                                <Text style={styles.text}>Giá: {data.item.price} VND</Text>
                            </View>
                        </TouchableOpacity>
                    )} />
                </View>
                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.isModal}
                    onRequestClose={() => { this.modal }}>
                    <View style={styles.khungngoai}>
                        <View style={styles.khungtrong}>
                            <Text style={styles.title2}>Thông Tin Product</Text>
                            <Image style={styles.image} source={{ uri: this.state.avatar }} />
                            <View>
                                <Text style={styles.text}>Tên: {this.state.name}</Text>
                                <Text style={styles.text}>Đánh giá: {this.state.description}</Text>
                                <Text style={styles.text}>Giá: {this.state.price} VND</Text>
                            </View>
                            <TouchableOpacity onPress={this.modal} style={styles.button}>
                                <Text style={styles.text2}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
        width: 150,
        height: 80,
        borderWidth: 1,
        borderColor: '#00CC33',
        borderRadius: 10
    },
    text: {
        fontWeight: 'bold'
    },
    title: {
        fontSize: 40,
        marginTop: '20%',
        fontWeight: 'bold',
        color: 'white'
    },
    title2: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: '5%'
    },
    box: {
        alignItems: 'center',
    },
    buttonModel: {
        height: 100,
        width: 350,
        backgroundColor: '#CCFFFF',
        flexDirection: 'row',
        marginTop: '3%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#00FFFF',
        alignItems: 'center'
    },
    khungngoai: {
        flex: 1,
        justifyContent: 'center',
    },
    khungtrong: {
        height: 300,
        borderRadius: 20,
        backgroundColor: 'white',
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0033FF',
    },
    button: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CCFFCC',
        backgroundColor: '#6699FF'
    },
    textInput: {
        width: 300,
        borderWidth: 1,
        padding: 10,
        margin: '3%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#00FFFF'
    }
})