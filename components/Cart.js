import React, { useRef,useEffect, useState } from 'react'
import {  ScrollView,Button, Image, Modal, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectCart } from '../store/userDataSlice'
import { Pressable } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { selectFavourite } from '../store/userDataSlice'
import { onDataEntry } from '../store/userDataSlice'
import { selectUserid } from '../store/userSlice'
import { database } from '../firebase'
import { set,ref } from 'firebase/database'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Orders } from './Orders'

export const Cart = ({close}) => {

    const timeout=useRef(null)
    const [total,setTotal]=useState(0)
    const uid=useSelector(selectUserid)
    const dispatch=useDispatch()
    const cart=useSelector(selectCart)
    const favourite=useSelector(selectFavourite)
    const Shipping=useRef(0)
    const[ordersModal,setOrdersModal]=useState(false)
    const tot=useRef(0) 
     

    if(timeout.current)
    {
    clearTimeout(timeout.current)
    timeout.current=setTimeout(Post,3000)  
    }
    else{
        timeout.current=setTimeout(Post,3000)
    }   

       
    async function removeFromcart(data){
          const newCart=cart.filter(item=>item.productdata.id!==data.id) 
          dispatch(onDataEntry({
            cart: [...newCart],
            favourite: [...favourite]
          }))

           }

function Post(){
      console.log("Sending data to database");
    try{ 
        set(ref(database,'users/' + uid + '/data'),{
           favourite: [...favourite],
           cart: [...cart]
       })
   
       timeout.current=null
   }
   catch(error)
   {
    console.log("Something went wrong");
   }
      
        
}
    
const handlebackbutton=()=>{
    close(false)
}




useEffect(()=>{
    
    if(!cart.length) setTotal(0)
    else 
    {
     tot.current=0          
    cart.forEach(item=>{
        
        tot.current=tot.current+((Number(item.productdata.price)*Number(item.count))*80)
        console.log(tot.current);
    })
     console.log('cart: ', cart);
     
    if(tot.current < 1999)
    {
        Shipping.current=60
        setTotal(tot.current + Shipping.current)
    }
    else{
        setTotal(tot.current)
        Shipping.current=0
    }
    
}
       

    
},[cart])

  

  return (
    <Modal
    onRequestClose={()=>close(false)}
    animationType='fade'
    >
        <SafeAreaView>
        
    <View style={Styles.header}>
            <Pressable onPress={()=>handlebackbutton()}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </Pressable>
        <Text style={Styles.headerfavourite}>Cart</Text>
    </View> 
          <ScrollView>
            <View style={Styles.container}>
                  
            {cart.length ? <View style={Styles.staticText}>
                       <Text style={{width: 310,color: 'grey',textAlign: 'center'}}>Welcome to the final step of your shopping journey! We’re excited to help you complete your purchase.
                         At this stage, you can review your selected items and confirm your shipping details.</Text>
                        <Text style={{color: 'darkgrey',width: 250,textAlign: 'center',fontWeight: '600',fontSize: 25}}>Take a moment to ensure everything in your cart is just as you want it.</Text>
                </View> : null}         
                 {cart.length > 0 ? cart.map((item,index)=><View style={Styles.productcontainer} key={index}>
                <Image source={{uri: item.productdata.image}} style={{width: 150,height: 150,objectFit: 'contain'}}/>
                <View style={Styles.textcontainer}>
                    <Text style={Styles.texttitle}>{item.productdata.title}</Text>
                    <Text style={Styles.textquantity}>Quantity: {item.count}</Text>
                   <Text>Rs.{Number(item.productdata.price)*80}</Text>
                </View>
                <Pressable style={Styles.dustbin} onPress={()=>removeFromcart(item.productdata)}>
                 <AntDesign name="delete" size={18} color="black" />
                 </Pressable> 
            </View>) : 
              
              <Text style={{marginTop: 300,textAlign: 'center'}}>Cart is Empty</Text>
            
               }
             
                {cart.length ?
               <View style={{marginTop: 15}}>   
                <View style={Styles.orderDetails}>
                <Text style={Styles.orderDetailTExt}>Order Value</Text>    
                <Text style={Styles.orderDetailTExt}>Total Rs: {Math.round(total)}</Text>
                </View>
                <View style={[Styles.orderDetails,{marginTop: 10,borderTopWidth: 1,borderColor: 'grey'}]}>
                  <Text style={Styles.orderDetailTExt}>Delivery</Text>
                  <Text style={Styles.orderDetailTExt}>{Shipping.current ? `Rs.${Shipping.current}` : "Free"}</Text>
                </View>
                <View style={[Styles.orderDetails,{marginTop: 10,borderTopWidth: 1,borderColor: 'grey'}]}>
                    <Text style={Styles.total}>Total</Text>
                    <Text style={Styles.total}>Rs:{Math.round(total)}</Text>
                </View>
                <Button title="Continue to Checkout" color="black" onPress={()=>setOrdersModal(true)}/>
                <Text style={{color: 'grey',marginTop: 10}}>We only accept Cash on Delivery at the moment.</Text>
                </View>
                : null }  
             
            </View>  
            
           </ScrollView>  
            {ordersModal ? <Orders shipping={Shipping.current} total={total} close={setOrdersModal} /> : null}
        </SafeAreaView>
        <StatusBar />
    </Modal>
  )
}


const Styles=StyleSheet.create({
    container:{
        rowGap: 30,
        paddingHorizontal: 7,
        paddingVertical: 10,
        paddingBottom: 70,
        
            
    },

    productcontainer:{
       flexDirection: 'row',
       alignItems: 'center',
       columnGap: 10,
       borderRadius: 5

       
    },

    textcontainer:{
        width: 140,
        rowGap: 10
    },

    texttitle:{
        fontWeight: '500',

    },
    textquantity:{
        color: 'grey'
    },
    countcontainer:{
        paddingTop: 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 490,
        
        backgroundColor: 'lightgrey'
        
    },

    numberselecttext:{
           
        borderWidth: 1,
        borderBottomWidth: 0,
        paddingVertical: 15
    },

    plus:{
        fontSize: 20,
        borderWidth: 1,
        paddingHorizontal: 5,
        backgroundColor: 'yellow',
        borderColor: 'grey'
    },
    minus: {
        fontSize: 20,
        borderWidth: 1,
        paddingHorizontal: 8,
        backgroundColor: 'yellow',
        borderColor: 'grey'
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

    orderDetails:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        marginBottom: 10
        
    },
    orderDetailTExt:{
        color: 'grey'
    },

    total:{
        fontSize: 15,
        fontWeight: '600'
    },

    staticText:{
        justifyContent: "center",
        alignItems: 'center',
        rowGap: 25,
        marginBottom: 30
    },
    dustbin:{
        backgroundColor: 'lightgrey',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 20
    
    }

})