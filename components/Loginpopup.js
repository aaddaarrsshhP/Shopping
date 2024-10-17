import React, { useEffect } from 'react'
import { Modal,Text,View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export const Loginpopup = ({close}) => {
    
    useEffect(()=>{
    
      setTimeout(()=>close(false),2000)
    }
    ,[])
  return (
    <Modal
     animationType='slide'
     transparent
     
    >
     <View style={{flex: 1,justifyContent: "center",alignItems: 'center'}}>  
        <View style={{borderWidth: 1,rowGap: 10,justifyContent: 'center',alignItems: 'center',backgroundColor: 'white',height: 300,borderRadius: 10,paddingHorizontal: 20}}>
            <AntDesign name="user" size={40} color="black" />
            <Text>Please log in profile section to continue.</Text>
        </View>
      </View>  
    </Modal>
  )
}
