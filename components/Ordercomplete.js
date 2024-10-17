import React from 'react'
import { Modal,Text,View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

export const Ordercomplete = () => {
    
  return (
    <Modal
     animationType='slide'
     transparent
     
    >
     <View style={{flex: 1,justifyContent: "center",alignItems: 'center'}}>  
        <View style={{borderWidth: 1,rowGap: 10,justifyContent: 'center',alignItems: 'center',backgroundColor: 'white',height: 300,borderRadius: 10,paddingHorizontal: 20}}>
        <Ionicons name="checkmark-done-circle" size={35} color="black" />
            <Text>Your order is successfully received.</Text>
        </View>
      </View>  
    </Modal>
  )
}
