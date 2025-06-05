import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SignUpInput = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-MainBackground">
        <View className="items-center justify-center">
          <Text className="text-3xl text-TextColor text-center mb-3 font-bold">
            Üye Ol
          </Text>
        </View>

        <View className="flex-1">
          <View className="mx-5 my-5 pb-8 border border-gray-500 rounded-md">
            <View className="flex-row justify-between border-b border-gray-500 mb-5">
              <TouchableOpacity
                onPress={() => navigation.navigate("LogScreen")}
                className="w-[171px] h-[50px] border border-x-gray-400 items-center justify-center rounded-lg"
              >
                <Text className="text-lg text-TextLoginButtonColor text-center font-medium">
                  Giriş Yap
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-InputBackground w-[171px] h-[50px] items-center justify-center border border-x-gray-400 rounded-lg">
                <Text className="text-lg text-black text-center font-medium">
                  Üye Ol
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mx-auto">
              <Text className="text-xl mx-7 my-5">Ad</Text>
              <View className="bg-InputBackground border rounded-md justify-center w-[330px] h-[50px] mx-7">
                <TextInput className="p-5" placeholder="Adınızı giriniz" />
              </View>

              <Text className="text-xl mx-7 my-5">*Soyad</Text>
              <View className="bg-InputBackground border rounded-md justify-center mx-7 w-[330px] h-[50px]">
                <TextInput className="p-5" placeholder="Soyadınızı giriniz" />
              </View>
            </View>

            <View className="mx-auto">
              <Text className="text-xl mx-7 my-5">*E-posta</Text>
              <View className="bg-InputBackground border rounded-md justify-center w-[330px] h-[50px] mx-7">
                <TextInput
                  className="p-5"
                  placeholder="E-posta adresinizi giriniz"
                />
              </View>

              <Text className="text-xl mx-7 my-5">*Şifre</Text>
              <View className="bg-InputBackground border rounded-md justify-center mx-7 w-[330px] h-[50px]">
                <TextInput
                  className="p-5"
                  placeholder="Şifrenizi giriniz"
                  secureTextEntry
                />
              </View>
            </View>

            <View className="items-center mt-5 justify-center">
              <TouchableOpacity className="bg-black w-[324px] h-[55px] items-center justify-center rounded-lg">
                <Text className="text-2xl text-white text-center font-bold">
                  Üye Ol
                </Text>
              </TouchableOpacity>

            
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpInput;
