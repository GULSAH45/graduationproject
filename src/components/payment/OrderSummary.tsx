import { View, Text, TouchableOpacity } from "react-native";

interface OrderSummaryProps {
  address?: string;
  email?: string;
  shipping?: string;
}

const OrderSummary = ({ address, email, shipping }: OrderSummaryProps) => {
  return (
    <View className="space-y-4">
      {address && (
        <View className="bg-white rounded-lg p-4">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2">
              <View className="w-6 h-6 rounded-full bg-black items-center justify-center">
                <Text className="text-white text-sm font-medium">✓</Text>
              </View>
              <Text className="font-semibold text-black">Adres</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600">Düzenle</Text>
            </TouchableOpacity>
          </View>
          <View className="ml-8 space-y-1">
            <Text className="text-sm font-medium text-black">{email}</Text>
            <Text className="text-sm text-gray-500">Arzu Betül Kart</Text>
            <Text className="text-sm text-gray-500">+905395115340</Text>
            <Text className="text-sm text-gray-500">
              Merkez mahallesi, Çay sokak no15, Sarıyer, İstanbul, Türkiye
            </Text>
          </View>
        </View>
      )}

      {shipping && (
        <View className="bg-white rounded-lg p-4">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2">
              <View className="w-6 h-6 rounded-full bg-black items-center justify-center">
                <Text className="text-white text-sm font-medium">✓</Text>
              </View>
              <Text className="font-semibold text-black">Kargo</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600">Düzenle</Text>
            </TouchableOpacity>
          </View>
          <View className="ml-8">
            <Text className="text-sm text-black">
              Ücretsiz Kargo (16:00 öncesi siparişler aynı gün kargolam) /{" "}
              <Text className="text-blue-600">Ücretsiz</Text>
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default OrderSummary;
