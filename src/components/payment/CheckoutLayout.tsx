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

    
    </SafeAreaView>
  );
};

export default CheckoutLayout;
