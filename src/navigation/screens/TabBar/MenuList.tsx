import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AccountSVG from "@svgs/accountSVG";
import SiparisSVG from "@svgs/SiparisSVG";
import AdresSVG from "@svgs/AdresSVG";
import HakkımızdaSVG from "@svgs/HakkımızdaSVG";
import BizeUlasinSVG from "@svgs/BizeUlasinSVG";
import SssSVG from "@svgs/SssSVG";
import LogoutSVG from "@svgs/LogoutSVG";

import { useAuthStore } from "@/stores/useAuthStore";

const MenuListScreen = () => {
  const navigation = useNavigation();

  const { accessToken, currentUser, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  console.log("current user", currentUser)

  return (
    <SafeAreaView className="flex-1 py-4 bg-white">
      <ScrollView className="flex-1 mx-3 py-4">
        <Text className="text-3xl font-bold mx-2 mb-4">Menü</Text>


        {accessToken ? (
          <>
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
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => (navigation as any).navigate("/auth/login")}>
              <View className="flex-row items-center my-4">
                <Text>
                  <AccountSVG />
                </Text>
                <Text className="text-sm font-normal mx-3">Giriş Yap</Text>
              </View>
            </TouchableOpacity>
            <View className="border border-MenuBorderColor" />
          </>
        )}

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

        {accessToken && currentUser && (
          <View className=" mx-2 p-4   rounded-lg">
            <Image source={{ uri: "https://avatars.githubusercontent.com/u/97165289" }} className="w-12 h-12 rounded-full border-1 border-gray-300" />
            <Text className="text-lg font-bold text-gray-800">
              {currentUser.data.first_name} {currentUser.data.last_name}
            </Text>
            <Text className="text-sm text-gray-500">{currentUser.data.email}</Text>
          </View>
        )}
        {accessToken && (
          <>
            <TouchableOpacity onPress={handleLogout}>
              <View className="flex-row items-center my-4">
                <Text className="mx-2">
                  <LogoutSVG />
                </Text>
                <Text className="text-sm font-normal mx-3 text-red-500">Çıkış Yap</Text>
              </View>
            </TouchableOpacity>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuListScreen;
