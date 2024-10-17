import React from 'react'
import { View,Modal, SafeAreaView,Text, StyleSheet, Pressable } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { onLogOut, selectEmail, selectUserid } from '../store/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onDataEntry } from '../store/userDataSlice';
import { onPhoneRemove } from '../store/usePhone';
import { currentAddressRemove } from '../store/userCurrentAddress';
import { onAddressRemove } from '../store/useaddress';
import { onOrdersRemove } from '../store/userOrder';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Userprofile = ({close}) => {
        
  const username=useSelector(state=>state.user.username)
  const userid=useSelector(selectUserid)
  const useremail=useSelector(selectEmail)
  const dispatch=useDispatch()     


  async function rmoveStorage(){
        
    try{
         await AsyncStorage.removeItem("my-key")
         console.log("removed asyncstorage");
         dispatch(onLogOut())
         dispatch(onDataEntry({
          cart: [],
          favourite: []
    }))
        
        dispatch(onPhoneRemove())
        dispatch(currentAddressRemove())
        dispatch(onAddressRemove())
        dispatch(onOrdersRemove())
         
       }
       catch(e)
       {
         console.log("Error removing");
       }
      
      }
  return (
    <SafeAreaView>
      <View style={style.header}>
            <Pressable onPress={()=>close(false)}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </Pressable>
        <Text style={style.headerfavourite}>User</Text>
    </View>
        <View style={style.profileImage}>
            <AntDesign name="user" size={40} color="black" />
            <Text>{username}</Text>
         </View> 
         <View>
          <View style={style.rows}>
            <Text style={style.titlewidth}>Username:</Text>
            <Text>{username}</Text>
          </View>
          <View style={style.rows}>
            <Text style={style.titlewidth}>User id: </Text>
            <Text>{userid}</Text>
          </View>
          <View style={style.rows}>
            <Text style={style.titlewidth}>Email: </Text>
            <Text>{useremail}</Text>
          </View>
         <Pressable style={style.button} onPress={()=>rmoveStorage()}> 
          <Text style={{color: 'white'}}>Sign out</Text>
          </Pressable> 
         </View>
        
    </SafeAreaView>
  )
}

const style=StyleSheet.create({
  profileImage: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    paddingTop: 100,
    marginBottom :50
  },

  rows:{
    flexDirection: 'row',
    columnGap: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10
  },

  button:{
    marginHorizontal: 20,
    backgroundColor: 'black',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  titlewidth:{
    width: 80
  },


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
})