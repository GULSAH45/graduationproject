import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, FlatList, ActivityIndicator } from "react-native";
import SearchBarComp from "../../../components/SearchBarComp";


const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

//fetch yapılacak adres 

 const  fetchedSearchScreenPath = `${base_url}/products/search?query=`;

// Ürün tipi tanımı
interface Product {
  id: string;
  name: string;
  short_explanation: string;
  slug: string;
  price_info: {
    profit: number | null;
    total_price: number;
    discounted_price: number | null;
    price_per_servings: number;
    discount_percentage: number | null;
  };
  photo_src: string;
  comment_count: number;
  average_star: number;
}

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (!text) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(fetchedSearchScreenPath + encodeURIComponent(text));
      const data = await response.json();
      if (response.ok && data && data.results) {
        setResults(data.results);
      } else {
        setResults([]);
        setError("Sonuç bulunamadı.");
      }
    } catch (e) {
      setError("Arama sırasında hata oluştu.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="mx-5">
      <Image
        source={require("../../../assets/LOGO.png")}
        className="w-[119px] h-[26px] mb-3 mt-3"
        resizeMode="contain"
      />
      {/* SearchBarComp'a value ve onChangeText prop'u eklenmeli */}
      <SearchBarComp value={query} onChangeText={handleSearch} />
      {loading && <ActivityIndicator className="mt-4" />}
      {error ? <Text className="text-red-500 mt-4">{error}</Text> : null}
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center border-b border-gray-200 py-3">
            <Image
              source={{ uri: base_url + item.photo_src }}
              style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
            />
            <View className="flex-1">
              <Text className="text-base font-bold">{item.name}</Text>
              <Text className="text-xs text-gray-500">{item.short_explanation}</Text>
              <Text className="text-sm text-black mt-1 font-semibold">{item.price_info.total_price} TL</Text>
              <Text className="text-xs text-yellow-600">⭐ {item.average_star} ({item.comment_count} yorum)</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={!loading && !error ? <Text className="text-center mt-8 text-gray-400">Ürün bulunamadı.</Text> : null}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
