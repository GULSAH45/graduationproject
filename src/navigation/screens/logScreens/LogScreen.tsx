import {
  SafeAreaView,
  View,
  Image,
  Text,
} from "react-native";
import React, { useState } from "react";
import LoginInput from "../../../components/LoginInput";
import { useNavigation } from "@react-navigation/native";
//ana dres dosyadan gelen base url
const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

const LogScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      // ⬇️ Giriş isteği  yerleştirildi
      const response = await fetch(`${base_url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //kullnıcı adı email
          username: email, 
          password,
          api_key: "370718",
        }),
      });
//data yı getir bakalım
      const data = await response.json();
      console.log("DATA:", data);

      if (response.ok) {
        navigation.navigate("HomeTabs", { screen: "MainpageMainScreen" });
      } else {
        setMessage(data.message || "Giriş başarısız.");
      }
    } catch (error: any) {
      setMessage(error.message || "Bir hata oluştu.");
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
