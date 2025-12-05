import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,

  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBarComp from "@components/SearchBarComp";
import { Product, CategoryParams } from "@/types/Product";  
import { IMAGE_URL } from "../ProductDetailPage";
import NextIcon from "@svgs/NextIcon";

const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

// sorguyu girme işi, yüklenmesi, sonuç dönmesi ve hata durumu
const SearchScreen = () => {
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<CategoryParams[]>([]);

  const navigation = useNavigation();

  // Kategorileri çek
  useEffect(() => {
    fetch(`${base_url}/categories`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data.data)) {
          setCategories(data.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  // aramayı yaoma işi
  const handleSearch = async (text: string) => {
    setQuery(text);
    //sorguya bi text girildiğinde yüklenme işi true olursa

    setLoading(true);
    setError("");

    try {
      //byük küçük sorunu olmadan text girildiğinde  eğer sonuç dönüyorsa
      const searchText = text.toLowerCase().trim();
      if (!text) {
        setResults([]);
        setLoading(false);
        return;
      }

      // Kategori slug kontrolü - eğer arama kategori slug'ı ile eşleşiyorsa direkt yönlendir
      const matchedCategory = categories.find(
        (cat) => cat.slug.toLowerCase() === searchText || cat.name.toLowerCase() === searchText
      );

      if (matchedCategory) {
        // Kategori bulundu, direkt kategori sayfasına yönlendir
        setLoading(false);
        navigation.navigate('CategoryPage', {
          categoryId: matchedCategory.id,
          categoryName: matchedCategory.name,
          categorySlug: matchedCategory.slug,
        });
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetailPage", { productSlug: item.slug })
            }
            className="flex-row items-center justify-between border-b h-25 border-gray-200 py-3"
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: IMAGE_URL + item.photo_src }}
                style={{
                  width: 108,
                  height: 108,
                  borderRadius: 5,
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
               
              </View>
            </View>
          
            { <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetailPage", { productId: item.slug })
              }
              className="p-2"
            >
              <NextIcon className="font-semibold w-6 h-6" fill="red"/>
            </TouchableOpacity> }
          </TouchableOpacity>
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