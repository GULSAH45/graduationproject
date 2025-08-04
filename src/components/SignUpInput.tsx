import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface SignUpInputProps {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  password2: string;
  setPassword2: (v: string) => void;
  loading: boolean;
  onSignUp: () => void;
  message: string;
}

const SignUpInput = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  password2,
  setPassword2,
  loading,
  onSignUp,
  message,
}: SignUpInputProps) => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View className="items-center justify-center rounded-md">
        <Text className="text-3xl text-TextColor text-center mb-3 font-bold">
          Üye Ol
        </Text>
      </View>
      <View className="flex-1">
        <View className="mx-5 my-5 pb-8 border border-TextInputBorderColor rounded-md">
          <View className="flex-row justify-between border border-TextInputBorderColor mb-5">
            <TouchableOpacity
            //tab menu uye/giris
              onPress={() => navigation.navigate("LogScreen")}
              className="w-[171px] h-[50px] border border-t-0 border-TextInputBorderColor items-center justify-center rounded-lg"
            >
              <Text className="text-lg text-TextLoginButtonColor text-center font-medium">
                Giriş Yap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity  className="bg-gray-300 w-[171px] h-[50px] items-center justify-center border border-t-0 border-TextInputBorderColor rounded-md" disabled>
              <Text className="text-lg text-black text-center font-medium">
                Üye Ol
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mx-auto">
            <Text className="text-xl mx-7 my-5">Ad</Text>
            <View className="bg-InputBackground border border-TextInputBorderColor rounded-md justify-center w-[330px] h-[50px] mx-7">
              <TextInput className="p-5" placeholder="Adınızı giriniz" value={firstName} onChangeText={setFirstName} />
            </View>
            <Text className="text-xl mx-7 my-5">*Soyad</Text>
            <View className="bg-InputBackground border-TextInputBorderColor rounded-md justify-center mx-7 w-[330px] h-[50px] border">
              <TextInput className="p-5" placeholder="Soyadınızı giriniz" value={lastName} onChangeText={setLastName} />
            </View>
          </View>
          <View className="mx-auto">
            <Text className="text-xl mx-7 my-5">*E-posta</Text>
            <View className="bg-InputBackground border-TextInputBorderColor rounded-md justify-center w-[330px] h-[50px] mx-7 border">
              <TextInput
                className="p-5"
                placeholder="E-posta adresinizi giriniz"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <Text className="text-xl mx-7 my-5">*Şifre</Text>
            <View className="bg-InputBackground border-TextInputBorderColor rounded-md justify-center mx-7 w-[330px] h-[50px] border">
              <TextInput
                className="p-5"
                placeholder="Şifrenizi giriniz"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <Text className="text-xl mx-7 my-5">*Şifre Tekrar</Text>
            <View className="bg-InputBackground border-TextInputBorderColor rounded-md justify-center mx-7 w-[330px] h-[50px] border">
              <TextInput
                className="p-5"
                placeholder="Şifrenizi tekrar giriniz"
                value={password2}
                onChangeText={setPassword2}
                secureTextEntry
              />
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  )
}

export default SignUpInput;
