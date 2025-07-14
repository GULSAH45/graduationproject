import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

import PrevIcon from '../../../svgs/PrevIcon'

const VitaminPage = () => {
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
            Vitaminler
          </Text>
        </View>
    </SafeAreaView>
  )
}

export default VitaminPage