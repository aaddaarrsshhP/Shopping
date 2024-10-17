import React from 'react'
import { View,Text } from 'react-native'

export const Contact = () => {
  return (
    <View style={{paddingVertical: 10,paddingHorizontal: 10}}>
        <Text style={{fontSize: 20,fontWeight: '500'}}>Contact Us</Text>
        <Text style={{marginTop: 10}}>We’re here to help! Whether you have questions about your order, need assistance with our products,
             or want to share your feedback, our dedicated customer service team is ready to assist you.</Text>
        <Text style={{fontSize: 20,fontWeight: '500',marginTop: 20,marginBottom: 10}}>How to Reach Us:</Text>
        <Text style={{marginTop: 10}}>Email: Send us your inquiries at support@yourshoppingwebsite.com, and we’ll respond within 24 hours.</Text>
<Text style={{marginTop: 10}}>Phone: Call us at (123) 456-7890, available Monday to Friday, 9 AM to 5 PM (EST).</Text>
<Text style={{marginTop: 10}}>Live Chat: For immediate assistance, use our live chat feature located at the bottom right of your screen.</Text>
<Text style={{marginTop: 10}}>Social Media: Connect with us on Facebook, Instagram, and Twitter for the latest updates and promotions.</Text>

<Text style={{marginTop: 10,fontSize: 20,fontWeight: '500'}}>Visit Us:</Text>
<Text style={{marginTop: 10}}>If you prefer to reach us in person, our customer service center is located at Delhi. Please check our website for visiting hours.

Your satisfaction is our priority, and we look forward to assisting you!</Text>
    </View>
  )
}
