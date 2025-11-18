import { View, Text, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrevIcon from '@/svgs/PrevIcon'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Product, CategoryPageRouteParams } from "@/types/Product"
import AntDesign from "@expo/vector-icons/AntDesign";

const CategoryPage = () => {
  const navigation = useNavigation()
  const route = useRoute()

  // Route params'tan kategori bilgilerini al
  const { categoryId, categoryName, categorySlug } = route.params as CategoryPageRouteParams

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url;
        if (categorySlug === "vitamin") {
          url = `https://fe1111.projects.academy.onlyjs.com/api/v1/products?limit=20&offset=0&search=vitamin`;
        } else if (categorySlug === "tum-urunler") {
          url = `https://fe1111.projects.academy.onlyjs.com/api/v1/products?limit=100&offset=0`;
        } else {
          url = `https://fe1111.projects.academy.onlyjs.com/api/v1/products?limit=20&offset=0&main_category=${categoryId}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Veri çekilemedi: ${response.status} ${text}`);
        }
        const data = await response.json();
        let results: any[] = [];
        if (Array.isArray(data.data?.results)) {
          results = data.data.results;
        } else if (Array.isArray(data.data?.data)) {
          results = data.data.data;
        } else if (Array.isArray(data.data)) {
          results = data.data;
        } else if (Array.isArray(data)) {
          results = data;
        }
        setProducts(results);
      } catch (err: any) {
        console.error('Category fetch error:', err);
        setError(err.message || 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId, categorySlug]);

  return (
    <SafeAreaView>
      <View className="px-3">
        <Image
          source={require("../../../assets/LOGO.png")}
          className="w-[119px] h-[26px] mb-3 mt-3"
          resizeMode="contain"
        />
      </View>

      <View className="flex-row items-center mx-2 mt-4 my-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PrevIcon />
        </TouchableOpacity>
        <Text className="text-black text-md font-semibold ml-2">
          {categoryName}
        </Text>
      </View>

      <View className="items-center">
        <Text className="text-black text-2xl font-semibold">{categoryName}</Text>
      </View>

      {loading && <Text className="text-center mt-4">Yükleniyor...</Text>}
      {error && (
        <Text className="text-center mt-4 text-red-500">Hata: {error}</Text>
      )}
      {!loading && !error && (
        <FlatList
          data={products}
          keyExtractor={(item, idx) =>
            item.id ? item.id.toString() : idx.toString()
          }
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 8, paddingBottom: 3}}
          columnWrapperStyle={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
          ListEmptyComponent={<Text>Ürün bulunamadı.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="mb-4 p-2"
              style={{
                width: '48%',
                alignSelf: 'flex-start',
                backgroundColor: '',
                borderRadius: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.07,
                shadowRadius: 2,
                elevation: 1,
              }}
              onPress={() =>
                navigation.navigate('ProductDetailPage', {
                  productId: item.id?.toString?.() || String(item.id),
                  productSlug: item.slug,
                })
              }
            >
              {item.photo_src && (
                <Image
                  source={{
                    uri: `https://fe1111.projects.academy.onlyjs.com${item.photo_src}`,
                  }}
                  style={{
                    width: '100%',
                    height: 100,
                    marginVertical: 8,
                    borderRadius: 18,
                  }}
                  resizeMode="contain"
                />
              )}
              <View className="items-center">
                <Text className="font-semibold text-lg mb-1 text-center">{item.name}</Text>
                {item.short_explanation && (
                  <Text className="text-gray-500 mb-1 text-center">
                    {item.short_explanation}
                  </Text>
                )}
                {typeof item.average_star === 'number' && (
                  <View className="flex-row justify-center mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <AntDesign
                        key={i}
                        name={i < Math.round(item.average_star) ? "star" : "staro"}
                        size={16}
                        color="#FFD700"
                        style={{ marginHorizontal: 1 }}
                      />
                    ))}
                  </View>
                )}
                {item.price_info?.total_price !== null && (
                  <Text className="text-black font-semibold mb-1 text-center">
                    {item.price_info.total_price} TL
                  </Text>
                )}
                {typeof item.comment_count === 'number' && item.comment_count > 0 && (
                  <Text className="text-gray-500 mb-1 text-center">
                    {item.comment_count} yorum
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  )
}

export default CategoryPage