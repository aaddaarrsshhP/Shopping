import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { database } from '../firebase'
import { onValue,set,ref, update } from 'firebase/database'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const Database = () => {

    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    const id=28976
    const auth=getAuth()
    const Writedata=()=>{
        set(ref(database,'users/' + id),{
            email: email,
            password: pass,
            name: 'John',
            orders:[{id: 5454,name: 'tshirt'}],
            favourite: [],
            cart: []
        })
    }

    const updateData=()=>{
        update(ref(database,'users/' + id),{
            email: email,
            password:pass,
             
        })
    }

    const signup=()=>{
               
        createUserWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
    }

    const sigin=()=>{
        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("signed in: ",user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }

    useEffect(()=>{
        
         try{
            const starCountRef = ref(database, 'users/' + id );
            onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log('firebase data: ' ,data);
        });

         }
         catch(error)
         {
            console.log(error);
         }

    
    },[])

  return (
    <View style={Styles.container}>
        <TextInput style={Styles.email} value={email} placeholder='Email' onChangeText={setEmail}/>
        <TextInput style={Styles.pass} value={pass} placeholder='password' onChangeText={setPass} />
        <Button title='Submit' onPress={Writedata}/>
        <Button title='update' onPress={updateData}/>
        <Button  title='signin' onPress={signup}/>
        <Button title='signin' onPress={sigin}/>
        
    </View>
  )
}


const Styles=StyleSheet.create({
 
    container:{
        rowGap: 15,
        paddingHorizontal: 15,
        paddingVertical: 15
    },

    email:{
        borderWidth: 1,
        paddingVertical: 10,
    },
    pass:{
        borderWidth: 1,
        paddingVertical: 10
    },

})