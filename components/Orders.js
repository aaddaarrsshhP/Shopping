import React, { useState } from 'react'
import { View,Pressable,Modal,SafeAreaView, StyleSheet, Text, ScrollView, Button } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Billingaddress } from './Billingaddress';
import { useDispatch, useSelector } from 'react-redux';
import { SelectCurrentAddress } from '../store/userCurrentAddress';
import { selectAddress } from '../store/useaddress';
import { selectEmail, selectUserid } from '../store/userSlice';
import { selectPhone } from '../store/usePhone';
import { EditPhone } from './EditPhone';
import { selectCart, selectFavourite } from '../store/userDataSlice';
import { set,ref } from 'firebase/database';
import { database } from '../firebase';
import { onOrderchange, selectOrder } from '../store/userOrder';
import { Loginpopup } from './Loginpopup';
import { Ordercomplete } from './Ordercomplete';


export const Orders = ({close,shipping,total}) => {
        
      
       const [orderComplete,setOrderComplete]=useState(false)
       const [loginpopup,setLoginPopup]=useState(false)
       const Orders=useSelector(selectOrder)
       const cart=useSelector(selectCart)
       const favourite=useSelector(selectFavourite)
       const [billingaddressmodal,setBillingAddressmodal]=useState(false)
       const [editphonemodal,setEditphonemodal]=useState(false)
       const currentAddress=useSelector(SelectCurrentAddress)
       const user=useSelector(selectUserid)
       const username=useSelector(state=>state.user.username)
       const email=useSelector(selectEmail)
       const addressArray=useSelector(selectAddress)
       const phoneNumber=useSelector(selectPhone)
       const dispatch=useDispatch()
       const [completeinformation,setProvidecompeteinformation]=useState(false)
       console.log("yserid: ",user);  
       console.log("Phonnumber: ",phoneNumber);
       console.log("currrentaddress: ",currentAddress);
       console.log("Addressarray: ",addressArray);
    const handlebackbutton=()=>{
        close(false)
    }

    const SubmitOrder=()=>{
     if(currentAddress && phoneNumber)
     {
      try{ 

        dispatch(onOrderchange({
         order: [...Orders,{
           items: [...cart],
           useremail: email,
           userid: user,
           phone: phoneNumber,
           total: total,
           address: currentAddress,
           username: username
         }]
        }))

        

       set(ref(database,'users/' + user + '/orders'),{
          order: [...Orders,
           {
             items: [...cart],
             useremail: email,
             userid: user,
             phone: phoneNumber,
             total: total,
             address: currentAddress,
             username: username
           }
          ]
      })

      set(ref(database,'users/' + user + '/data'),{
       favourite: [...favourite],
       cart: []
   })

      set(ref(database,'users/' + user + '/contactdetails'),{
         address: [...addressArray,currentAddress],
         Phone: phoneNumber
      })

      setOrderComplete(true)
     
      setTimeout(()=>{
         setOrderComplete(false)
         close(false)
        
      },2000)
      
   }
   catch(error){
     console.log("something went wrong");
   }   
     } 
     else{
        setProvidecompeteinformation(true)
        setTimeout(()=>setProvidecompeteinformation(false),2000)
        return ;  
     }
  }
  return (
   <Modal
   onRequestClose={()=>close(false)}
   animationType='fade'
   > 
    <SafeAreaView style={{paddingBottom: 60}}>
    <View style={styles.header}>
            <Pressable onPress={()=>handlebackbutton()}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </Pressable>
        <Text style={styles.headerfavourite}>Complete Order</Text>
    </View>
    <ScrollView >
        <View style={styles.container}>
         <View style={styles.innerContainers}>
            <Text>My information</Text>
           <Text>{username}</Text>
           <Text>{email}</Text>   
         </View>
         <View style={[styles.innerContainers,styles.billingaddress]}>
          {currentAddress ? <View style={{rowGap: 5}}>  
            <Text>Billing details</Text>
             <Text>{username}</Text>
            <Text>{currentAddress.address}</Text>
            <Text>{currentAddress.pincode}</Text>
            <Text>{currentAddress.city}</Text>
            <Text>India</Text>
           </View> :<View><Text>Please Add address</Text></View>}
            
          
            <Pressable onPress={()=>setBillingAddressmodal(true)}>
              <Text>{currentAddress ? "Edit" : "Add"}</Text>
            </Pressable>   
         </View>    
         <View style={[styles.innerContainers,{flexDirection: 'row',justifyContent: 'space-between'}]}>
             {phoneNumber ? <View style={{rowGap: 5}}>
              <Text>{username}</Text>
              <Text>{phoneNumber}</Text>
             </View> : <View><Text>Please add number</Text></View>}

             <Pressable onPress={()=>setEditphonemodal(true)}>
              <Text>{phoneNumber ? 'Edit' : 'Add'}</Text>
             </Pressable>

           </View> 
         <View style={styles.innerContainers}>
            <Text>Parcel</Text>
            <Text>{cart.length} items</Text>
            <Text>Standard Delivery : 2-7 days</Text>
         </View>
         <View style={styles.innerContainers}>
            <Text>Payment</Text>
            <Text>Cash on Delivery</Text>
         </View>
         <View style={[styles.innerContainers,{rowGap: 20}]}>
           <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
             <Text>Order value</Text>
             <Text>Rs.{total-shipping}</Text>
           </View>
           <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
             <Text>Delivery fee</Text>
             <Text>{shipping ?`${shipping}` : 'free'}</Text>
           </View>
           <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <Text>Total</Text>
            <Text>Rs.{total}</Text>
           </View>
           <View style={{rowGap: 20,marginTop: 20}}>
            <Text>By continuing, you agree to our General Terms and Conditions.</Text>
            <Text>We will process you personal data in accordance to companies policy.</Text>
          {user ?   <Button onPress={()=>SubmitOrder()} title={!completeinformation ? "Complete purchase" : 'Provide complete information'} color="black"/>
          : <Button title='Complete purchase' onPress={()=>setLoginPopup(true)} color="black"/>
           }
           </View>
         </View>
       </View>  
    </ScrollView> 
     {billingaddressmodal ? <Billingaddress close={setBillingAddressmodal}/> : null}
     {editphonemodal ? <EditPhone close={setEditphonemodal}/>: null}
     {loginpopup ? <Loginpopup close={setLoginPopup}/> : null}
     {orderComplete ? <Ordercomplete /> : null}
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
        paddingHorizontal: 10,
        paddingVertical: 20,
        rowGap: 30,
        paddingTop: 0
        
    },
    innerContainers:{
        backgroundColor: '#F8F8FF',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        rowGap: 5
    },
    billingaddress:{
          flexDirection: 'row',
          justifyContent: 'space-between'
    }


})