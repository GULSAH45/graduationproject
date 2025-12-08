import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import PrevIcon from "@svgs/PrevIcon";
import { useNavigation } from "@react-navigation/native";

import DropDownFlag from "@svgs/DropDownFlag";
import FlagSvg from "@svgs/FlagSvg";
import CheckSvg from "@svgs/checkSvg";
import { useAuthStore } from "@/stores/useAuthStore";

const AccountInfoScreen = () => {
  const navigation = useNavigation();
  const { currentUser, updateUser } = useAuthStore();
  
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isConsentChecked, setIsConsentChecked] = React.useState(false);

  // Load user data when component mounts or currentUser changes
  useEffect(() => {
    if (currentUser?.data) {
      setFirstName(currentUser.data.first_name || currentUser.data.firstName || "");
      setLastName(currentUser.data.last_name || currentUser.data.lastName || "");
      setPhone(currentUser.data.phone || "");
      setEmail(currentUser.data.email || "");
    } 
  }, [currentUser]);

  const handleSave = () => {
    // Validation: Check if consent is checked
    if (!isConsentChecked) {
      Alert.alert(
        "Onay Gerekli", 
        "Bilgilerinizi güncellemek için 'Ticari Elektronik İleti Onayı' metnini okumalı ve onaylamalısınız."
      );
      return;
    }

    // Validation: Check if any field has changed
    const hasChanges = 
      firstName !== (currentUser?.data?.first_name || currentUser?.data?.firstName || "") ||
      lastName !== (currentUser?.data?.last_name || currentUser?.data?.lastName || "") ||
      phone !== (currentUser?.data?.phone || "") ||
      email !== (currentUser?.data?.email || "");

    if (!hasChanges) {
      Alert.alert("Bilgi", "Değişiklik yapmadınız.");
      return;
    }

    // Update user data
    updateUser({
      data: {
        ...currentUser?.data,
        first_name: firstName,
        last_name: lastName,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
      }
    });
    
    Alert.alert("Başarılı", "Bilgiler güncellendi!");
  };

  return (
    <SafeAreaView className="flex-1">
      <View>
        <View className="flex-row items-center mx-2 my-4">
          <TouchableOpacity
           onPress={() => navigation.navigate("HomeTabs", { screen: "MenuListScreen" })}
          >
            <PrevIcon />
          </TouchableOpacity>
          <Text className="text-black text-md font-semibold ml-2">
            Hesap Bilgileri
          </Text>
        </View>

        {/* Formssection */}

        <View className="flex-col mx-6">
          <View className="flex-row justify-between ">
            <View className="flex-1 mr-2">
              <Text className="my-3 text-md">Ad</Text>
              <View
                className="bg-InputBackground border
               border-TextInputBorderColor
               rounded-md justify-center h-[50px] "
              >
                <TextInput 
                  className="p-4 flex-1" 
                  placeholder="Adınızı giriniz"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </View>

            <View className="flex-1 ml-2">
              <Text className="my-3 text-md">Soyad</Text>
              <View className="bg-InputBackground border border-TextInputBorderColor rounded-md justify-center h-[50px]">
                <TextInput 
                  className="p-4 flex-1" 
                  placeholder="Soyadınızı giriniz"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>
          </View>

          <Text className="text-md my-5">Telefon</Text>
          <View className="bg-InputBackground border border-TextInputBorderColor rounded-md flex-row items-center h-[50px] px-2">
            <TouchableOpacity className="flex-row items-center mr-2">
              <FlagSvg />
              <DropDownFlag />
            </TouchableOpacity>
            <TextInput
              className="flex-1 p-2"
              placeholder="Telefon numaranızı giriniz"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <Text className="text-md my-5">Email</Text>
          <View className="bg-InputBackground border border-TextInputBorderColor rounded-md h-[50px] px-2 justify-center">
            <TextInput
              className="p-4 flex-1"
              placeholder="Email adresinizi giriniz"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View className="flex-row my-6 items-start mx-6">
          <TouchableOpacity onPress={() => setIsConsentChecked(!isConsentChecked)} className="mt-1">
            <View className={`w-5 h-5 border-2 rounded ${isConsentChecked ? 'bg-green-600 border-green-600' : 'border-gray-400'} items-center justify-center`}>
              {isConsentChecked && <CheckSvg />}
            </View>
          </TouchableOpacity>
          <View className="ml-3 flex-1">
            <Text className="text-sm text-gray-700">
              Kampanyalardan haberdar olmak için{" "}
              <Text 
                className="text-sm text-TextLoginButtonColor underline"
                onPress={() => Alert.alert("Ticari Elektronik İleti Onayı", "Kampanyalar ve promosyonlar hakkında bilgi almak için onay veriyorsunuz.")}
              >
                Ticari Elektronik İleti Onayı
              </Text>
              {" "}metnini okudum, onaylıyorum.
            </Text>
            <Text className="text-xs text-gray-500 mt-1">
              Tarafınızdan gönderilecek ticari elektronik iletileri almak istiyorum.
            </Text>
          </View>
        </View>

        <View className="items-center my-5">
          <TouchableOpacity
            className={`w-11/12 h-[55px] rounded-lg py-2 justify-center ${isConsentChecked ? 'bg-black' : 'bg-gray-400'}`}
            onPress={handleSave}
            disabled={!isConsentChecked}
          >
            <Text className="text-white text-lg font-bold text-center">
              Kaydet
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AccountInfoScreen;