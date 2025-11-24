import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface ShippingOptionsProps {
  onSubmit: (option: string) => void;
}

const ShippingOptions = ({ onSubmit }: ShippingOptionsProps) => {
  const [selectedOption, setSelectedOption] = useState("free");

  const handleSubmit = () => {
    onSubmit(selectedOption);
  };

  return (
    <View className="space-y-4">
      <View className="bg-white rounded-xl p-4 space-y-3">
        <TouchableOpacity
          className={`flex-row items-start justify-between p-4 rounded-lg border-2 ${
            selectedOption === "free"
              ? "border-black bg-gray-50"
              : "border-gray-200 bg-white"
          }`}
          onPress={() => setSelectedOption("free")}
        >
          <View className="flex-row items-start gap-3 flex-1">
            <View
              className={`w-5 h-5 rounded-full border-2 mt-0.5 items-center justify-center ${
                selectedOption === "free"
                  ? "border-black"
                  : "border-gray-400"
              }`}
            >
              {selectedOption === "free" && (
                <View className="w-3 h-3 rounded-full bg-black" />
              )}
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Feather name="truck" size={18} color="black" />
                <Text className="font-medium text-black">Ücretsiz Kargo</Text>
              </View>
              <Text className="text-sm text-gray-500 mt-1">
                (16:00 öncesi siparişler aynı gün kargolam) / Ücretsiz
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="w-full bg-black py-4 rounded-lg items-center"
      >
        <Text className="text-white font-semibold">Ödeme ile Devam Et</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShippingOptions;
