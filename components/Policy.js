
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

export const Policy = () => {
  return (
   <ScrollView> 
    <View style={{paddingVertical: 20,paddingHorizontal: 20,rowGap: 10}}>
        <Text style={{fontSize: 20,fontWeight: '600'}}>Black Bag – Your Ultimate Shopping Companion</Text>
        <Text>At Black Bag, we are committed to fostering a positive and productive work environment. Our company policies are designed to 
            provide clear guidelines and expectations for all employees, ensuring a respectful and inclusive workplace.</Text>
        <Text style={{fontSize: 20,fontWeight: '600'}}>Key Components of Our Company Policy:</Text>
        <Text>Extensive Product Range: Explore 
            thousands of items from top brands and unique sellers, all curated for your convenience.</Text>
        <Text>Personalized Recommendations: Enjoy tailored suggestions based on your preferences and shopping habits to help you find exactly what you need.
                                              </Text>
        <Text>Easy Navigation: Our user-friendly interface makes it simple to search, filter, 
            and sort products to find your perfect match quickly.</Text>
        <Text>Secure Checkout: Shop with confidence with our secure payment options and easy checkout process.</Text>
        <Text>Exclusive Deals: Access special discounts, flash sales, and promotions available only through the app.</Text>
        <Text>Order Tracking: Stay updated on your purchases with real-time tracking, 
            so you know exactly when your items will arrive.</Text>
        <Text>Wishlist & Favorites: Save your favorite items for later or share your wishlist with friends and family.</Text>
    </View>
    </ScrollView> 
  )
}
