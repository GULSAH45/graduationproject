import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import PrevIcon from '@/svgs/PrevIcon';

const DeliveredOrder = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="flex-row items-center mx-2 mt-4 my-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeTabs", { screen: "MenuListScreen" })}
          >
            <PrevIcon />
          </TouchableOpacity>
          <Text className="text-black text-md font-semibold ml-2">
            Sipariş Teslim Edildi
          </Text>
        </View>
        </SafeAreaView>
  )
}

export default DeliveredOrder