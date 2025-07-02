import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React from "react";
import PrevIcon from "../../svgs/PrevIcon";
import { useNavigation } from "@react-navigation/native";

import DropDownFlag from "../../svgs/DropDownFlag";
import FlagSvg from "../../svgs/FlagSvg";
import CheckSvg from "../../svgs/checkSvg";

const AccountInfoScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1">
      <View>
        <View className="flex-row items-center mx-2 mt-4 my-4">
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

        <View className="flex-row mx-8">
          <View className="">
            <Text className="my-3 text-md">Ad</Text>
            <View
              className="bg-InputBackground border
             border-TextInputBorderColor
             rounded-md justify-center w-[177px] h-[50px] "
            >
              <TextInput className="p-5" placeholder="Adınızı giriniz" />
            </View>
          </View>

          <View>
            <Text className="mx-7 text-md my-3">Soyad</Text>
            <View className="bg-InputBackground border border-TextInputBorderColor rounded-md justify-center w-[177px] h-[50px] mx-7">
              <TextInput className="p-5" placeholder="" />
            </View>
          </View>
        </View>

        <Text className="text-sm mx-7 my-5">Telefon</Text>
        <View className="bg-InputBackground border border-TextInputBorderColor rounded-md flex-row items-center w-[370px] h-[50px] mx-6 px-2">
          <TouchableOpacity className="flex-row items-center mr-2">
            <FlagSvg />
            <DropDownFlag />
          </TouchableOpacity>
          <TextInput
            className="flex-1 p-2"
            placeholder="Telefon numaranızı giriniz"
            keyboardType="phone-pad"
          />
        </View>

        <Text className="text-sm mx-7 my-5">Email</Text>
        <View className="bg-AccountEmailInput border border-TextInputBorderColor rounded-md w-[370px] h-[50px] mx-6 px-2 justify-center">
          <TextInput
            className="p-2"
            placeholder="Email adresinizi giriniz"
            keyboardType="email-address"
          />
        </View>
      </View>

      <View className="flex-row my-2 items-center justify-center p-3 mx-2">
        {" "}
        <TouchableOpacity>
        <CheckSvg />
        </TouchableOpacity>
        <Text className="  text-xxs m-3">
    Kampanyalardan haberdar olmak için{" "}
        <TouchableOpacity onPress={() => alert("Onay metni tıklandı!")}>
  <Text className="text-xs">Ticari Elektronik İleti Onayı</Text>
</TouchableOpacity>
          metnini okudum, onaylıyorum. Tarafınızdan gönderilecek ticari
          elektronik iletileri almak istiyorum.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AccountInfoScreen;
