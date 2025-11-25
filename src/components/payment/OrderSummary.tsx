import { View, Text, TouchableOpacity } from "react-native";

interface AddressData {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  full_address?: string;
  city?: string;
  district?: string;
}

interface OrderSummaryProps {
  address?: AddressData;
  shipping?: string;
}

const OrderSummary = ({ address, shipping }: OrderSummaryProps) => {
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
            {address.first_name && address.last_name && (
              <Text className="text-sm font-medium text-black">
                {address.first_name} {address.last_name}
              </Text>
            )}
            {address.phone_number && (
              <Text className="text-sm text-gray-500">{address.phone_number}</Text>
            )}
            {address.full_address && (
              <Text className="text-sm text-gray-500">{address.full_address}</Text>
            )}
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
