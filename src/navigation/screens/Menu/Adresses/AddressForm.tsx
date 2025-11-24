import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import FlagSvg from "@/svgs/FlagSvg";
import DropDownFlag from "@/svgs/DropDownFlag";
import Dropdown from "@/components/Dropdown";
import { Country, Region, Subregion } from "@/services/collections/World";
import { Address } from "@/services/collections/Adresses";

interface AddressFormProps {
    addressTitle: string;
    setAddressTitle: (text: string) => void;
    name: string;
    setName: (text: string) => void;
    surname: string;
    setSurname: (text: string) => void;
    address: string;
    setAddress: (text: string) => void;
    apartmentFlat: string;
    setApartmentFlat: (text: string) => void;
    phone: string;
    setPhone: (text: string) => void;
    selectedCountry: Country | null;
    handleSelectCountry: (item: Country) => void;
    selectedRegion: Region | null;
    handleSelectRegion: (item: Region) => void;
    selectedSubregion: Subregion | null;
    handleSelectSubregion: (item: Subregion) => void;
    countries: Country[];
    regions: Region[];
    subregions: Subregion[];
    loadMoreCountries: () => void;
    isFetchingCountries: boolean;
    isFetchingRegions: boolean;
    isFetchingSubregions: boolean;
    handleSave: () => void;
    editingAddress: Address | null;
}

const AddressForm: React.FC<AddressFormProps> = ({
    addressTitle,
    setAddressTitle,
    name,
    setName,
    surname,
    setSurname,
    address,
    setAddress,
    apartmentFlat,
    setApartmentFlat,
    phone,
    setPhone,
    selectedCountry,
    handleSelectCountry,
    selectedRegion,
    handleSelectRegion,
    selectedSubregion,
    handleSelectSubregion,
    countries,
    regions,
    subregions,
    loadMoreCountries,
    isFetchingCountries,
    isFetchingRegions,
    isFetchingSubregions,
    handleSave,
    editingAddress,
}) => {
    return (
        <View>
            <View className="mx-6 py-3 my-4">
                <Text className="self-start text-md my-2">Adres Başlığı</Text>
                <TextInput
                    className="bg-InputBackground border p-4 border-TextInputBorderColor w-full h-[50px] rounded"
                    placeholder="ev, iş vb..."
                    value={addressTitle}
                    onChangeText={setAddressTitle}
                />
                <Text className="self-start text-md my-2">Ad</Text>
                <TextInput
                    className="bg-InputBackground border p-4 border-TextInputBorderColor w-full h-[50px] rounded"
                    placeholder=""
                    value={name}
                    onChangeText={setName}
                />
                <Text className="self-start text-md my-2">Soyad</Text>
                <TextInput
                    className="bg-InputBackground border border-TextInputBorderColor my-2 w-full h-[50px] rounded p-4"
                    placeholder=""
                    value={surname}
                    onChangeText={setSurname}
                />

                {/* Country Selector */}
                <Text className="self-start text-md my-2">Ülke</Text>
                <View className="z-30">
                    <Dropdown
                        data={countries}
                        selectedItem={selectedCountry}
                        onSelect={handleSelectCountry}
                        placeholder="Ülke Seçiniz"
                        labelExtractor={(item) => item.name}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={loadMoreCountries}
                        isLoading={isFetchingCountries}
                    />
                </View>

                {/* Region Selector */}
                <Text className="self-start text-md my-2">Şehir</Text>
                <View className="z-20">
                    <Dropdown
                        data={regions}
                        selectedItem={selectedRegion}
                        onSelect={handleSelectRegion}
                        placeholder="Şehir Seçiniz"
                        labelExtractor={(item) => item.name}
                        keyExtractor={(item) => item.id.toString()}
                        disabled={!selectedCountry}
                        isLoading={isFetchingRegions}
                    />
                </View>

                {/* Subregion Selector */}
                <Text className="self-start text-md my-2">İlçe</Text>
                <View className="z-10">
                    <Dropdown
                        data={subregions}
                        selectedItem={selectedSubregion}
                        onSelect={handleSelectSubregion}
                        placeholder="İlçe Seçiniz"
                        labelExtractor={(item) => item.name}
                        keyExtractor={(item) => item.id.toString()}
                        disabled={!selectedRegion}
                        isLoading={isFetchingSubregions}
                    />
                </View>

                <Text className="self-start text-md my-2">Adres</Text>
                <TextInput
                    className="bg-InputBackground border p-4 border-TextInputBorderColor my-2 rounded w-full h-[50px]"
                    placeholder=""
                    value={address}
                    onChangeText={setAddress}
                />
                <Text className="self-start text-md my-2">Apartman, daire</Text>
                <TextInput
                    className="bg-InputBackground border border-TextInputBorderColor my-2 w-full h-[50px] rounded p-4"
                    placeholder=""
                    value={apartmentFlat}
                    onChangeText={setApartmentFlat}
                />

                <Text className="text-md my-2">Telefon</Text>
                <View className="bg-InputBackground border border-TextInputBorderColor rounded-md flex-row items-center w-full h-[50px] px-2">
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
            </View>
            <View className="items-center my-5">
                <TouchableOpacity
                    className="w-11/12 h-[55px] bg-black rounded-lg py-2 justify-center"
                    onPress={handleSave}
                >
                    <Text className="text-white text-lg font-bold text-center">
                        {editingAddress ? "Güncelle" : "Kaydet"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddressForm;