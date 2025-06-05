import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "@react-navigation/native";

const LoginInput = () => {
  return (
    <View className="flex-1">
      <View className="flex-row justify-between ">
        <TouchableOpacity
          className="bg-black w-[171px] h-[50px] items-center justify-center ms-[30] rounded-lg"
        >
          <Text className="text-2xl text-white text-center font-extrabold">
            Giriş Yap
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-black me-[35] w-[171px] h-[50px] items-center justify-center  rounded-lg"
        >
          <Text className="text-2xl text-white text-center font-extrabold">
            Giriş Yap
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mx-auto ">
        {" "}
        <Text className="text-xl mx-7 my-5">*E-posta</Text>
        <View className="bg-InputBackground w-[330px] h-[50px] mx-7">
          <TextInput placeholder="" />
        </View>
        <Text className="text-xl mx-7 my-5">*Şifre</Text>
        <View className="bg-InputBackground  mx-7 w-[330px] h-[50px]">
          <TextInput placeholder="" />
        </View>
      </View>
      <View className="flex-row justify-end w-full pr-8">
        <Link screen="ForgotPassword" className="text-black">
          Şifremi Unuttum{" "}
        </Link>
      </View>
      <View className="items-center mt-5 justify-center">
        {" "}
        <TouchableOpacity
          className="bg-black w-[324px] h-[55px] items-center justify-center  rounded-lg"
        >
          <Text className="text-2xl text-white text-center font-extrabold">
            Giriş Yap
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginInput;
