import React from 'react'
import { useState,useEffect } from 'react'
import { Image, Text,View,ScrollView, StyleSheet, Pressable } from 'react-native'
import { Details } from './Details'

export const Products = ({navigation}) => {
     
    const [modalData,setModaldata]=useState(false)
    const [productData,setProductData]=useState(null)

    const fetchData=async()=>{
        try{   
        const response=await fetch('https://fakestoreapi.com/products')
        const data=await response.json()
        setProductData(data)
        console.log("Prodgjsdfhjdfdshfdfhj:::::",productData[0]);
        console.log("fest:",festivalOfferImage);
        }
        catch(error)
        {
            console.log("Data not available");
        }
    }

    useEffect(()=>{
        
        fetchData()
    },[])
  return (
    <ScrollView>
        <View style={styles.productsContainer}>
           {productData ?.map((item,index)=>(
            <View style={styles.product} key={item.id}>
             <Pressable onPress={()=>setModaldata(item)}> 
                <Image 
                style={styles.image}
                source={{uri: `${item.image}`}}/>
                <Text style={styles.title}>{item.title}</Text>
                <Text>₹{Math.round(Number(item.price) * 80)}</Text>
              </Pressable> 
            </View>
           ))}
        </View>   
        {modalData ? <Details product={modalData} close={setModaldata}/> : null}
    </ScrollView>
  )
}


const styles=StyleSheet.create({
    productsContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: 15,
        rowGap: 15,
        paddingVertical: 10,
        paddingHorizontal: 5
    },

    product:{
        backgroundColor: 'white',
        rowGap: 5,
        paddingBottom: 5,
        paddingHorizontal: 4,
        paddingVertical: 5,
        elevation: 10,
        borderRadius: 12 
    },
    title: {
        width: 150,
        height: 20
    },

    image: {
        width:155,
        height: 250,
        objectFit: 'contain' 
    }
})