import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "@react-navigation/native";

const LoginInput = () => {
  return (
    <View className=" mx-5 my-5 pb-8 border border-gray-500 rounded-md">
      <View className="flex-row justify-between border-b border-gray-500 mb-5">
        <TouchableOpacity className="bg- w-[171px] h-[50px] border border-x-gray-400 items-center 
        justify-center rounded-lg">
          <Text className="text-lg text-TextLoginButtonColor text-center font-medium">
            Giriş Yap
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-InputBackground w-[171px] h-[50px] 
        items-center justify-center border  border-x-gray-400 rounded-lg">
          <Text className="text-lg text-black text-center font-medium">
           Üye Ol
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mx-auto ">
        {" "}
        <Text className="text-xl mx-7 my-5">*E-posta</Text>
        <View className="bg-InputBackground justify-center 
        w-[330px] h-[50px] mx-7">
          <TextInput placeholder="Email" />
        </View>
        <Text className="text-xl mx-7 my-5">*Şifre</Text>
        <View className="bg-InputBackground justify-center  mx-7 w-[330px] h-[50px]">
          <TextInput placeholder="Şifre" />
        </View>
      </View>
      <View className="flex-row items-center justify-end mt-5">
        <Link to={{ screen: "ForgotPassword" }} className="mx-10 my-5 ">
        <Text className="text-black font-normal underline"> Şifremi Unuttum?</Text>
        
        </Link>
      </View>
      <View className="items-center mt-5 justify-center">
        {" "}
        <TouchableOpacity className="bg-black w-[324px] h-[55px] items-center justify-center  rounded-lg">
          <Text className="text-2xl text-white text-center font-bold">
            Giriş Yap
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginInput;
