import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectOrder } from '../store/userOrder'
import { Text,View,Image, ScrollView, StyleSheet } from 'react-native'

export const YourOrders = () => {
  
    const ordersList=useSelector(selectOrder)
    const newOrderList=[...ordersList]

  

    useEffect(()=>{},[ordersList])
    
  
    return (
    <ScrollView>
        <View style={styles.container}>
        {newOrderList.length ? newOrderList.reverse().map((item,index)=><View style={styles.ordercontainer} key={index}>
           <View style={styles.imageContainer}> 
            <Image source={{uri: item.items[0].productdata.image}} style={{width: 150,height: 150,objectFit: 'contain'}}/>
            <Text style={styles.numberproducts}>{item.items.length > 1 ? `+${item.items.length -1} more` : ""}</Text>
          </View>
          <View style={styles.information}>
           <Text>Name: {item.username}</Text>
           <Text>{item.useremail}</Text>
           <Text>{item.address.address}</Text>
           <Text>{item.address.city}</Text>
           <Text>{item.address.pincode}</Text>
           <Text>{item.address.state}</Text>
           <Text>Phone: {item.phone}</Text>
           <Text style={{fontWeight: 500}}>Total Rs: {item.total}</Text>   
         </View> 
        </View>) : <Text style={{fontSize: 20,fontWeight: '500'}}>Please make one order.</Text>}
      </View> 
    </ScrollView>
  )
}

const styles=StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        rowGap: 20
    },

    ordercontainer:{
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        columnGap: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: 'center'
    },

    information:{
        rowGap: 5
    },

    numberproducts:{
         width: 80,
        textAlign: 'center',

    },
    imageContainer:{
        alignItems: 'center',
        rowGap: 5
    }
})