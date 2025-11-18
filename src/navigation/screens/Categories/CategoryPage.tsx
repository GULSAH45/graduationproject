import { View, Text, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrevIcon from '@/svgs/PrevIcon'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Product, CategoryPageRouteParams } from "@/types/Product"

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
        <ScrollView>
          <View className="flex-row">
            <FlatList
              data={products}
              keyExtractor={(item, idx) =>
                item.id ? item.id.toString() : idx.toString()
              }
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              ListEmptyComponent={<Text>Ürün bulunamadı.</Text>}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="mb-4 p-2 border-b border-gray-200"
                  style={{ width: '48%', alignSelf: 'flex-start' }}
                  onPress={() => navigation.navigate('ProductDetailPage', { productId: item.id?.toString?.() || String(item.id), productSlug: item.slug })}
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
                  <Text className="font-semibold text-lg">{item.name}</Text>
                  <View className="items-center">
                    {item.short_explanation && (
                      <Text className="text-gray-600 mb-1 text-center">
                        {item.short_explanation}
                      </Text>
                    )}
                    {item.price_info?.total_price !== null && (
                      <Text className="text-gray-700">
                        Fiyat: {item.price_info.total_price} TL
                      </Text>
                    )}
                    {typeof item.average_star === 'number' && (
                      <Text className="text-yellow-600">
                        Yıldız: {item.average_star} ⭐
                      </Text>
                    )}
                    {typeof item.comment_count === 'number' && (
                      <Text className="text-gray-500">
                        Yorum: {item.comment_count}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default CategoryPage