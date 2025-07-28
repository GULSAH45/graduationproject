import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrevIcon from '../../../svgs/PrevIcon'
import { useNavigation } from '@react-navigation/native';


  // apiden ürün çekerken  bu 3 şey lazım biliyosun
  



  const GidaPage = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigation = useNavigation();

    useEffect(() => {
      //çekelim verileri
      const fetchProducts = async () => { 
        try {
          // Doğru endpoint ve parametrelerle çek
          const response = await fetch(
            "https://fe1111.projects.academy.onlyjs.com/api/v1/products?limit=20&offset=0&main_category=d3cdcefe-eedd-4ee0-a254-b821ed4e2b8c"
          );
          //eğer sonuç ok değilse
          if (!response.ok) throw new Error("Veri çekilemedi");
          //data geliyorsa json a çevir
          const data = await response.json();
          //ve bi konsola bas da bak bakalım
          console.log("API DATA:", data);
          //dönen şeyin results arrayi olup olmadığını kontrol et
          setProducts(Array.isArray(data.data?.results) ? data.data.results : []);
        } catch (err: any) {
          //sıkıntı varsa hatayı yazdır
          setError(err.message || "Bilinmeyen hata");
        } finally {
          //her durumda çekmeyi sonlandır
          setLoading(false);
        }
      };
      fetchProducts();
    }, []);

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
          
          <TouchableOpacity
           onPress={() => navigation.goBack()}
          >
            <PrevIcon />
          </TouchableOpacity>
          <Text className="text-black text-md font-semibold ml-2">
   Gıda
          </Text>
        </View>

<View className="items-center">
        //ürünleri burdan itibaren basıyoruz{" "}
        <Text className="text-black text-2xl font-semibold">Gıda</Text>
      </View>
      //
      {loading && <Text className="text-center mt-4">Yükleniyor...</Text>}
      {error && (
        <Text className="text-center mt-4 text-red-500">Hata: {error}</Text>
      )}
      {!loading && !error && (
        <ScrollView>
          <View className="flex-row">
            <FlatList
              data={products}
              keyExtractor={(item: any, idx: number) =>
                item.id ? item.id.toString() : idx.toString()
              }
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              ListEmptyComponent={<Text>Ürün bulunamadı.</Text>}
              renderItem={({ item }: { item: any }) => (
                <TouchableOpacity
                  className="mb-4 p-2 border-b border-gray-200"
                  style={{ width: "48%", alignSelf: "flex-start" }}
                  onPress={() => navigation.navigate('ProductDetailPage', { product: item })}
                >
                  {item.photo_src && (
                    <Image
                      source={{
                        uri: `https://fe1111.projects.academy.onlyjs.com${item.photo_src}`,
                      }}
                      style={{
                        width: "100%",
                        height: 100,
                        marginVertical: 8,
                        borderRadius: 10,
                      }}
                      resizeMode="contain"
                    />
                  )}
                  <Text className="font-semibold text-lg">{item.name}</Text>
                  <View className="items-center">
                    {item.short_explanation && (
                      <Text className="text-gray-600 mb-1">
                        {item.short_explanation}
                      </Text>
                    )}
                    {item.price_info && item.price_info.total_price && (
                      <Text className="text-gray-700">
                        Fiyat: {item.price_info.total_price} TL
                      </Text>
                    )}
                    {typeof item.average_star === "number" && (
                      <Text className="text-yellow-600">
                        Yıldız: {item.average_star} ⭐
                      </Text>
                    )}
                    {typeof item.comment_count === "number" && (
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

export default GidaPage;