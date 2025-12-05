import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SignUpInput from "@/components/SignUpInput";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuthStore } from "@/stores/useAuthStore";

const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // Checkbox states
  const [isMarketingConsent, setIsMarketingConsent] = useState(false);
  const [isTermsConsent, setIsTermsConsent] = useState(false);

  const register = useAuthStore((state) => state.register);

  const handleSignUp = async () => {
    // Validation: Check if both checkboxes are checked
    if (!isMarketingConsent || !isTermsConsent) {
      Alert.alert(
        "Onay Gerekli",
        "Üye olmak için Ticari Elektronik İleti Onayı ve Üyelik Sözleşmesi'ni kabul etmelisiniz."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    if (password !== password2) {
      setMessage("Şifreler uyuşmuyor.");
      setLoading(false);
      return;
    }

    try {
      // Local registration
      const success = await register({
        email,
        password,
        firstName,
        lastName,
      });

      if (success) {
        // Store registration flag
        await AsyncStorage.setItem('registered', 'true');
        // Show success alert
        Alert.alert('Başarılı', 'Üye olundu!');
        // Navigate to LogScreen after successful registration so user can log in
        navigation.navigate("LogScreen");
      } else {
        setMessage("Bu e-posta adresi ile zaten kayıtlı bir kullanıcı var.");
      }
    } catch (error: any) {
      console.error('SignUp error:', error);
      // Try to parse error message from API
      let errorMessage = "Bir hata oluştu.";
      try {
        const errorData = JSON.parse(error.message);
        console.log('Parsed error data:', errorData);
        
        if (errorData.reason) {
          // Handle password errors
          if (errorData.reason.password) {
            const passwordErrors = errorData.reason.password;
            const turkishErrors = passwordErrors.map((err: string) => {
              if (err.includes('too short')) return 'Şifre en az 8 karakter olmalı';
              if (err.includes('too common')) return 'Şifre çok yaygın, daha güçlü bir şifre seçin';
              if (err.includes('entirely numeric')) return 'Şifre sadece rakamlardan oluşmamalı';
              return err;
            });
            errorMessage = turkishErrors.join('\n');
          } 
          // Handle email errors
          else if (errorData.reason.email) {
            errorMessage = `Email hatası: ${errorData.reason.email[0]}`;
          }
          // Handle other errors
          else if (errorData.reason.detail) {
            errorMessage = errorData.reason.detail;
          }
        }
      } catch (parseError) {
        console.error('Error parsing error message:', parseError);
        errorMessage = error.message || "Bir hata oluştu.";
      }
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Check if all requirements are met for signup
  const isSignupEnabled = isMarketingConsent && isTermsConsent && !loading;

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-MainBackground">
        <View className="items-center justify-center">
          <Image
            source={require("../../../assets/LOGO.png")}
            className="w-[119px] h-[26px] mb-5 mt-10"
            resizeMode="contain"
          />

          <SignUpInput
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            password2={password2}
            setPassword2={setPassword2}
            loading={loading}
            onSignUp={handleSignUp}
            message={message}
          />

          <TouchableOpacity
            className={`w-[324px] h-[55px] items-center justify-center rounded-lg mt-4 ${
              isSignupEnabled ? "bg-black" : "bg-gray-400"
            }`}
            onPress={handleSignUp}
            disabled={!isSignupEnabled}
          >
            <Text className="text-2xl text-white text-center font-bold">
              {loading ? "Kaydediliyor..." : "Üye Ol"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-4">
          <View className="flex-row items-start mx-7 my-3">
            <CheckBox
              checked={isMarketingConsent}
              onPress={() => setIsMarketingConsent(!isMarketingConsent)}
              checkedColor="rgba(33, 38, 171, 1)"
              uncheckedColor="rgba(33, 38, 171, 1)"
              size={22}
              containerStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent', borderWidth: 0 }}
            />
            <Text className="text-xs text-neutral-600 ml-2 flex-1">
              Kampanyalardan haberdar olmak için{" "}
              <Text className="text-sm text-neutral-950 font-bold underline">
                Ticari Elektronik İleti Onayı
              </Text>{" "}
              metnini okudum, onaylıyorum.
            </Text>
          </View>

          <View className="flex-row items-start mx-7 my-3">
            <CheckBox
              checked={isTermsConsent}
              onPress={() => setIsTermsConsent(!isTermsConsent)}
              checkedColor="rgba(33, 38, 171, 1)"
              uncheckedColor="rgba(33, 38, 171, 1)"
              size={22}
              containerStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent', borderWidth: 0 }}
            />
            <Text className="text-xs text-neutral-600 ml-2 flex-1">
              <Text className="text-sm text-neutral-950 font-bold underline">
                Üyelik sözleşmesini
              </Text>{" "}
              ve{" "}
              <Text className="text-sm text-neutral-950 font-bold underline">
                KVKK Aydınlatma Metnini
              </Text>{" "}
              okudum ve kabul ediyorum.
            </Text>
          </View>

          <Text className="text-sm px-6 py-5 w-full">
            Zaten hesabınız var mı?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("LogScreen")}>
              <Text className="text-sm text-TextLoginButtonColor font-bold underline">
                Giriş Yap
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpScreen;
