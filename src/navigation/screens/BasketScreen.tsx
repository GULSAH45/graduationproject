import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useBasket } from '../../BasketContext';
import PrevIcon from "../../svgs/PrevIcon";

const BasketScreen = () => {
  const navigation = useNavigation();
  const { basket } = useBasket();
  return (
    <SafeAreaView className="flex-1 py-4">
       <View className="flex-row items-center mt-4 mx-4 mb-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <PrevIcon />
          </TouchableOpacity>
          <Text className="text-lg font-bold ml-2">Sepetim</Text>
        </View>
      <View className="flex-1 items-center mx-3 py-4">
     

        <Text className="text-lg font-bold">SEPETİM</Text>
        <View className="w-full h-[1px] border border-BasketBorderColor my-2" />
        {basket.length === 0 ? (
          <Text className="text-sm py-3 font-normal">
            Sepetinizde Ürün Bulunmamaktadır
          </Text>
        ) : (
          basket.map((item, idx) => (
            <View key={item.id + idx} className="w-full flex-row justify-between items-center py-2 border-b border-gray-200">
              <Text className="text-base font-medium">{item.name}</Text>
              <Text className="text-base font-bold">{item.price} TL</Text>
            </View>
          ))
        )}
      </View>
      <View className="items-center mt-5 justify-center">
        <TouchableOpacity className="bg-black w-[324px] h-[55px]
         items-center justify-center rounded-lg">
          <Text className="text-2xl text-white text-center font-bold">Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen;
