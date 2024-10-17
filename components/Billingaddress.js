import React, { useRef, useState } from 'react'
import { StyleSheet,Pressable,Text,SafeAreaView,View, Modal, TextInput, Button, ScrollView} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { onAddressEntry } from '../store/useaddress';
import { useSelector } from 'react-redux';
import { selectAddress } from '../store/useaddress';
import {  puttingCurrentAddress } from '../store/userCurrentAddress';
import { states } from '../JSON/States';

export const Billingaddress = ({close}) => {

    const [address,setAddress]=useState("");
    const [city,setCity]=useState("")
    const [pincode,setPincode]=useState("")
    const [state,setState]=useState("")
    const [errors,setError]=useState({})
    const username=useSelector(state=>state.user.username)
    const dispatch=useDispatch()    
    const stateRef=useRef()
     const arrayOFaddress=useSelector(selectAddress)

    let check
    console.log("Billiiii: ",arrayOFaddress);  
    
    const handlebackbutton=()=>{
        close(false)
    }

    
    const saveData=()=>{
        let error={}
        !address ? error.address=true : ''
        !city ? error.city=true : ''
        !pincode ? error.pincode=true : ''
        !state ? error.state="Please enter state" : !states.includes(state.toLowerCase()) ? error.state="India doesn't have this state": ""
        console.log(!error);
        setError(error)

        if(!Object.keys(error).length)
        {
            check={   
                address:address,
               city:city,
               pincode:pincode,
               state:state.toUpperCase()
            }
            console.log(check);
                 
            
            dispatch(puttingCurrentAddress({currentAddress:check}))           
            
            dispatch(onAddressEntry({address:[{   
                address:address,
               city:city,
               pincode:pincode,
               state:state.toUpperCase()
            },...arrayOFaddress]}))

            

            close(false)
        }
        else return ;
    }

  return (
   <Modal
   animationType='fade'
   onRequestClose={()=>close(false)}
   > 
     <SafeAreaView>
        <View style={styles.header}>
            <Pressable onPress={()=>handlebackbutton()}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </Pressable>
        <Text style={styles.headerfavourite}>Billing address</Text>
    </View>
       <ScrollView >  
          <View style={styles.container}>
             <View style={{rowGap: 7}}>
                <Text>Name</Text>
                <Text>{username}</Text>
             </View>
             <View style={styles.inputcontainer}>
                <Text>Address</Text>
                <TextInput onChangeText={setAddress} style={styles.input} value={address}  placeholder='address' multiline/>
               {errors.address ? <Text style={{color: 'red'}}>Please enter address</Text> : null}
             </View>
             <View style={styles.inputcontainer}>
                <Text>City/Town</Text>
                <TextInput onChangeText={setCity} placeholder='City/Town' value={city} style={styles.input}/>
                {errors.city ? <Text style={{color: 'red'}}>Please enter address</Text> : null}
             </View>
             <View style={styles.inputcontainer}>
                <Text>Pincode</Text>
                <TextInput placeholder='pincode' value={pincode} onChangeText={setPincode} keyboardType='numeric' style={styles.input}/>
                {errors.pincode ? <Text style={{color: 'red'}}>Please enter address</Text> : null}            
             </View>
             <View style={styles.inputcontainer}>
                <Text>State</Text>
                <TextInput ref={stateRef} placeholder='state' value={state} onChangeText={setState} style={styles.input}/>
                {errors.state ? <Text style={{color: 'red'}}>{errors.state}</Text> : null}               
             </View>
             <View style={styles.market}>
                <Text>Market</Text>
                <Text>India</Text>   
             </View>
             
        <Pressable style={{paddingHorizontal: 15}} onPress={saveData}>
            <Text style={styles.button}>Save</Text>
        </Pressable>  
          </View>

        </ScrollView> 
    </SafeAreaView>
  </Modal>  
  )
}


const styles=StyleSheet.create({
    header:{
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: 'lightgrey',
        flexDirection: 'row',
        columnGap: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
        paddingVertical: 10
    },
    headerfavourite:{
        fontSize: 20,
        fontWeight: 'bold'
    },

    container:{
       
       paddingHorizontal: 15,
       paddingVertical: 10,
       marginBottom: 50,
       rowGap: 30
    },

    inputcontainer:{
        rowGap: 7,
        position: 'relative'
    },

    input:{
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    market:{
        marginTop: 20,
        
    },
    button:{
        marginTop: 15,
        paddingVertical: 20,
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500'
    },
    
    
    

})