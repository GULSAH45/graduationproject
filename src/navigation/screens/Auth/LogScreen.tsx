import {
  SafeAreaView,
  View,
  Image,
  Text,
} from "react-native";
import React, { useState } from "react";
import LoginInput from "@/components/LoginInput";
import { useNavigation } from "@react-navigation/native";

import { useAuthStore } from "@/stores/useAuthStore";

//ana dres dosyadan gelen base url
const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

const LogScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Local login
      const success = login(email, password);

      if (success) {
        navigation.navigate("HomeTabs", { screen: "MainpageMainScreen" });
      } else {
        setMessage("E-posta veya şifre hatalı.");
      }
    } catch (error: any) {
      setMessage("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-MainBackground">
      <View className="items-center justify-center">
        <Image
          source={require("../../../assets/LOGO.png")}
          className="w-[119px] h-[26px] mb-5 mt-10"
          resizeMode="contain"
        />
        <Text className="text-3xl text-TextColor text-center  mb-3 font-extrabold">
          Giriş Yap
        </Text>
      </View>
      <LoginInput
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        onLogin={handleLogin}
        message={message}
      />
    </SafeAreaView>
  )
}

export default LogScreen;