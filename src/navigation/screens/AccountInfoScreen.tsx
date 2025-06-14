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
import { TextInputBase } from "react-native";
import DropDownFlag from "../../svgs/DropDownFlag";

const AccountInfoScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1">
      <View>
        <View className="flex-row items-center mx-2 mt-4 my-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("MenuListScreen")}
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
       

        <View
          className="bg-InputBackground border border-TextInputBorderColor 
          rounded-md justify-center w-[370px] h-[50px] mx-6"
        >
          <TextInput className="p-5" placeholder="Adınızı giriniz">
             <DropDownFlag />
          </TextInput>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountInfoScreen;
