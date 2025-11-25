import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation";
import { useBasket } from "@/contexts/BasketContext";
import PrevIcon from "@svgs/PrevIcon";
import TikSVG from "@svgs/TikSVG";
import AdresSVG from "@svgs/AdresSVG";
import TruckSVG from "@svgs/TruckSVG";
import { IMAGE_URL } from "../ProductDetailPage";

type OrderSuccessRouteProp = RouteProp<RootStackParamList, "OrderSuccessScreen">;

const OrderSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<OrderSuccessRouteProp>();
  const { basket } = useBasket();
  
  const { orderData } = route.params || {};
  const orderNumber = orderData?.orderNumber || "#12345";
  const orderItems = orderData?.items || basket;
  const address = orderData?.address;
  
  // Map shipping value to display text
  const getShippingDisplayText = (shippingValue: string | undefined) => {
    if (shippingValue === "free") return "Ücretsiz Kargo";
    return shippingValue || "Ücretsiz Kargo";
  };
  
  const shipping = getShippingDisplayText(orderData?.shipping);

  // Calculate totals
  const subtotal = orderItems.reduce((total, item) => {
    const variant = item.selectedVariant;
    const price = variant?.price?.discounted_price ?? variant?.price?.total_price ?? item.price_info?.total_price ?? 0;
    return total + (price * (item.quantity || 1));
  }, 0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PrevIcon />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-2">Sipariş Onayı</Text>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" contentContainerClassName="pb-6">
        <View className="px-4 py-6 space-y-6">
          {/* Success Message */}
          <View className="bg-green-50 border-2 border-green-500 rounded-xl p-6 items-center">
            <View className="w-16 h-16 bg-green-500 rounded-full items-center justify-center mb-3">
              <TikSVG width={32} height={32} />
            </View>
            <Text className="text-xl font-bold text-center mb-2">Siparişiniz Alındı!</Text>
            <Text className="text-sm text-gray-600 text-center mb-1">
              Sipariş numaranız: <Text className="font-semibold text-black">{orderNumber}</Text>
            </Text>
            <Text className="text-sm text-gray-600 text-center">
              Siparişiniz hazırlanıyor ve en kısa sürede kargoya verilecek.
            </Text>
          </View>

          {/* Order Details */}
          <View className="space-y-4">
            {/* Address */}
            {address && (
              <View className="bg-white rounded-xl p-4 border border-gray-200">
                <View className="flex-row items-start">
                  <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center mr-3">
                    <AdresSVG width={20} height={20} />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold mb-1">Teslimat Adresi</Text>
                    <Text className="text-sm text-gray-600">
                      {address.first_name} {address.last_name}
                    </Text>
                    <Text className="text-sm text-gray-600">{address.full_address}</Text>
                    {address.phone_number && (
                      <Text className="text-sm text-gray-600 mt-1">{address.phone_number}</Text>
                    )}
                  </View>
                </View>
              </View>
            )}

            {/* Shipping */}
            <View className="bg-white rounded-xl p-4 border border-gray-200">
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-orange-100 rounded-lg items-center justify-center mr-3">
                  <TruckSVG width={20} height={20} />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold mb-1">Kargo Bilgileri</Text>
                  <Text className="text-sm text-gray-600">{shipping}</Text>
                  <Text className="text-sm text-gray-600">Tahmini teslimat: 2-3 iş günü</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Order Summary */}
          <View className="bg-white rounded-xl p-4 border border-gray-200">
            <Text className="font-semibold mb-3">Sipariş Özeti</Text>
            
            <View className="space-y-2">
              {orderItems.map((item, index) => {
                const variant = item.selectedVariant;
                const photoSrc = variant?.photo_src 
                  ? IMAGE_URL + variant.photo_src 
                  : item.photo;
                const price = variant?.price?.discounted_price ?? variant?.price?.total_price ?? item.price_info?.total_price ?? 0;
                const totalPrice = price * (item.quantity || 1);
                
                return (
                  <View key={item.basketItemId || index} className="flex-row items-start py-2">
                    <Image
                      source={{ uri: photoSrc }}
                      className="w-16 h-16 rounded-lg mr-3"
                      resizeMode="contain"
                    />
                    <View className="flex-1">
                      <Text className="text-sm font-medium" numberOfLines={2}>{item.name}</Text>
                      <Text className="text-xs text-gray-500">Adet: {item.quantity}</Text>
                      {variant?.aroma && (
                        <Text className="text-xs text-gray-500">{variant.aroma}</Text>
                      )}
                    </View>
                    <Text className="text-sm font-semibold">{totalPrice.toFixed(2)} TL</Text>
                  </View>
                );
              })}
            </View>

            <View className="border-t border-gray-200 mt-3 pt-3 space-y-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-gray-600">Ara Toplam</Text>
                <Text className="text-sm font-medium">{subtotal.toFixed(2)} TL</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-gray-600">Kargo</Text>
                <Text className="text-sm font-medium text-green-600">Ücretsiz</Text>
              </View>
              <View className="flex-row items-center justify-between pt-2 border-t border-gray-200">
                <Text className="font-semibold">Toplam</Text>
                <Text className="text-xl font-bold">{subtotal.toFixed(2)} TL</Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View className="space-y-3">
            <TouchableOpacity
              onPress={() => navigation.navigate("OrderScreen")}
              className="w-full bg-black py-4 rounded-lg items-center"
            >
              <Text className="text-white font-semibold text-base">Siparişlerimi Görüntüle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("HomeTabs", { screen: "MainpageMainScreen" })}
              className="w-full bg-gray-100 py-4 rounded-lg items-center"
            >
              <Text className="text-black font-semibold text-base">Alışverişe Devam Et</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSuccessScreen;
