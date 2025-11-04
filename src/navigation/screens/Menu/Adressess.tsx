import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert, // Added Alert import
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PrevIcon from "@/svgs/PrevIcon";
import FlagSvg from "@/svgs/FlagSvg";
import DropDownFlag from "@/svgs/DropDownFlag";
import { mockAddresses, Address } from "@/data/Addresses"; // Import mock data and interface
import AntDesign from '@expo/vector-icons/AntDesign'; // For edit and delete icons

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
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showAddressForm, setShowAddressForm] = useState(false); // New state for form visibility
  const [editingAddress, setEditingAddress] = useState<Address | null>(null); // New state for editing

  const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1"; // Gerekirse burayı .env veya config dosyasından alabilirsin

  const handleSave = async () => {
    if (editingAddress) {
      // Update existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id
            ? {
                ...addr,
                adresBasligi,
                ad,
                soyad,
                adres,
                apartmanDaire,
                sehir,
                telefon,
              }
            : addr
        )
      );
      alert("Adres başarıyla güncellendi!");
    } else {
      // Add new address
      const newAddress: Address = {
        id: String(addresses.length + 1), // Simple ID generation
        adresBasligi,
        ad,
        soyad,
        adres,
        apartmanDaire,
        sehir,
        telefon,
      };
      setAddresses([...addresses, newAddress]);
      alert("Adres başarıyla kaydedildi!");
    }
    // Clear form
    setAdresBasligi("");
    setAd("");
    setSoyad("");
    setAdres("");
    setApartmanDaire("");
    setSehir("");
    setTelefon("");

    // After saving, hide the form and clear editing state
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleEdit = (id: string) => {
    const addressToEdit = addresses.find((addr) => addr.id === id);
    if (addressToEdit) {
      setEditingAddress(addressToEdit);
      setAdresBasligi(addressToEdit.adresBasligi);
      setAd(addressToEdit.ad);
      setSoyad(addressToEdit.soyad);
      setAdres(addressToEdit.adres);
      setApartmanDaire(addressToEdit.apartmanDaire);
      setSehir(addressToEdit.sehir);
      setTelefon(addressToEdit.telefon);
      setShowAddressForm(true); // Show the form for editing
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Adresi Sil",
      "Bu adresi silmek istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Sil",
          onPress: () => {
            setAddresses(addresses.filter((addr) => addr.id !== id));
            alert(`Address with ID: ${id} deleted.`);
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between mx-2 mt-4 my-4">
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeTabs", { screen: "MenuListScreen" })}
        >
          <PrevIcon />
        </TouchableOpacity>
        <Text className="text-black text-md font-semibold ml-2">Adreslerim</Text>
        {addresses.length > 0 && !showAddressForm && (
          <TouchableOpacity onPress={() => setShowAddressForm(true)}>
            <Text className="text-blue-500 font-semibold">Yeni Adres Ekle</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView className="flex-1">
        {
          showAddressForm || addresses.length === 0 ? (
            // Address form
            <View>
              <View className="mx-6 py-3 my-4">
                <Text className="self-start text-md my-2">Adres Başlığı</Text>
                <TextInput
                  className="bg-InputBackground border p-4
             border-TextInputBorderColor w-full h-[50px] rounded"
                  placeholder="ev, iş vb..."
                  value={adresBasligi}
                  onChangeText={setAdresBasligi}
                />
                <Text className="self-start text-md my-2">Ad</Text>
                <TextInput
                  className="bg-InputBackground border p-4
             border-TextInputBorderColor w-full h-[50px] rounded"
                  placeholder=""
                  value={ad}
                  onChangeText={setAd}
                />
                <Text className="self-start text-md my-2">Soyad</Text>
                <TextInput
                  className="bg-InputBackground border
             border-TextInputBorderColor my-2 w-full h-[50px] rounded p-4"
                  placeholder=""
                  value={soyad}
                  onChangeText={setSoyad}
                />
                <Text className="self-start text-md my-2">Adres</Text>
                <TextInput
                  className="bg-InputBackground border p-4
             border-TextInputBorderColor my-2 rounded w-full h-[50px]"
                  placeholder=""
                  value={adres}
                  onChangeText={setAdres}
                />
                <Text className="self-start text-md my-2">Apartman, daire</Text>
                <TextInput
                  className="bg-InputBackground border border-TextInputBorderColor 
            my-2 w-full h-[50px] rounded p-4"
                  placeholder=""
                  value={apartmanDaire}
                  onChangeText={setApartmanDaire}
                />
                <Text className="self-start text-md my-2">Şehir</Text>
                <TextInput
                  className="bg-InputBackground border
             border-TextInputBorderColor my-2 w-full h-[50px] rounded p-4"
                  placeholder=""
                  value={sehir}
                  onChangeText={setSehir}
                />


                <Text className="text-md my-2">Telefon</Text>
                <View className="bg-InputBackground border
         border-TextInputBorderColor rounded-md 
         flex-row items-center w-full h-[50px] px-2">
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
              <View className="items-center my-5">
                <TouchableOpacity className="w-11/12 h-[55px] 
             bg-black rounded-lg py-2 justify-center" onPress={handleSave}>
                  <Text className="text-white text-lg font-bold text-center">
                    {editingAddress ? "Güncelle" : "Kaydet"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // Existing Addresses List
            <View className="mx-6 mt-4">
              <Text className="text-lg font-bold mb-3">Kaydedilen Adresler</Text>
              {addresses.length === 0 ? (
                <Text className="text-gray-500">Henüz adres kaydedilmemiş.</Text>
              ) : (
                addresses.map((addr) => (
                  <View key={addr.id} className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="font-bold text-lg">{addr.adresBasligi}</Text>
                      <View className="flex-row">
                        <TouchableOpacity onPress={() => handleEdit(addr.id)} className="p-2">
                          <AntDesign name="edit" size={20} color="#4CAF50" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(addr.id)} className="p-2 ml-2">
                          <AntDesign name="delete" size={20} color="#F44336" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text className="text-base text-gray-700">{addr.ad} {addr.soyad}</Text>
                    <Text className="text-base text-gray-700">{addr.adres}, {addr.apartmanDaire}</Text>
                    <Text className="text-base text-gray-700">{addr.sehir}</Text>
                    <Text className="text-base text-gray-700">Tel: {addr.telefon}</Text>
                  </View>
                ))
              )}
            </View>
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Adressess;
