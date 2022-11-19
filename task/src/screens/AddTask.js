/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import Datetimepicker from '@react-native-community/datetimepicker'
import moment from "moment";

import commonStyles from "../commonStyles";

const initialState = { desc: '', date: new Date(), showDatePicker: false}

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        this.props.onSave && this.props.onSave(newTask)
        this.setState({...initialState})
    }

    getDatePicker = () => {
        let datePicker = <Datetimepicker value={this.state.date} onChange={(_, date) => this.setState({ date, showDatePicker: false })} mode="date" />

        const dateString = moment(this.state.date).format("ddd, D [de] MMMM [de] YYYY")

        if(Platform.OS === "android") {
            datePicker = (
                <View>
                    <TouchableOpacity style={styles.date} onPress={() => this.setState({showDatePicker: true})}>
                        <Text style={{color: 'black'}}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    render(){
        return(
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide'>
                    <TouchableWithoutFeedback onPress={this.props.onCancel}>
                        <View style={styles.overlay}>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <Text style={styles.header}>Nova tarefa</Text>
                        <TextInput style={styles.input} 
                        placeholder="Informe o nome da tarefa..." 
                        value={this.state.desc}
                        placeholderTextColor={'black'}
                        onChangeText={desc => this.setState({ desc })}/>
                        {this.getDatePicker()}
                        <View style={styles.botoes}>
                            <TouchableOpacity style={styles.botoe} onPress={this.props.onCancel}>
                                <Text style={{color: '#FFF'}}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botoe} onPress={this.save}>
                                <Text style={{color: '#FFF'}}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
{/*                 <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.overlay}>
                    </View>
                </TouchableWithoutFeedback> */}
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secundary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        width: "90%",
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
        color: 'black'
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    botoe: {
        margin: 20,
        marginRight: 30,
        backgroundColor: commonStyles.colors.today,
        padding: 10,
        borderRadius: 10,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
    }
})