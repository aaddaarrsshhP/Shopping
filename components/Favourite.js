
import { Modal,View,ScrollView, Text,StyleSheet,Image, Pressable, StatusBar, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectFavourite } from '../store/userDataSlice'
import Ionicons from '@expo/vector-icons/Ionicons';
import { selectCart } from '../store/userDataSlice';
import { Details } from './Details';
import { useRef, useState } from 'react';
import { onDataEntry } from '../store/userDataSlice';
import { set,ref } from 'firebase/database';
import { database} from '../firebase';
import { selectUserid } from '../store/userSlice';

export const Favourite = ({close}) => {

    
    const dispatch=useDispatch()
    const [detailsmodal,setDetailsmodal]=useState(false)
    const favourite=useSelector(selectFavourite)
    const cart=useSelector(selectCart)
    const user=useSelector(selectUserid)
    const timeout=useRef(false)
    const timeoutcart=useRef(false)

    const handlenavigation=(item)=>{
        
        close(false)
    }

    const handlebackbutton=()=>{
        
        close(false)
    }

    const RemoveFromFavourite=(product)=>{
          const newFav=favourite.filter(item=>item.id!==product.id)
          dispatch(onDataEntry({
            cart:[...cart],
            favourite:[...newFav]  
          }))

          function ApiCall(){
            console.log("removing from favourite");
            try{ 
                set(ref(database,'users/' + user + '/data'),{
                   favourite: [...newFav],
                   cart: [...cart]
               })

               timeout.current=false
                     
                      }
          
        catch(error)
        {
            
          console.log(error);               
       
       }

          }

          if(!timeout.current){
          timeout.current=setTimeout(ApiCall,2000)
         }
         else{
            clearTimeout(timeout.current)
            timeout.current=setTimeout(ApiCall,2000)
         }
    }


    const Addtocart=(data)=>{
        console.log("Adding to cart data");
        
      dispatch(onDataEntry({
        cart: [...cart,{productdata: data,count: 1}],
        favourite: [...favourite]
      }))
      
       function Apicall(){ 

        console.log("Adding to cart");
      try{ 
        set(ref(database,'users/' + user + '/data'),{
           favourite: [...favourite],
           cart: [...cart]
       })
                  
        }
     catch(error)
     {
         
       console.log(error);               
    
    }
  
    }

    if(!timeoutcart.current){
        timeoutcart.current=setTimeout(Apicall,4000)
       }
       else{
          clearTimeout(timeoutcart.current)
          timeoutcart.current=setTimeout(Apicall,4000)
       }
}

    

  return (
  <Modal
  onRequestClose={()=>handlebackbutton()}
  animationType='fade'
  >  
  <StatusBar current/>
   <View style={Styles.view}>
    <View style={Styles.header}>
            <Pressable onPress={()=>handlebackbutton()}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </Pressable>
        <Text style={Styles.headerfavourite}>Favourites</Text>
    </View> 
    <ScrollView>
         {favourite.length !==0 ? <View style={Styles.container}>
              {favourite.map((item,index)=>{

                 const added=cart.length ? cart.some(data=>data.productdata.id===item.id) : false
              return (
             <Pressable onPress={()=>setDetailsmodal(item)} key={index}> 
              <View style={Styles.productcontainer} >
                 <Image source={{uri: item.image}} style={Styles.image}/>
                <View style={Styles.textContainer}> 
                 <Text style={Styles.title}>{item.title}</Text>
                 <Text style={Styles.price}>RS. {item.price}</Text>
                 </View> 
              </View>
              <View style={{flexDirection: 'row',columnGap: 10}}>
               <Button title="Remove from Favourite" color="grey" onPress={()=>RemoveFromFavourite(item)}/>
               <Button disabled={added} title={added ? 'Added to cart' : "Add to cart"} onPress={()=>Addtocart(item)} color="black"/>
               </View>
              </Pressable>
              )}) }
         </View> : <Text style={Styles.notadded}>No product has been added</Text>}
    </ScrollView>
    {detailsmodal ? <Details product={detailsmodal} close={setDetailsmodal}/> : null}
   </View>
  </Modal>   
  )
}


const Styles=StyleSheet.create({
    view: {
        
        flex: 1,
        paddingVertical: 10,
        paddingBottom: 25,
        
    },

    container:{
        paddingHorizontal: 20,
        
        rowGap: 20

    },
    image:{
        width: 150,
        height: 150,
        objectFit: 'contain'
    },

    productcontainer:{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 15,
        marginVertical: 10     
    },

    title:{
        fontSize: 15,
        fontWeight: '400',
        
    },

    price:{
       fontSize: 12,
       fontWeight: '400'  
    },
    textContainer:{
       width: 150,
       rowGap: 15     
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

    notadded:{
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 10  
    }

})