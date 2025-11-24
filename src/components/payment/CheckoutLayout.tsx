import { ReactNode } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

interface CheckoutLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

const CheckoutLayout = ({ children, currentStep, totalSteps }: CheckoutLayoutProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold">Özet</Text>
          <Text className="text-sm font-medium">
            688 TL <Text className="text-gray-500">(2 ürün)</Text>
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4">
          {children}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <View className="flex-row items-center justify-around py-3">
          <TouchableOpacity className="items-center justify-center">
            <Feather name="home" size={20} color="gray" />
            <Text className="text-xs text-gray-500 mt-1">Anasayfa</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center justify-center">
            <Feather name="search" size={20} color="gray" />
            <Text className="text-xs text-gray-500 mt-1">Ürün Ara</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center justify-center">
            <Feather name="package" size={20} color="gray" />
            <Text className="text-xs text-gray-500 mt-1">Tüm Ürünler</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center justify-center">
            <Feather name="menu" size={20} color="gray" />
            <Text className="text-xs text-gray-500 mt-1">Menü</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutLayout;
