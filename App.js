import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Home } from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Products } from './components/Products';
import { User } from './components/User';
import { Provider } from 'react-redux';
import store from './store/store';
import { useState } from 'react';
import { Favourite } from './components/Favourite';
import { Cart } from './components/Cart';
import { YourOrders } from './components/YourOrders';
import { Contact } from './components/Contact';
import { About } from './components/About';
import { Policy } from './components/Policy';
import { Version } from './components/Version';

const titleIcon=require('./assets/shopping-1705800_1280.png')
const ProductsIcon=require('./assets/shopping-8042865_1280.png')
const OrdersIcon=require('./assets/box-1673579_1280.png')
const Drawer=createDrawerNavigator()

export default function App() {

  const [usermodal,setUsermodal]=useState(false)
  const [favourimodal,setfavouriteModal]=useState(false)
  const [cartModal,setCartModal]=useState(false)
  
  return (
    <Provider store={store}> 
    <NavigationContainer>
      
      <Drawer.Navigator backBehavior='history'  screenOptions={{
        headerRight:(props)=> (
          <>
            <View style={styles.headercomponent}>
              <AntDesign name="search1" size={24} color="black" />
             <Pressable onPress={()=>setfavouriteModal(true)}>  
              <AntDesign name="hearto" size={24} color="black" />
             </Pressable> 
             <Pressable onPress={()=>setUsermodal(true)}>
              <AntDesign name="user" size={24} color="black" />
              </Pressable> 
             <Pressable onPress={()=>setCartModal(true)}> 
              <Feather name="shopping-bag" size={24} color="black" />
             </Pressable>  
            </View>

          {favourimodal ? <Favourite close={setfavouriteModal} /> : null}
           {usermodal ? <User close={setUsermodal}/> : null}
          {cartModal ? <Cart close={setCartModal} /> : null}
          </>
          ),
          drawerActiveBackgroundColor: 'white',
          drawerActiveTintColor: 'lightgrey',
          drawerContentStyle:{
          paddingLeft: 10,
             
          },
          drawerStyle:{
            width: 200
          }
          
        
      }}>
        
        <Drawer.Screen name='Home' component={Home} options={{
          headerTitle: '',
          drawerLabel: '',
          drawerIcon:()=><Image source={titleIcon} style={{width: 45,height: 45}}/>
        }}/>

        <Drawer.Screen name='Products' component={Products} options={{
          drawerLabel: 'Products',
          drawerIcon:()=><Image source={ProductsIcon} style={{marginLeft: 10,width: 35,height: 35,borderRadius: 20}}/>,
          drawerLabelStyle:{
            marginLeft: -20
          },
        
        }}/>

        <Drawer.Screen name='Orders' component={YourOrders} options={{
          drawerLabel: 'Orders',
          drawerIcon: ()=><Image source={OrdersIcon} style={{marginLeft: 10,width: 35,height: 35,borderRadius: 20}}/>,
          drawerLabelStyle:{
            marginLeft: -20
          }
        }}/>

        <Drawer.Screen name='Contact' component={Contact}/>
        <Drawer.Screen name='About' component={About}/>
        <Drawer.Screen name='Policy' component={Policy}/>
        <Drawer.Screen name='Version' component={Version}/>
        
         
      </Drawer.Navigator>
      
    </NavigationContainer>
    
    </Provider>
  );
}

const styles = StyleSheet.create({

  headercomponent: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 15,
    paddingRight: 15
  }
})
