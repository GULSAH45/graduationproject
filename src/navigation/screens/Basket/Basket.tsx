import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useBasket } from '@/contexts/BasketContext';
import PrevIcon from "@svgs/PrevIcon";
import PlusIcon from "@svgs/PlusIcon";
import MinusIcon from "@svgs/MinusIcon";
import TrashIcon from "@svgs/TrashIcon";
import { IMAGE_URL } from "../ProductDetailPage";

const BasketScreen = () => {
  const navigation = useNavigation();
  const { basket, increaseQuantity, decreaseQuantity, removeFromBasket } = useBasket();
  console.log("sepet ürünleri", basket);
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
          basket.map((item) => {
            const variant = item.selectedVariant;
            const photoSrc = variant?.photo_src 
              ? IMAGE_URL + variant.photo_src 
              : item.photo;
            const price = variant?.price?.discounted_price ?? variant?.price?.total_price ?? item.price_info?.total_price ?? 0;
            const totalPrice = price * (item.quantity || 1);
            const aroma = variant?.aroma || "";
            const basketItemId = item.basketItemId || item.id;
            
            return (
              <View key={basketItemId} className="w-full flex-row items-center py-4 border-b border-gray-200">
                {/* Left: Image */}
                <Image 
                  source={{ uri: photoSrc }} 
                  className="w-20 h-20 rounded-md mr-3" 
                  resizeMode="contain"
                />
                
                {/* Middle: Info */}
                <View className="flex-1 justify-center">
                  <Text className="text-base font-medium" numberOfLines={2}>{item.name}</Text>
                  {aroma ? (
                    <Text className="text-sm text-gray-500 mt-1">{aroma}</Text>
                  ) : null}
                  {variant?.size?.pieces ? (
                     <Text className="text-sm text-gray-500">{variant.size.pieces} Adet</Text>
                  ) : null}
                </View>

                {/* Right: Price & Quantity */}
                <View className="items-end justify-between h-20">
                  <Text className="text-base font-bold text-black mb-2">{totalPrice.toFixed(2)} TL</Text>
                  
                  <View className="flex-row items-center bg-white shadow-sm rounded-lg px-2 py-1" style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>
                    <TouchableOpacity
                      onPress={() => item.quantity === 1 ? removeFromBasket(basketItemId) : decreaseQuantity(basketItemId)}
                      className="p-1"
                    >
                      {item.quantity === 1 ? <TrashIcon width={16} height={16} /> : <MinusIcon width={16} height={16} />}
                    </TouchableOpacity>
                    
                    <Text className="mx-3 text-base font-medium">{item.quantity}</Text>
                    
                    <TouchableOpacity
                      onPress={() => increaseQuantity(basketItemId)}
                      className="p-1"
                    >
                      <PlusIcon width={16} height={16} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </View>
      
      {/* Footer Section */}
      <View className="mt-auto mb-4">
        {basket.length > 0 && (
          <View className="flex-row justify-between items-center mx-4 mb-4 pt-4 border-t border-gray-100">
            <Text className="text-lg font-bold text-gray-800">Sepet Toplamı</Text>
            <Text className="text-xl font-bold text-black">
              {basket.reduce((total, item) => {
                 const variant = item.selectedVariant;
                 const price = variant?.price?.discounted_price ?? variant?.price?.total_price ?? item.price_info?.total_price ?? 0;
                 return total + (price * (item.quantity || 1));
              }, 0).toFixed(2)} TL
            </Text>
          </View>
        )}

        {basket.length === 0 ? (
          <View className="items-center justify-center">
            <TouchableOpacity onPress={() => navigation.navigate("HomeTabs", { screen: "MainpageMainScreen" })} className="bg-black w-[324px] h-[55px] items-center justify-center rounded-lg">
              <Text className="text-2xl text-white text-center font-bold">Alışverişe Başla</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="items-center justify-center">
            <TouchableOpacity 
              onPress={() => navigation.navigate("CheckoutScreen")}
              className="bg-black w-[324px] h-[55px] items-center justify-center rounded-lg"
            >
              <Text className="text-2xl text-white text-center font-bold">Devam et</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen;