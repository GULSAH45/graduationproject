import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import PrevIcon from '../../svgs/PrevIcon'



const ProductDetailPage = () => {
   const navigation = useNavigation()

   
  return (
    <SafeAreaView>
         <View className="flex-row items-center mx-2 mt-4 my-4">
          <TouchableOpacity
           onPress={() => navigation.goBack()}
          >
            <PrevIcon />
          </TouchableOpacity>
          <Text className="text-black text-md font-semibold ml-2">
         //hangi ürüne gdiliyorsa ürün sayfasının adı o olacak


          </Text>
        </View>
    </SafeAreaView>
  )
}

export default ProductDetailPage;