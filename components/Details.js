import React from 'react'
import { Modal,SafeAreaView, StyleSheet, Text, View,StatusBar, Image, Button, ScrollView, Pressable } from 'react-native'
import { useState,useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { database } from '../firebase'
import { set,ref, } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../store/userDataSlice';
import { selectFavourite } from '../store/userDataSlice';
import { selectUserid } from '../store/userSlice';
import { onDataEntry } from '../store/userDataSlice';



export const Details = ({product,close}) => {
    const user=useSelector(selectUserid)  
    const dispatch=useDispatch()
    const cart=useSelector(selectCart)
    const favourite=useSelector(selectFavourite)
    const productData=product
    const [count,setCount]=useState(1)
        
    const disabeButton=cart.some(item=>item.productdata.id==productData.id)
    const heartButton=favourite.some(item=>item.id==productData.id)
    console.log("cart",cart);
    console.log("Inside details: ",productData);
    console.log(disabeButton, ':disabling');
    console.log("favourite",favourite);

     
      async function addToCart(data){

      console.log("Adding to cart data");
        
      dispatch(onDataEntry({
        cart: [...cart,{productdata: data,count: count}],
        favourite: [...favourite]
      }))
      
      try{ 
        set(ref(database,'users/' + user + '/data'),{
           favourite: [...favourite],
           cart: [...cart,{productdata: data,count: count}]
       })
                  
        }
     catch(error)
     {
         
       console.log(error);               
    
    }

     }    
  

     async function addtofavourite(data){

      console.log("Adding to favourite data");
      
      if(!favourite.some(item=>item.id==data.id))
     {
      dispatch(onDataEntry({
        cart: [...cart],
        favourite: [...favourite,data]
      }))

        try{ 
             set(ref(database,'users/' + user + '/data'),{
                favourite: [...favourite,data],
                cart: [...cart]
            })
                  
                   }
       
     catch(error)
     {
         
       console.log(error);               
    
    }
  }
  else{
    const fav=favourite.filter(item=>item.id!==data.id)

    dispatch(onDataEntry({
      cart: [...cart],
      favourite: [...fav]
    }))
    
    try{ 
       set(ref(database,'users/' + user + '/data'),{
          favourite: [...fav],
          cart: [...cart]
      })
            
 }
 catch(error)
     {
         
       console.log(error);               
    
    }
}
}

    function AddCount(){

      setCount(prev=>prev+1)
    }

    function dropCount(){
      if(count === 1) return 
      setCount(prev=>prev-1)
    }

    useEffect(()=>{
      
      setCount(1)
      
    },[productData])
    
  return (
   <Modal 
   onRequestClose={()=>close(false)}
   animationType='fade'
   
   >   
    <SafeAreaView style={Styles.container}>
        <View style={Styles.header}>
            <Pressable onPress={()=>close(false)}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </Pressable>
        </View>
        
       <ScrollView  showsVerticalScrollIndicator={false}> 
        <StatusBar backgroundColor='grey'/>
       { productData ?  
        <>
        <Image 
        style={Styles.image}
        source={{uri: productData.image}}/>
        <Text style={Styles.title}>{productData.title}</Text>
        <Text style={Styles.mrp}>MRP inclusive of all taxes</Text>
        <Text style={Styles.rupee}>Rs.{Math.round(Number(productData.price) * 80)}</Text>
       {!disabeButton ? <View style={Styles.count}>
          <Pressable disabled={disabeButton} onPress={AddCount}><Text style={Styles.plusminus}>+</Text></Pressable>
          <Text style={Styles.plusminus}>{count}</Text>
          <Pressable disabled={disabeButton} onPress={dropCount}><Text style={Styles.plusminus}>-</Text></Pressable>
        </View> : null}
        <Button disabled={disabeButton} title={disabeButton ? "Added to Cart" : "Add to Cart"} onPress={()=>addToCart(productData)} color='black'/>
        <Text style={Styles.deliverytime}>Delivery Time: 2-7 days</Text> 
        <Text>Rating: {productData.rating.rate}⭐</Text>
        <Text style={Styles.fit}>Description & Fit</Text>
        <Text style={Styles.description}>{productData.description}</Text>
        <View style={[Styles.heart]}>
         <Pressable onPress={()=>addtofavourite(productData)}> 
          {heartButton ? <AntDesign name="heart" size={24} color="black" /> : <AntDesign name="hearto" size={24} color="black" />}
        </Pressable>
        </View>
        </>
        : 
        
       <Text>Something went wrong</Text> }
      </ScrollView> 
    </SafeAreaView>
    </Modal>  
  )
}

const Styles=StyleSheet.create({
 
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 15,
        
    },

    image:{
        width: '100%',
        height: 400,
        objectFit: 'contain',
        
    },
    title:{
        marginTop: 35,
    },
    mrp:{
        marginTop: 5,
        color: 'grey'
    },
    rupee:{
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 20
    },


    deliverytime: {
        marginTop: 10
    },

    fit:{
        marginTop: 20,
        fontWeight: '600',
        fontSize: 14
    },

    description:{
        marginTop: 8,
        
    },

    heart:{
        position: 'absolute',
        right: 10,
        top: 380,
        zIndex: 1,
        
        
    },

    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        height: 40,
        
    },

    count: {
      flexDirection: 'row',
      columnGap: 10,
      alignSelf: 'flex-start',
      borderRadius: 10,
      marginBottom: 10,
      borderColor: 'black',
      paddingHorizontal: 5,
      borderColor: 'grey'

    },

    plusminus:{
      fontSize: 20,
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 5,
      fontWeight: '500'
    }
})
