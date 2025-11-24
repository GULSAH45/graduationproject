import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AccountSVG from "@svgs/accountSVG";
import SiparisSVG from "@svgs/SiparisSVG";
import AdresSVG from "@svgs/AdresSVG";
import HakkımızdaSVG from "@svgs/HakkımızdaSVG";
import BizeUlasinSVG from "@svgs/BizeUlasinSVG";
import SssSVG from "@svgs/SssSVG";

const MenuListScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 py-4">
      <View className="flex-1 mx-3 py-4">
        <Text className="text-3xl font-bold mx-2">Menü</Text>

        <TouchableOpacity onPress={() => navigation.navigate("AccountInfoScreen")}>
          <View className="flex-row items-center my-4">
            <Text>
              <AccountSVG />
            </Text>
            <Text className="text-sm font-normal mx-3">Hesap Bilgileri</Text>
          </View>
        </TouchableOpacity>
        <View className="border border-MenuBorderColor" />
        <TouchableOpacity onPress={() => navigation.navigate("OrderScreen")}>
          <View className="flex-row items-center my-4">
            <Text>
              <SiparisSVG />
            </Text>
            <Text className="text-sm font-normal mx-3">Siparişlerim</Text>
          </View>
        </TouchableOpacity>

        <View className="border border-MenuBorderColor" />

        <TouchableOpacity onPress={() => navigation.navigate("Adressess")}>
          <View className="flex-row items-center my-4">
            <Text>
              <AdresSVG />
            </Text>
            <Text className="text-sm font-normal mx-5">Adreslerim</Text>
          </View>
        </TouchableOpacity>

        <View className="border border-MenuBorderColor" />

        <TouchableOpacity onPress={() => navigation.navigate("AboutScreen")}>
          <View className="flex-row items-center my-4">
            <Text>
              <HakkımızdaSVG />
            </Text>
            <Text className="text-sm font-normal mx-3">Hakkımızda</Text>
          </View>
        </TouchableOpacity>

        <View className="border border-MenuBorderColor" />

        <TouchableOpacity onPress={() => navigation.navigate("ContactScreen")}>
          <View className="flex-row items-center my-4">
            <Text>
              <BizeUlasinSVG />
            </Text>
            <Text className="text-md font-normal mx-3">Bize Ulaşın</Text>
          </View>
        </TouchableOpacity>

        <View className="border border-MenuBorderColor" />

        <TouchableOpacity onPress={() => navigation.navigate("FreqAskScreen")}>
          <View className="flex-row items-center my-4">
            <Text className="mx-2">
              <SssSVG />
            </Text>
            <Text className="text-sm font-normal mx-3">S.S.S</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MenuListScreen;
