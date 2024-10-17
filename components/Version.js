import React from 'react'
import { ScrollView, Text,View } from 'react-native'

export const Version = () => {
  return (
    <ScrollView>
        <View style={{paddingHorizontal: 10,paddingVertical: 20,rowGap: 20}}>
            <Text style={{fontSize: 20,fontWeight: '600'}}>App Version Information</Text>
            <Text>Stay up-to-date with the latest enhancements and features of [App Name]! We continuously strive to improve 
                your experience, and our version updates include new functionalities, bug fixes, and performance improvements.</Text>
            <Text>Current Version: <Text style={{fontWeight: '600'}}>0.0.1</Text></Text>
        </View>
    </ScrollView>
  )
}
