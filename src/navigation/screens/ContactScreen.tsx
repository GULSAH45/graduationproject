import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import PrevIcon from "../../svgs/PrevIcon";
import { useNavigation } from "@react-navigation/native";

const ContactScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 mx-2">
      <View className="flex-row items-center mx-2 mt-4 my-4">
        <TouchableOpacity onPress={() => navigation.navigate("MenuListScreen")}>
          <PrevIcon />
        </TouchableOpacity>
        <Text className="text-black text-md font-semibold ml-2">
          Bize Ulaşın
        </Text>
      </View>
      <View className="items-center py-2">
        <Text className=" font-semibold py-1">
          Bize aşağıdaki iletişim formundan veya
        </Text>
        <Text className="font-semibold py-1">
          destek@proteinocean.com e-posta adresinden
        </Text>
        <Text className="font-semibold">ulaşabilirsiniz.</Text>
      </View>

      {/* Inputs */}

      <View className="mx-2 py-3 my-4 ">
        <TextInput
          className="bg-InputBackground border p-4
           border-TextInputBorderColor w-[358px] h-[50px] my-4 rounded"
          placeholder="Ad"
        ></TextInput>
        <TextInput
          className="bg-InputBackground border
           border-TextInputBorderColor my-4 w-[358px] h-[50px] rounded p-4"
          placeholder="Soyad"
        ></TextInput>
        <TextInput
          className="bg-InputBackground border p-4
           border-TextInputBorderColor my-4 rounded w-[358px] h-[50px]"
          placeholder="Email"
        ></TextInput>
        <TextInput
          className="bg-InputBackground border 
           border-TextInputBorderColor w-[358px] h-[150px] rounded p-4"
          placeholder="Mesaj"
            multiline
  textAlignVertical="top"
        ></TextInput>
        <View className="items-center justify-center my-5">
          <TouchableOpacity className="w-[352px] h-[55px] items-center justify-center bg-black rounded-lg py-2">
            <Text className="text-white text-lg font-bold text-center">
              Gönder
            </Text>
          </TouchableOpacity>
        </View>
      </View>

<View className="mx-1">
  <Text className="text-xs font-medium mx-4">
    *Aynı gün kargo hafta içi 16:00, Cumartesi ise 11:00' a kadar
verilen siparişler icin geçerlidir.

  </Text>
  <Text className=" text-sm font-medium mx-4">
    Siparişler kargoya verilince e-posta ve sms ile bilgilendirme
yapılır.
  </Text>
</View>
<View className="my-3 mx-5">
  <Text className="text-xxs">
Telefon ile <Text className="font-bold">0850 303 29 89</ Text>numarasını arayarak da bizlere
sesli mesaj bırakabilirsiniz . Sesli mesajlarınıza hafta içi saat
 <Text className="font-bold">09:00-17:00</ Text>arasında dönüş sağlanmaktadır.

  </Text>
</View>


    </SafeAreaView>
  );
};

export default ContactScreen;
