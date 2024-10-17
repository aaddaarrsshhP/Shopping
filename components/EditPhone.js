import React from 'react'
import { Button,Modal, StyleSheet, Text, View,TextInput } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { onPhonechange } from '../store/usePhone'

export const EditPhone = ({close}) => {

    const [number, setNumber]=useState('')
    const dispatch=useDispatch()

    const checkNumber=()=>{
        if(number.length ===10 ){
            dispatch(onPhonechange({
                phone: number
            }))
           close(false) 
        }
        else return ;
    }
  return (
    <Modal 
    transparent
    onRequestClose={()=>close(false)}
    style={{position: 'relative',marginBottom: 0,paddingBottom :0}}
    animationType='slide'
    onPress={()=>close(false)}
    >
        <View style={styles.container}>
            <Text>Phone Number: </Text>
            <TextInput keyboardType='numeric' style={styles.input} placeholder='Number' onChangeText={setNumber}/>
            <Button title="Done" color="black" onPress={()=>checkNumber()}/>
        </View>
    </Modal>
  )
}


const styles=StyleSheet.create({
    container: {
        height: 200,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left :0,
        justifyContent :"center",
        paddingHorizontal: 15,
        rowGap: 25,
        borderWidth: 3,
        borderColor: "#04057B",
        marginBottom: -10
    },

    input: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5
    }
})