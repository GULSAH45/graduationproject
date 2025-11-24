import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React from "react";
import PrevIcon from "@svgs/PrevIcon";
import { useNavigation } from "@react-navigation/native";

import DropDownFlag from "@svgs/DropDownFlag";
import FlagSvg from "@svgs/FlagSvg";
import CheckSvg from "@svgs/checkSvg";
import { useAuthStore } from "@/stores/useAuthStore";

const AccountInfoScreen = () => {
  const navigation = useNavigation();
  const { currentUser, updateUser } = useAuthStore();
  
  const [firstName, setFirstName] = React.useState(currentUser?.firstName || "");
  const [lastName, setLastName] = React.useState(currentUser?.lastName || "");
  const [phone, setPhone] = React.useState(currentUser?.phone || "");
  const [email, setEmail] = React.useState(currentUser?.email || "");

  const handleSave = () => {
    updateUser({
      firstName,
      lastName,
      phone,
      email
    });
    alert("Bilgiler güncellendi!");
  };

  return (
    <SafeAreaView className="flex-1">
      <View>
        <View className="flex-row mx-2 mt-4 my-4">
          <TouchableOpacity
           onPress={() => navigation.navigate("HomeTabs", { screen: "MenuListScreen" })}
          >
            <PrevIcon />
          </TouchableOpacity>
          <Text className="text-black text-md font-semibold ml-2">
            Hesap Bilgileri
          </Text>
        </View>

        {/* Formssection */}

        <View className="flex-col mx-6">
          <View className="flex-row justify-between ">
            <View className="flex-1 mr-2">
              <Text className="my-3 text-md">Ad</Text>
              <View
                className="bg-InputBackground border
               border-TextInputBorderColor
               rounded-md justify-center h-[50px] "
              >
                <TextInput 
                  className="p-4 flex-1" 
                  placeholder="Adınızı giriniz"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </View>

            <View className="flex-1 ml-2">
              <Text className="my-3 text-md">Soyad</Text>
              <View className="bg-InputBackground border border-TextInputBorderColor rounded-md justify-center h-[50px]">
                <TextInput 
                  className="p-4 flex-1" 
                  placeholder="Soyadınızı giriniz"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>
          </View>

          <Text className="text-md my-5">Telefon</Text>
          <View className="bg-InputBackground border border-TextInputBorderColor rounded-md flex-row items-center h-[50px] px-2">
            <TouchableOpacity className="flex-row items-center mr-2">
              <FlagSvg />
              <DropDownFlag />
            </TouchableOpacity>
            <TextInput
              className="flex-1 p-2" // Added p-2 for consistent padding
              placeholder="Telefon numaranızı giriniz"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <Text className="text-md my-5">Email</Text>
          <View className="bg-InputBackground border border-TextInputBorderColor rounded-md h-[50px] px-2 justify-center">
            <TextInput
              className="p-4 flex-1" // Added p-4 and flex-1 for consistent padding and full width
              placeholder="Email adresinizi giriniz"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View className="flex-row my-6 items-center mx-6">
          <TouchableOpacity>
            <CheckSvg />
          </TouchableOpacity>
          <Text className="text-sm ml-3 flex-1">
            Kampanyalardan haberdar olmak için
            <TouchableOpacity onPress={() => alert("Onay metni tıklandı!")}>
              <Text className="text-sm  p-0 text-TextLoginButtonColor ">Ticari Elektronik İleti Onayı</Text>
            </TouchableOpacity>
            metnini okudum, onaylıyorum. Tarafınızdan gönderilecek ticari elektronik iletileri almak istiyorum.
          </Text>
        </View>

        <View className="items-center my-5">
          <TouchableOpacity
            className="w-11/12 h-[55px] bg-black rounded-lg py-2 justify-center"
            onPress={handleSave}
          >
            <Text className="text-white text-lg font-bold text-center">
              Kaydet
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AccountInfoScreen;