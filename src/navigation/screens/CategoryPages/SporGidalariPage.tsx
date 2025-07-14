import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import PrevIcon from '../../../svgs/PrevIcon'
import { useNavigation } from '@react-navigation/native'

const SporGidalariPage = () => {
  const navigation = useNavigation();
  return (
       <SafeAreaView>
         <View className="flex-row items-center mx-2 mt-4 my-4">
          <TouchableOpacity
           onPress={() => navigation.goBack()}
          >
            <PrevIcon />
          </TouchableOpacity>
          <Text className="text-black text-md font-semibold ml-2">
        Spor Gıdaları
          </Text>
        </View>
    </SafeAreaView>
  )
}

export default SporGidalariPage