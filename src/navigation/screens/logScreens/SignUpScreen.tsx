import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SignUpInput from "../../../components/SignUpInput";
import CheckIcons from "../../../components/checkIcons";

const base_url = 'https://fe1111.projects.academy.onlyjs.com/api/v1';
// tüm bu stateler o formları ve yaptıklarını yönetmek için 
const SignUpScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
// kayıt  işini yönetelim
  const handleSignUp = async () => {

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `${base_url}/auth/register`,
        {
          //post suz olmuyo malum
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            password2,
            // uğur hoca belirlemiş.
            api_key: "370718",
            first_name: firstName,
            last_name: lastName,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage("Kayıt başarılı! Giriş yapabilirsiniz.");
      } else {
        setMessage(data.message || "Bir hata oluştu.");
      }
    } catch (error) {
      setMessage("Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

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
          //componentine gönderilen proplar state yönetimi ve butonun davranışını üste yani screene atıyor.
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
        </View>

        <View className="flex-1 px-4">
          {/* Onay kutuları ve metinleri için daha iyi hizalama ve görünüm */}
          <View className="flex-row items-start mx-7 my-3">
            <CheckIcons />
            <Text className="text-xs text-neutral-600 ml-2 flex-1">
              Kampanyalardan haberdar olmak için{" "}
              <Text className="text-sm text-neutral-950 font-bold underline">
                Ticari Elektronik İleti Onayı
              </Text>
              metnini okudum, onaylıyorum. Tarafınızdan gönderilecek ticari
              elektronik iletileri almak istiyorum.
            </Text>
          </View>
          <View className="flex-row items-start mx-7 my-3">
            <CheckIcons />
            <Text className="text-xs text-neutral-600 ml-2 flex-1">
              <Text className="text-sm text-neutral-950 font-bold underline">
                Üyelik sözleşmesini
              </Text>{" "}
              ve{" "}
              <Text className="text-sm text-neutral-950 font-bold underline">
                KVKK Aydınlatma Metnini okudum
              </Text>{" "}
              kabul ediyorum.
            </Text>
          </View>
          <Text className="text-sm px-6 py-5 w-full ">
            Zaten hesabınız var mı?{"   "}
            <TouchableOpacity onPress={() => navigation.navigate("LogScreen")}>
              {" "}
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
