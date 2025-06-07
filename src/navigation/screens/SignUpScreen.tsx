import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import SignUpInput from "../../components/SignUpInput";

import { useNavigation } from "@react-navigation/native";
import CheckIcons from "../../components/checkIcons";

const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-MainBackground">
        <View className="items-center justify-center">
          <Image
            source={require("../../assets/LOGO.png")}
            className="w-[119px] h-[26px] mb-5 mt-10"
            resizeMode="contain"
          />
          <SignUpInput />
        </View>

        <View className="flex-1 px-4">
             
          <Text className="text-xs mx-7 py-6 text-neutral-600">
            <CheckIcons/>
            Kampanyalardan haberdar olmak için{" "}
            <Text className="text-sm text-neutral-950 font-bold underline">
              Ticari Elektronik İleti Onayı
            </Text>{" "}
            {"  "}
            metnini okudum. onaylıyorum. Tarafınızdan gönderilecek ticari
            elektronik iletileri almak istiyorum.{" "}
          </Text>
          <Text className="text-xs mx-6 py-6-4 text-neutral-600">
            <TouchableOpacity>
              {"  "}
              <Text className="text-sm text-neutral-950 font-bold underline">
                Üyelik sözleşmesini
              </Text>
            </TouchableOpacity>{" "}
            ve{" "}
            <TouchableOpacity>
              {"   "}
              <Text className="text-sm text-neutral-950 font-bold underline">
                KVKK Aydınlatma Metnini okudum
              </Text>
            </TouchableOpacity>
            kabul ediyorum.
          </Text>
          <Text className="text-sm px-6 py-5 w-full ">
            Zaten hesabınız var mı?{"   "}
            <TouchableOpacity onPress={() => navigation.navigate('LogScreen')}>
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
