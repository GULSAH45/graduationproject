import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// tipleri verelim ortalık karışmasın
type LoginInputProps = {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  loading: boolean;
  onLogin: () => void;
  message?: string;
};
//bu proplarla iş yapıcak şimdi bu fonk
const LoginInput = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  onLogin,
  message,
}: LoginInputProps) => {
  //bi noktada lazım olacak navi

  const navigation = useNavigation();
  return (
    <View className="mx-5 my-5 pb-8 border border-TextInputBorderColor rounded-md">
      <View className="flex-row justify-between border border-TextInputBorderColor mb-5">
        <TouchableOpacity
          className="bg-gray-300 w-[171px] h-[50px] border border-t-0 border-TextInputBorderColor items-center justify-center rounded-lg"
          disabled
        >
          <Text className="text-lg text-black text-center font-medium">
            Giriş Yap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUpScreen")}
          className="bg-InputBackground w-[171px] h-[50px] items-center justify-center border border-t-0 border-TextInputBorderColor rounded-lg"
        >
          <Text className="text-lg text-black text-center font-medium">
            Üye Ol
          </Text>
        </TouchableOpacity>
      </View>


      <View className="mx-auto ">
      
        <Text className="text-xl mx-7 my-5">*E-posta</Text>
        <View className="bg-InputBackground border border-TextInputBorderColor rounded-md justify-center w-[330px] h-[50px] mx-7">
          <TextInput
          //burada fazla olay yok email setemail ile çalışacak
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <Text className="text-xl mx-7 my-5">*Şifre</Text>
        <View className="bg-InputBackground border border-TextInputBorderColor rounded-md mx-7 w-[330px] h-[50px] justify-center">
          <TextInput
          //password ve setpassword ile yönetilme işi
            className=""
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>
      <View className="flex-row items-center justify-end mt-5">
        <TouchableOpacity
          className="mx-10 my-5"
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text className="text-black font-normal underline">
            Şifremi Unuttum?
          </Text>
        </TouchableOpacity>
      </View>
      <View className="items-center mt-5 justify-center">
        <TouchableOpacity
        //bizim yazdığımız onlogin yada loading ile girebiliyor muyum diye bakıyor
          className="bg-black w-[324px] h-[55px] items-center justify-center rounded-lg"
          onPress={onLogin}
          disabled={loading}
        >
          <Text className="text-2xl text-white text-center font-bold">
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </Text>
        </TouchableOpacity>
        {!!message && (
          <Text className="text-center text-red-500 mt-3">{message}</Text>
        )}
      </View>
    </View>
  );
};

export default LoginInput;
