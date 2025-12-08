import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useBasket } from '@/contexts/BasketContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { IMAGE_URL } from '@/navigation/screens/ProductDetailPage';

interface OrderSummaryAccordionProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const OrderSummaryAccordion: React.FC<OrderSummaryAccordionProps> = ({ isOpen, onToggle }) => {
  const { basket } = useBasket();

  const subtotal = basket.reduce((sum, item) => {
    const itemPrice = item.price_info?.discounted_price || item.price_info?.total_price || item.price || 0;
    return sum + itemPrice * (item.quantity || 0);
  }, 0);

  const shippingCost = 0; // Ücretsiz kargo
  const paymentFee = 0; // Kapıda ödeme ücreti (varsa eklenebilir)
  const total = subtotal + shippingCost + paymentFee;

  return (
    <View className="bg-white rounded-lg border border-gray-200 mb-4">
      {/* Accordion Header */}
      <TouchableOpacity
        onPress={onToggle}
        className="flex-row justify-between items-center p-4 border-b border-gray-200"
      >
        <Text className="text-base font-semibold text-gray-900">Özet</Text>
        <View className="flex-row items-center">
          <Text className="text-base font-bold text-gray-900 mr-2">
            {total.toFixed(2)} TL {basket.length > 0 && `(${basket.reduce((sum, item) => sum + (item.quantity || 0), 0)} ürün)`}
          </Text>
          <AntDesign name={isOpen ? "up" : "down"} size={16} color="#666" />
        </View>
      </TouchableOpacity>

      {/* Accordion Content */}
      {isOpen && (
        <View className="p-4">
          {/* Product List */}
          {basket.map((item, index) => {
            const variant = item.selectedVariant;
            const photoSrc = variant?.photo_src 
              ? IMAGE_URL + variant.photo_src
              : IMAGE_URL + item.photo_src;
            const price = variant?.price?.discounted_price ?? variant?.price?.total_price ?? 
              item.price_info?.total_price ?? 0;
            const aroma = variant?.aroma || "";

            return (
              <View key={item.basketItemId || index} className="flex-row items-center mb-4 pb-4 border-b border-gray-100">
                {/* Quantity Badge */}
                <View className="relative mr-3">
                  <Image
                    source={{ uri: photoSrc }}
                    className="w-16 h-16 rounded"
                    resizeMode="contain"
                  />
                  <View className="absolute -top-2 -left-2 bg-black rounded-full w-6 h-6 items-center justify-center">
                    <Text className="text-white text-xs font-bold">{item.quantity}</Text>
                  </View>
                </View>

                {/* Product Info */}
                <View className="flex-1">
                  <Text className="font-semibold text-sm text-gray-900" numberOfLines={2}>
                    {item.name}
                  </Text>
                  {aroma && (
                    <Text className="text-xs text-gray-500 mt-1">{aroma}</Text>
                  )}
                  {variant?.size?.pieces && (
                    <Text className="text-xs text-gray-500">{variant.size.pieces}g</Text>
                  )}
                </View>

                {/* Price */}
                <Text className="font-bold text-sm text-gray-900 ml-2">
                  {(price * (item.quantity || 1)).toFixed(2)} TL
                </Text>
              </View>
            );
          })}

          {/* Summary Totals */}
          <View className="mt-2 space-y-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-gray-600">Ara Toplam</Text>
              <Text className="text-sm text-gray-900">{subtotal.toFixed(2)} TL</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-gray-600">Teslimat / Kargo</Text>
              <Text className="text-sm text-green-600 font-semibold">Ücretsiz</Text>
            </View>

            {paymentFee > 0 && (
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-gray-600">Kapıda Ödeme (Kredi Kartı)</Text>
                <Text className="text-sm text-gray-900">{paymentFee.toFixed(2)} TL</Text>
              </View>
            )}

            {/* Discount Code Section */}
            <TouchableOpacity className="py-2 mt-2">
              <Text className="text-sm text-gray-600">İndirim kodu ekle</Text>
            </TouchableOpacity>

            {/* Total */}
            <View className="flex-row justify-between items-center pt-3 border-t border-gray-200 mt-2">
              <Text className="text-lg font-bold text-gray-900">Toplam</Text>
              <View className="items-end">
                <Text className="text-lg font-bold text-gray-900">{total.toFixed(2)} TL</Text>
                <Text className="text-xs text-gray-500">Vergi 6.81 TL</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
