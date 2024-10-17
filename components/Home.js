import React, { useEffect, useRef } from 'react'
import { Modal,View,Text, Pressable, Image, ScrollView, StyleSheet } from 'react-native'
import { useState } from 'react'
import Ionicons from "@expo/vector-icons/Ionicons"
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { onLogOut, selectEmail, selectUserid } from '../store/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onValue,ref } from 'firebase/database';
import { database } from '../firebase';
import { useDispatch } from 'react-redux';
import { onLogIn } from '../store/userSlice';
import { onDataEntry, selectCart, selectFavourite } from '../store/userDataSlice';
import { Details } from './Details';
import { onAddressEntry } from '../store/useaddress';
import { puttingCurrentAddress } from '../store/userCurrentAddress';
import { onPhonechange } from '../store/usePhone';
import { onOrderchange } from '../store/userOrder';

const Appicon=require('../assets/shopping-1705800_1280.png')
const festivalOfferImage=require('../assets/limited-time-offer-1438906_1280.png')
const lodingImage=require('../assets/—Pngtree—load the_5054175.png')

export const Lineargradient=()=>{


    return (<LinearGradient
        // Background Linear Gradient
            colors={['transparent','transparent','grey']}
            style={styles.background}
      />  

    )
}

export const Home = ({navigation}) => {
    
    const val=useRef(1)
    const uid=useSelector(selectUserid)
    const email=useSelector(selectEmail)
    const username=useSelector(state=>state.user.username)
    const favourite=useSelector(selectFavourite)
    const cart=useSelector(selectCart)
    const [productData,setProductData]=useState(null)
    const dispatch=useDispatch()
    const [modalData,setModaldata]=useState(null)
    const [isLoading,setIsloading]=useState(true)
    


    console.log("dfdsnf dsfjdsf df jdf dfdjhdf dfjh f dsfj h dsfjdsfdsf hdsf ");
        
    const fetchData=async()=>{
        try{   
        const response=await fetch('https://fakestoreapi.com/products')
        const data=await response.json()
        console.log(data)
        setProductData(data)
       
        }
        catch(error)
        {
            console.log("Data not available");
        }
    }


    useEffect(()=>{
        console.log("Inside effect");
       setTimeout(()=>setIsloading(false),3000)

       async function GetAlldata(){
           await fetchData()
           try {
            const value =JSON.parse(await AsyncStorage.getItem('my-key'));
            console.log("Stored-value",value);
            if(value!==null)
            {
                try{ 
                    onValue(ref(database,'users/' + value.userid ), (snapshot) => {
                        if(snapshot.val()!==null){
                        const data = snapshot.val();
                        console.log(data);
                        dispatch(onLogIn({
                            username: data.username,
                            email: data.email,
                            userid: data.userid
                             
                        }))

                        data.contactdetails?.Phone? dispatch(onPhonechange({
                            phone: data.contactdetails.Phone
                        }))  : null
                        
                         dispatch(onDataEntry({
                            cart: data.data?.cart? data.data.cart : [],
                            favourite: data.data?.favourite? data.data.favourite : []  
                         }))

                         data.orders?.order? dispatch(onOrderchange({
                            order:  data.orders.order 
                         })) : null

                         data.contactdetails?.address? dispatch(onAddressEntry({
                            address:  data.contactdetails.address
                         })) : null
                         
                         
                         data.contactdetails?.address? dispatch(puttingCurrentAddress({
                            currentAddress:  data.contactdetails.address[data.contactdetails.address.length-1]}
                         )) :null
                        
                         console.log("Adress changing place fhjdfhjf dfhdfdhfj fhdsfdsfh dfjhd f");
                         
                    
                         }
                         else{

                            //         dispatch(onLogOut())
                                      
        
                            //         dispatch(onDataEntry({
                            //             cart:  [],
                            //             favourite:  []  
                            //          }))
        
                            //          dispatch(onPhonechange({
                            //             phone: null}))
                                       
                            //     }
                            //  })
        
                            //  dispatch(onOrderchange({
                            //     order:  []}))
        
                            //     dispatch(onAddressEntry({
                            //         address:  []}))
        
        
                            //      dispatch(puttingCurrentAddress({
                            //         currentAddress:  null}
                            //      )) 
                           
                           
                           
                             }
        
                            })}
                catch(error)
                 {
                    console.log("Error getting data from database");
                 }
                 }
                 
            }
            catch (error) {
                dispatch(onLogOut())
                              

                            dispatch(onDataEntry({
                                cart:  [],
                                favourite:  []  
                             }))

                             dispatch(onPhonechange({
                                phone: null}))
                               
                        
                     

                     dispatch(onOrderchange({
                        order:  []}))

                        dispatch(onAddressEntry({
                            address:  []}))


                         dispatch(puttingCurrentAddress({
                            currentAddress:  null}
                         )) 
                   
            console.log("Error fetching value");
          }
        }

        GetAlldata()

        // async function remove(){
        //     await AsyncStorage.removeItem('my-key')
        //     await fetchData()
        // }
        // remove()
        
    },[uid])

    if(isLoading){

        return(
           <Modal> 
            <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                <Image source={Appicon} style={{width: 200,height: 200}}/>
            </View>
           </Modal>  
        )
    }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[styles.text,{alignSelf: 'center'}]}>Free Shipping above ₹1999</Text>
        <Pressable style={styles.imagecontainer} onPress={productData ? ()=>setModaldata(productData[0]) : null}>
          {productData ?  <Image 
             style={styles.image}
             source={{uri : `${productData[0].image}`}}/> : <Image style={styles.image} source={lodingImage}/> }
             <Text style={styles.imagetext}>Shirts,Bags,Jwellery -All at best price</Text>
          {<Lineargradient />}   
        </Pressable>
        
        <Text style={styles.text}>Best Sellers</Text>
        <ScrollView horizontal>
            {productData?.slice(0,9).map((item,index)=>{
                return (
                    <View key={index} style={[styles.bestsellers,styles.imagecontainer]}>
                        <Pressable onPress={()=>setModaldata(item)}>
                           <Image
                           style={styles.image} 
                           source={{uri: `${item.image}`}}/>
                          {<Lineargradient />}
                        </Pressable>  
                    </View>
                )
            })}
        </ScrollView>
        <Text style={[styles.text,{fontSize: 20,fontStyle: 'italic'}]}>Festival offers of 30%</Text>
        <View style={styles.offer}>
            <Image 
            style={[styles.image]}
            source={festivalOfferImage}/>
        </View>
        <Pressable style={styles.icon}>
           <Ionicons 
           name='arrow-forward'
           size={35}
           color={'darkgrey'}
           
           /> 
        </Pressable>
     </View>
     {modalData ? <Details product={modalData} close={setModaldata}/> : null} 
    </ScrollView>
  )
}


const styles=StyleSheet.create({
    image:{
        width: 250,
        height: 300,
        objectFit: 'contain',
        
        
    },

    container:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        rowGap: 20,
        paddingTop: 20,
        paddingBottom:  50,
        paddingHorizontal: 20,
                       
    },

    text:{
        alignSelf: 'flex-start',
        fontSize: 15,
        fontWeight : 'bold',
        marginTop: 20
    },

    bestsellers:{
        marginRight: 20
    },

    imagecontainer:{
        borderWidth: 2,
        borderColor: 'grey',
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
        position: 'relative'
    },

    imagetext:{
        position: 'absolute',
        bottom: 50,
        width: 150,
        left: 63,
        color: 'white',
        fontSize :14,
        fontWeight: '700',
         
    },
    icon:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#FFFAF0',
        marginTop: -45
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
      },
      offer:{
        marginTop: -30,       
        elevation: 100,
        shadowColor: 'black',
        borderWidth: 0.1
      }
})