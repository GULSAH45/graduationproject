import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface DropdownProps<T> {
    data: T[];
    selectedItem: T | null;
    onSelect: (item: T) => void;
    placeholder: string;
    labelExtractor: (item: T) => string;
    keyExtractor: (item: T) => string;
    onEndReached?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

const Dropdown = <T,>({
    data,
    selectedItem,
    onSelect,
    placeholder,
    labelExtractor,
    keyExtractor,
    onEndReached,
    isLoading,
    disabled = false,
}: DropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    const [searchText, setSearchText] = useState("");

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) { // If opening, reset search text
                setSearchText("");
            }
        }
    };

    const handleSelect = (item: T) => {
        onSelect(item);
        setIsOpen(false);
        setSearchText(""); // Reset search on select
    };

    const filteredData = data.filter((item) =>
        labelExtractor(item).toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View className="my-2 z-50">
            <TouchableOpacity
                className={`bg-InputBackground border border-TextInputBorderColor w-full h-[50px] rounded p-4 flex-row justify-between items-center ${disabled ? 'opacity-50' : ''}`}
                onPress={toggleDropdown}
                activeOpacity={0.7}
            >
                <Text className={selectedItem ? "text-black" : "text-gray-400"}>
                    {selectedItem ? labelExtractor(selectedItem) : placeholder}
                </Text>
                <AntDesign name={isOpen ? "up" : "down"} size={16} color="gray" />
            </TouchableOpacity>

            {isOpen && (
                <View className="bg-white border border-gray-200 rounded mt-1 max-h-60 w-full absolute top-[50px] z-50 shadow-lg">
                    <View className="p-2 border-b border-gray-100">
                        <TextInput
                            className="bg-gray-50 rounded p-2 text-sm"
                            placeholder="Ara..."
                            value={searchText}
                            onChangeText={setSearchText}
                            autoFocus={true}
                        />
                    </View>
                    <FlatList
                        data={filteredData}
                        keyExtractor={keyExtractor}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="p-4 border-b border-gray-100 active:bg-gray-50"
                                onPress={() => {
                                    handleSelect(item);
                                    setSearchText(""); // Reset search on select
                                }}
                            >
                                <Text className="text-black">{labelExtractor(item)}</Text>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={!isLoading ? <Text className="p-4 text-gray-500 text-center">Veri bulunamadı</Text> : null}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={isLoading ? <ActivityIndicator size="small" color="#0000ff" className="my-2" /> : null}
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                    />
                </View>
            )}
        </View>
    );
};

export default Dropdown;
