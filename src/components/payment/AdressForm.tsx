import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

interface AddressFormProps {
  onSubmit: (data: any) => void;
}

const AddressForm = ({ onSubmit }: AddressFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    apartment: "",
    city: "",
    district: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Girilen bilgiler hatalı";
    if (!formData.surname) newErrors.surname = "Girilen bilgiler hatalı";
    if (!formData.address) newErrors.address = "Girilen bilgiler hatalı";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <View className="space-y-4">
      <View className="bg-white rounded-xl border-2 border-black p-4 space-y-4">
        <View className="flex-row items-center gap-2 mb-2">
          <Feather name="map-pin" size={20} color="black" />
          <Text className="font-medium text-black">Yeni Adres</Text>
        </View>

        <View>
          <Text className="text-sm font-medium mb-1.5 text-black">Ad</Text>
          <TextInput
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
            placeholder="Ad"
          />
          {errors.name && (
            <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>
          )}
        </View>

        <View>
          <Text className="text-sm font-medium mb-1.5 text-black">Soyad</Text>
          <TextInput
            value={formData.surname}
            onChangeText={(text) => setFormData({ ...formData, surname: text })}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
            placeholder="Soyad"
          />
          {errors.surname && (
            <Text className="text-red-500 text-xs mt-1">{errors.surname}</Text>
          )}
        </View>

        <View>
          <Text className="text-sm font-medium mb-1.5 text-black">Adres</Text>
          <TextInput
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
            placeholder="Adres"
          />
          {errors.address && (
            <Text className="text-red-500 text-xs mt-1">{errors.address}</Text>
          )}
        </View>

        <View>
          <Text className="text-sm font-medium mb-1.5 text-black">Apartman, daire, vb.</Text>
          <TextInput
            value={formData.apartment}
            onChangeText={(text) => setFormData({ ...formData, apartment: text })}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
            placeholder="Apartman, daire, vb."
          />
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1">
            <Text className="text-sm font-medium mb-1.5 text-black">İl</Text>
            {/* Simplified as TextInput for now */}
            <TextInput
              value={formData.city}
              onChangeText={(text) => setFormData({ ...formData, city: text })}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
              placeholder="İl"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium mb-1.5 text-black">İlçe</Text>
            {/* Simplified as TextInput for now */}
            <TextInput
              value={formData.district}
              onChangeText={(text) => setFormData({ ...formData, district: text })}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
              placeholder="İlçe"
            />
          </View>
        </View>

        <View>
          <Text className="text-sm font-medium mb-1.5 text-black">Telefon</Text>
          <View className="flex-row gap-2">
            <View className="flex-row items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg w-20 justify-center">
              <Text className="text-2xl">🇹🇷</Text>
            </View>
            <TextInput
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
              placeholder="+90"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {}}
          className="w-full bg-gray-100 py-3.5 rounded-lg items-center"
        >
          <Text className="text-gray-500 font-medium">Adres Başlığı</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="w-full bg-black py-4 rounded-lg items-center"
      >
        <Text className="text-white font-semibold">Kargo ile Devam Et</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressForm;
