import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBarComp from "@components/SearchBarComp";
import { Product } from "@/types/Product";  
import { IMAGE_URL } from "../ProductDetailPage";
import NextIcon from "@svgs/NextIcon";

const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

// sorguyu girme işi, yüklenmesi, sonuç dönmesi ve hata durumu
const SearchScreen = () => {
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();
  // aramayı yaoma işi
  const handleSearch = async (text: string) => {
    setQuery(text);
    //sorguya bi text girildiğinde yüklenme işi true olursa

    setLoading(true);
    setError("");

    try {
      //byük küçük sorunu olmadan text girildiğinde  eğer sonuç dönüyorsa
      const searchText = text.toLowerCase();
      if (!text) {
        setResults([]);
        return;
      }
      // api den çekilen kısım bu
      let url = `${base_url}/products${searchText ? `?search=${encodeURIComponent(searchText)}` : ""
        }`;

      const response = await fetch(url);
      // dönen şeyi json formatına çevirme işi
      const rawText = await response.json();
      //eğer cevap dönmüyorsa hata mesajı ver
      if (!response.ok || !rawText) {
        setError("Arama sırasında sunucudan geçerli bir yanıt alınamadı.");
        setResults
          ([]);
        return;
      }
      // eğer data döndüyse
      let data;
      try {
        // dönen data rawtext data eşleşiyor  ise hatayı yakalayıp hata mesajı ver
        data = rawText.data || [];
      } catch (jsonError) {
        setError("Sunucudan beklenmeyen bir yanıt alındı.");
        setResults([]);
        return;
      }

      setResults(data || []); // Şimdilik sadece logluyoruz bakalım ne geliyor
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
        source={require("@/assets/LOGO.png")}
        className="w-[119px] h-[26px] mb-3 mt-3"
        resizeMode="contain"
      />
      //value ya query yazılır ve onChangeText ile text girildiğinde
      handleSearch ile arama yapılır
      <SearchBarComp value={query} onChangeText={handleSearch} />
      {loading && <ActivityIndicator className="mt-4" />}
      {error ? <Text className="text-red-500 mt-4">{error}</Text> : null}
      <FlatList
        data={results}

        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
            <View className="flex-row items-center">
              <Image
                source={{ uri: IMAGE_URL + item.photo_src }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  marginRight: 12,
                }}
              />
              <View className="flex-1">
                <Text className="text-base font-bold">{item.name}</Text>
                <Text className="text-xs text-gray-500">
                  {item.short_explanation}
                </Text>
                <Text className="text-sm text-black mt-1 font-semibold">
                  {item.price_info.total_price} TL
                </Text>
                <Text className="text-xs text-yellow-600">
                  ⭐ {item.average_star} ({item.comment_count} yorum)
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetailPage", { productId: item.slug })
              }
              className="p-2"
            >
              <NextIcon />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          //aranan  şey karşılıksızsa
          !loading && !error && query.length > 0 ? (
            <Text className="text-center mt-8 text-gray-400">
              Ürün bulunamadı.
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  )
}

export default SearchScreen;