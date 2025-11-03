import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PrevIcon from "../../../svgs/PrevIcon";
import FlagSvg from "../../../svgs/FlagSvg";
import DropDownFlag from "../../../svgs/DropDownFlag";

const Adressess = () => {
  const navigation = useNavigation();
  // State'ler bu sayıda input griliyo. 
  const [adresBasligi, setAdresBasligi] = useState("");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [adres, setAdres] = useState("");
  const [apartmanDaire, setApartmanDaire] = useState("");
  const [sehir, setSehir] = useState("");
  const [telefon, setTelefon] = useState("");

  const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1"; // Gerekirse burayı .env veya config dosyasından alabilirsin

  const handleSave = async () => {
    const adresData = {
      adresBasligi,
      ad,
      soyad,
      adres,
      apartmanDaire,
      sehir,
      telefon,
    };
    try {
      const response = await fetch(`${base_url }/users/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //bi otorizasyonla girip o hesaba o adresin eklenmesi için
          // Authorization: `Bearer ${token}` // Eğer token gerekiyorsa ekle
        },
        body: JSON.stringify(adresData),
      });
      if (response.ok) {
        // Başarılı
        alert("Adres başarıyla kaydedildi!");
        // İstersen inputları temizleyebilirsin veya başka bir ekrana yönlendirebilirsin
      } else {
        // Hata şuan düzgün otorizasyon yok. ondan hata aptlatıyo
        const errorData = await response.json();
        alert(`Hata: ${errorData.message || "Adres kaydedilemedi."}`);
      }
    } catch (error) {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(error);
    }
  };

  return (
    <View>
      //şuan girilen adresler hesaba bir kart olarak tutulmuyor 
      //sadece bilgileri alıyor konsola basıyor. 
      <SafeAreaView>
        <View className="flex-row items-center mx-2 mt-4 my-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeTabs", { screen: "MenuListScreen" })}
          >
            <PrevIcon />
          </TouchableOpacity>
          <Text className="text-black text-md font-semibold ml-2">
            Adres Oluştur
          </Text>
        </View>
        <View className="mx-5 py-3 my-4 items-center">
          <Text className="self-start">Adres Başlığı</Text>
          <TextInput
            className="bg-InputBackground border p-4
             border-TextInputBorderColor w-[388px] h-[50px] my-4 rounded"
            placeholder="ev, iş vb..."
            value={adresBasligi}
            onChangeText={setAdresBasligi}
          />
          <Text className="self-start">Ad</Text>
          <TextInput
            className="bg-InputBackground border p-4
             border-TextInputBorderColor w-[388px] h-[50px] my-4 rounded"
            placeholder=""
            value={ad}
            onChangeText={setAd}
          />
          <Text className="self-start">Soyad</Text>
          <TextInput
            className="bg-InputBackground border
             border-TextInputBorderColor my-4 w-[388px] h-[50px] rounded p-4"
            placeholder=""
            value={soyad}
            onChangeText={setSoyad}
          />
          <Text className="self-start">Adres</Text>
          <TextInput
            className="bg-InputBackground border p-4
             border-TextInputBorderColor my-4 rounded w-[388px] h-[50px]"
            placeholder=""
            value={adres}
            onChangeText={setAdres}
          />
          <Text className="self-start">Apartman, daire</Text>
          <TextInput
            className="bg-InputBackground border border-TextInputBorderColor 
            my-4 w-[388px] h-[50px] rounded p-4"
            placeholder=""
            value={apartmanDaire}
            onChangeText={setApartmanDaire}
          />
          <Text className="self-start">Şehir</Text>
          <TextInput
            className="bg-InputBackground border
             border-TextInputBorderColor my-4 w-[388px] h-[50px] rounded p-4"
            placeholder=""
            value={sehir}
            onChangeText={setSehir}
          />


        <Text className="text-sm mx-7 my-5">Telefon</Text>
        <View className="bg-InputBackground border
         border-TextInputBorderColor rounded-md 
         flex-row items-center w-[388px] h-[50px] mx-6 px-2">
          <TouchableOpacity className="flex-row items-center mr-2">
            <FlagSvg />
            <DropDownFlag />
          </TouchableOpacity>
          <TextInput
            className="flex-1 p-2"
            placeholder="Telefon numaranızı giriniz"
            keyboardType="phone-pad"
            value={telefon}
            onChangeText={setTelefon}
          />
        </View>

       
        </View>
           <View className=" my-5">
            <TouchableOpacity className="items-center w-[101px] h-[55px] 
             bg-black rounded-lg py-2" onPress={handleSave}>
              <Text className="text-white text-lg font-bold text-center">
        Kaydet
              </Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    </View>
  )
}

export default Adressess;
