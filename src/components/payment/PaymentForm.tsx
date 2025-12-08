import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Feather } from "@expo/vector-icons";

interface PaymentFormProps {
  onSubmit: (data: any) => void;
}

const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });

  const [saveAddress, setSaveAddress] = useState(false);
  const [agreements, setAgreements] = useState({
    privacy: false,
    terms: false,
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View className="space-y-4">
      <View className="bg-white rounded-xl border-2 border-black p-4 space-y-4">
        <View className="flex-row items-center gap-2 mb-2">
          <Feather name="credit-card" size={20} color="black" />
          <Text className="font-medium text-black">Kredi Kartı</Text>
        </View>

        <View>
          <Text className="text-sm font-medium mb-1.5 text-gray-500">
            Kart Numarası
          </Text>
          <TextInput
            value={formData.cardNumber}
            onChangeText={(text) => setFormData({ ...formData, cardNumber: text })}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
            placeholder="Kart Numarası"
            maxLength={19}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text className="text-sm font-medium mb-1.5 text-gray-500">
            Kart Üzerindeki İsim
          </Text>
          <TextInput
            value={formData.cardName}
            onChangeText={(text) => setFormData({ ...formData, cardName: text })}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
            placeholder="Kart Üzerindeki İsim"
          />
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1">
            <Text className="text-sm font-medium mb-1.5 text-gray-500">
              Ay / Yıl
            </Text>
            <View className="flex-row gap-2">
              <TextInput
                value={formData.expiryMonth}
                onChangeText={(text) => setFormData({ ...formData, expiryMonth: text })}
                className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
                placeholder="AA"
                maxLength={2}
                keyboardType="numeric"
              />
              <TextInput
                value={formData.expiryYear}
                onChangeText={(text) => setFormData({ ...formData, expiryYear: text })}
                className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
                placeholder="YY"
                maxLength={2}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-1 mb-1.5">
              <Text className="text-sm font-medium text-gray-500">CVC</Text>
              <Feather name="help-circle" size={14} color="gray" />
            </View>
            <TextInput
              value={formData.cvc}
              onChangeText={(text) => setFormData({ ...formData, cvc: text })}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
              placeholder="CVC"
              maxLength={3}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View className="flex-row items-center gap-2 pt-2">
          <View className="w-5 h-5 rounded bg-black items-center justify-center">
            <Text className="text-white text-xs">M</Text>
          </View>
          <Text className="text-sm font-medium text-black">masterpass</Text>
          <Text className="text-xs text-gray-500">
            altyapısında saklamak istiyorum.
          </Text>
        </View>
      </View>


      {/* Agreements */}
      <View className="space-y-3 my-3">
        <TouchableOpacity 
          className="flex-row items-start my-4 gap-3"
          onPress={() => setSaveAddress(!saveAddress)}
        >
          <View className={`w-5 h-5 mt-0.5 rounded border ${saveAddress ? 'bg-black border-black' : 'border-gray-300'}`}>
            {saveAddress && <Feather name="check" size={14} color="white" />}
          </View>
          <Text className="text-sm  text-black flex-1">
            Fatura adresim teslimat adresimle aynı
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-start gap-3"
          onPress={() => setAgreements({ ...agreements, privacy: !agreements.privacy })}
        >
          <View className={`w-5 h-5 mt-0.5 rounded border ${agreements.privacy ? 'bg-black border-black' : 'border-gray-300'}`}>
            {agreements.privacy && <Feather name="check" size={14} color="white" />}
          </View>
          <Text className="text-sm text-black flex-1">
            <Text className="font-medium">Gizlilik Sözleşmesini</Text> ve{" "}
            <Text className="font-medium">Satış Sözleşmesini</Text> okudum, onaylıyorum.
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="w-full bg-black py-4 rounded-lg items-center"
      >
        <Text className="text-white font-semibold">Siparişi Tamamla</Text>
      </TouchableOpacity>

      <Text className="text-xs text-center text-gray-500">
        Ödemeler güvenli ve şifrelidir
      </Text>
    </View>
  );
};

export default PaymentForm;
