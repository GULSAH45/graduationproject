import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const BasketScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 py-4">
      <View className="flex-1 items-center mx-3 py-4">
        <Text className="text-lg font-bold">SEPETİM</Text>
        <View className="w-full h-[1px] border border-BasketBorderColor my-2" />
        <Text className="text-sm py-3 font-normal">
          Sepetinizde Ürün Bulunmamaktadır
        </Text>
      </View>
      <View className="items-center mt-5 justify-center">
        <TouchableOpacity className="bg-black w-[324px] h-[55px]
         items-center justify-center rounded-lg">
          <Text className="text-2xl text-white text-center font-bold">Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
