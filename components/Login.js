import React, {  useState } from 'react'
import { Pressable,Image, StyleSheet, TextInput, View, Button, Text } from 'react-native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  useDispatch } from 'react-redux';
import { onLogIn } from '../store/userSlice';
import { database } from '../firebase';
import { set,ref } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../firebase';

const image=require('../assets/shopping-1705800_1280.png')

export const Login = ({close}) => {
   
    const dispatch=useDispatch()
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
   // const auth=getAuth() 
    const [username,setUsername]=useState('')
    const [wnattoSignin,setwantTosingin]=useState(true)
  
       console.log("Inside loginiiiii");
    const signin=()=>{
               
      if(!email && !pass )
      {
        console.warn('Please enter all details')
        return
      }
       try{
        signInWithEmailAndPassword(auth, email, pass)
        .then(async(userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("signed in: ",user);
          try {

              await AsyncStorage.setItem('my-key', JSON.stringify({
                email: user.email,
                userid: user.uid
              }));

              dispatch(onLogIn({
                username: 'Guest',
                userid: user.email,
                email: user.uid
          }))
            } catch (e) {
              console.log("Error occured: ",e);
              }
            }).
            catch(error=>console.log(error))
          }
       catch(error){
        console.log(error);
       }
        
    }

    const signup=()=>{
        if(!email && !pass && !username)
        {
          console.warn('Please enter all details')
          return
        }        
      createUserWithEmailAndPassword(auth, email, pass)
.then(async(userCredential) => {
  // Signed in 
  const user = userCredential.user;
  console.log(user);
  
  try {
    await AsyncStorage.setItem('my-key', JSON.stringify({
      email: user.email,
      userid: user.uid
    }));
   await set(ref(database, 'users/' + user.uid), {
      username: username,
      email: user.email,
      userid: user.uid
    });

    dispatch(onLogIn({
      username: username,
      userid: user.email,
      email: user.uid
}))

  } catch (e) {
    console.log("async storage error:");
  }
  
}).catch(error=>console.log(error))
  }


  
    return (
  <View style={{flex: 1}}>  
    <View style={Styles.header}>
            <Pressable onPress={()=>close(false)}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </Pressable>
        <Text style={Styles.headerfavourite}>{wnattoSignin ? "Sign in" : "Sign up"}</Text>
    </View>
   {wnattoSignin ? <View style={Styles.container}>
             
      <Image style={Styles.image} source={image}/> 
        <TextInput style={Styles.input} value={email} placeholder='Email' inputMode='email' onChangeText={setEmail}/>
        <TextInput style={Styles.input} value={pass} placeholder='Password' onChangeText={setPass}/>
      <View style={{flexDirection: 'row',justifyContent: 'center',columnGap: 50}}>  
        <Button title='Sign in' onPress={signin} color="#1c2e4a"/>
        <Button title='Sign up' onPress={()=>setwantTosingin(false)} color="#04757B"/>
      </View>   
    </View> : 

<View style={Styles.container}>
             
<Image style={Styles.image} source={image}/>
  <TextInput style={Styles.input} value={username} placeholder='username' onChangeText={setUsername}/> 
  <TextInput style={Styles.input} value={email} placeholder='Email' inputMode='email' onChangeText={setEmail}/>
  <TextInput style={Styles.input} value={pass} placeholder='Password' onChangeText={setPass}/>
<View style={{flexDirection: 'row',justifyContent: 'center',columnGap: 50}}>  
  <Button title='Sign in' onPress={()=>setwantTosingin(true)} color="#1c2e4a"/>
  <Button title='Sign up' onPress={signup} color="#04757B"/>
</View>   
</View>
}
</View>
  )
}


const Styles=StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        flexDirection: "column",
        rowGap: 20,
        paddingHorizontal: 30
    },

    image:{
        alignSelf: 'center',
        width: 50,
        height: 50
    },

    input:{
        borderWidth: 1,
        paddingVertical: 5,
        borderRadius: 5,
        paddingHorizontal: 10
    },

    text:{
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold',
              
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