import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Address } from "@/services/collections/Adresses";

interface AddressListProps {
    addresses: Address[];
    loading: boolean;
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
    setShowAddressForm: (show: boolean) => void;
}

const AddressList: React.FC<AddressListProps> = ({
    addresses,
    loading,
    handleEdit,
    handleDelete,
    setShowAddressForm,
}) => {
    return (
        <View className="mx-6 mt-4">
            <Text className="text-lg font-bold mb-3">Kaydedilen Adresler</Text>
            {loading ? (
                <Text className="text-gray-500">Yükleniyor...</Text>
            ) : addresses.length === 0 ? (
                <View>
                    <Text className="text-gray-500 mb-4">Henüz adres kaydedilmemiş.</Text>
                    <TouchableOpacity onPress={() => setShowAddressForm(true)}>
                        <Text className="text-blue-500 font-semibold">İlk Adresini Ekle</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                addresses.map((addr) => (
                    <View key={addr.id} className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="font-bold text-lg">{addr.title}</Text>
                            <View className="flex-row">
                                <TouchableOpacity onPress={() => handleEdit(addr.id)} className="p-2">
                                    <AntDesign name="edit" size={20} color="#4CAF50" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(addr.id)} className="p-2 ml-2">
                                    <AntDesign name="delete" size={20} color="#F44336" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text className="text-base text-gray-700">
                            {addr.first_name} {addr.last_name}
                        </Text>
                        <Text className="text-base text-gray-700">{addr.full_address}</Text>
                        <Text className="text-base text-gray-700">
                            {addr.subregion?.name ? `${addr.subregion.name}, ` : ""}
                            {addr.region?.name}, {addr.country?.name}
                        </Text>
                        <Text className="text-base text-gray-700">Tel: {addr.phone_number}</Text>
                    </View>
                ))
            )}
        </View>
    );
};

export default AddressList;
