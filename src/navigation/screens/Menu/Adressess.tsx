import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import PrevIcon from "@/svgs/PrevIcon";
import { getAddresses, deleteAddress, updateAddress, createAddress, Address } from "@/services/collections/Adresses";
import { useAuthStore } from "@/stores/useAuthStore";
import { listCountries, listRegions, listSubregions, Country, Region, Subregion } from "@/services/collections/World";
import AddressForm from "./Adresses/AddressForm";
import AddressList from "./Adresses/AddressList";

const Adressess = () => {
  const navigation = useNavigation();
  const { accessToken } = useAuthStore();

  // Form states
  const [addressTitle, setAddressTitle] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [apartmentFlat, setApartmentFlat] = useState("");
  const [phone, setPhone] = useState("");

  // Location states
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [subregions, setSubregions] = useState<Subregion[]>([]);

  // Pagination states
  const [countryOffset, setCountryOffset] = useState(0);
  const [hasMoreCountries, setHasMoreCountries] = useState(true);
  const [isFetchingCountries, setIsFetchingCountries] = useState(false);
  const [isFetchingRegions, setIsFetchingRegions] = useState(false);
  const [isFetchingSubregions, setIsFetchingSubregions] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedSubregion, setSelectedSubregion] = useState<Subregion | null>(null);

  // Modal states removed
  // const [modalVisible, setModalVisible] = useState(false);
  // const [modalType, setModalType] = useState<'country' | 'region' | 'subregion'>('country');

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
    fetchCountries();
  }, []);

  // Fetch functions
  const fetchCountries = async (offset = 0) => {
    if (isFetchingCountries) return;
    setIsFetchingCountries(true);
    try {
      const limit = 20; // Fetch 20 at a time
      const response = await listCountries(limit, offset);
      if (response.status === "success") {
        if (offset === 0) {
          setCountries(response.data.results);
        } else {
          setCountries(prev => [...prev, ...response.data.results]);
        }

        if (response.data.next) {
          setHasMoreCountries(true);
          setCountryOffset(offset + limit);
        } else {
          setHasMoreCountries(false);
        }
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setIsFetchingCountries(false);
    }
  };

  const loadMoreCountries = () => {
    if (hasMoreCountries && !isFetchingCountries) {
      fetchCountries(countryOffset);
    }
  };

  const fetchRegions = async (countryId: number) => {
    setIsFetchingRegions(true);
    try {
      const response = await listRegions(countryId);
      if (response.status === "success") {
        setRegions(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
    } finally {
      setIsFetchingRegions(false);
    }
  };

  const fetchSubregions = async (regionId: number) => {
    setIsFetchingSubregions(true);
    try {
      const response = await listSubregions(regionId);
      if (response.status === "success") {
        setSubregions(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching subregions:", error);
    } finally {
      setIsFetchingSubregions(false);
    }
  };

  const fetchAddresses = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const response = await getAddresses(accessToken);
      if (response.status === "success") {
        setAddresses(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      Alert.alert("Hata", "Adresler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // Selection handlers
  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setSelectedRegion(null);
    setSelectedSubregion(null);
    setRegions([]);
    setSubregions([]);
    fetchRegions(country.id);
  };

  const handleSelectRegion = (region: Region) => {
    setSelectedRegion(region);
    setSelectedSubregion(null);
    setSubregions([]);
    fetchSubregions(region.id);
  };

  const handleSelectSubregion = (subregion: Subregion) => {
    setSelectedSubregion(subregion);
  };

  // openModal function removed

  const handleSave = async () => {
    if (!accessToken) return;

    if (!selectedCountry || !selectedRegion || !selectedSubregion) {
      Alert.alert("Hata", "Lütfen ülke, şehir ve ilçe seçiniz.");
      return;
    }

    const commonData = {
      title: addressTitle,
      first_name: name,
      last_name: surname,
      full_address: address,
      phone_number: phone.startsWith("+90") ? phone : `+90${phone}`,
      country_id: selectedCountry.id,
      region_id: selectedRegion.id,
      subregion_id: selectedSubregion.id,
    };

    if (editingAddress) {
      // Update existing address
      try {
        await updateAddress(accessToken, editingAddress.id, commonData);
        Alert.alert("Başarılı", "Adres güncellendi.");
        fetchAddresses(); // Refresh list
      } catch (error) {
        console.error("Error updating address:", error);
        Alert.alert("Hata", "Adres güncellenirken bir hata oluştu.");
      }
    } else {
      // Add new address
      try {
        await createAddress(accessToken, commonData);
        Alert.alert("Başarılı", "Yeni adres eklendi.");
        fetchAddresses(); // Refresh list
      } catch (error: any) {
        console.error("Error creating address:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          Alert.alert("Hata", `Adres eklenemedi: ${JSON.stringify(error.response.data)}`);
        } else {
          Alert.alert("Hata", "Adres eklenirken bir hata oluştu.");
        }
      }
    }

    // Clear form
    resetForm();

    // After saving, hide the form
    setShowAddressForm(false);
  };

  const handleEdit = async (id: string) => {
    const addressToEdit = addresses.find((addr) => addr.id === id);
    if (addressToEdit) {
      setEditingAddress(addressToEdit);
      setAddressTitle(addressToEdit.title);
      setName(addressToEdit.first_name);
      setSurname(addressToEdit.last_name);
      setAddress(addressToEdit.full_address);
      setApartmentFlat(""); // Not in API response
      setPhone(addressToEdit.phone_number);

      // Set location data
      setSelectedCountry(addressToEdit.country);
      setSelectedRegion(addressToEdit.region);
      setSelectedSubregion(addressToEdit.subregion);

      // Trigger fetches to populate lists
      if (addressToEdit.country) {
        await fetchRegions(addressToEdit.country.id);
      }
      if (addressToEdit.region) {
        await fetchSubregions(addressToEdit.region.id);
      }

      setShowAddressForm(true);
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
          onPress: async () => {
            if (!accessToken) return;
            try {
              await deleteAddress(accessToken, id);
              Alert.alert("Başarılı", "Adres silindi.");
              fetchAddresses(); // Refresh list
            } catch (error) {
              console.error("Error deleting address:", error);
              Alert.alert("Hata", "Adres silinirken bir hata oluştu.");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  // renderModalItem function removed

  const resetForm = () => {
    setAddressTitle("");
    setName("");
    setSurname("");
    setAddress("");
    setApartmentFlat("");
    setPhone("");
    setSelectedCountry(null);
    setSelectedRegion(null);
    setSelectedSubregion(null);
    setEditingAddress(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between mx-2 mt-4 my-4">
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeTabs", { screen: "MenuListScreen" })}
        >
          <PrevIcon />
        </TouchableOpacity>
        <Text onPress={() => {
          setShowAddressForm(false);
          resetForm();
        }} className="text-black text-md font-semibold ml-2">Adreslerim</Text>
        {addresses.length > 0 && !showAddressForm && (
          <TouchableOpacity onPress={() => {
            resetForm();
            setShowAddressForm(true);
          }}>
            <Text className="text-blue-500 font-semibold">Yeni Adres Ekle</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView className="flex-1">
        {showAddressForm ? (
          <AddressForm
            addressTitle={addressTitle}
            setAddressTitle={setAddressTitle}
            name={name}
            setName={setName}
            surname={surname}
            setSurname={setSurname}
            address={address}
            setAddress={setAddress}
            apartmentFlat={apartmentFlat}
            setApartmentFlat={setApartmentFlat}
            phone={phone}
            setPhone={setPhone}
            selectedCountry={selectedCountry}
            handleSelectCountry={handleSelectCountry}
            selectedRegion={selectedRegion}
            handleSelectRegion={handleSelectRegion}
            selectedSubregion={selectedSubregion}
            handleSelectSubregion={handleSelectSubregion}
            countries={countries}
            regions={regions}
            subregions={subregions}
            loadMoreCountries={loadMoreCountries}
            isFetchingCountries={isFetchingCountries}
            isFetchingRegions={isFetchingRegions}
            isFetchingSubregions={isFetchingSubregions}
            handleSave={handleSave}
            editingAddress={editingAddress}
          />
        ) : (
          <AddressList
            addresses={addresses}
            loading={loading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setShowAddressForm={setShowAddressForm}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Adressess;