import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import PrevIcon from '../../../svgs/PrevIcon'
import { useNavigation } from '@react-navigation/native'

const SporGidalariPage = () => {
  const navigation = useNavigation();
  // bu 3 ü muhakkak lazım biliyosun. 
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
// bu apiyi categories den spor gıdalarının id sini alıp product ın 
// main kategory kısmına postmanda ekleyerl elde ettik


          'https://fe1111.projects.academy.onlyjs.com/api/v1/products?limit=20&offset=0&main_category=d3cdcefe-eedd-4ee0-a254-b821ed4e2b8c'
        );
        if (!response.ok) throw new Error('Veri çekilemedi');
        const data = await response.json();
        console.log('SPOR GIDALARI API DATA:', data);
        // Doğru veri konumu: data.data.results 
        // az önce postman den gelen result ı koymayınca çekemedik mesela
        setProducts(Array.isArray(data.data.results) ? data.data.results : []);
      } catch (err: any) {
        setError(err.message || 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <SafeAreaView>
      <View className="px-3">
        <Image
          source={require('../../../assets/LOGO.png')}
          className="w-[119px] h-[26px] mb-3 mt-3"
          resizeMode="contain"
        />
      </View>
      <View className="flex-row items-center mx-2 mt-4 my-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PrevIcon />
        </TouchableOpacity>
        <Text className="text-black text-md font-semibold ml-2">Spor Gıdaları</Text>
      </View>
      <View className="items-center">
        <Text className="text-black text-2xl font-semibold">Spor Gıdaları</Text>
      </View>
      {loading && <Text className="text-center mt-4">Yükleniyor...</Text>}
      {error && (
        <Text className="text-center mt-4 text-red-500">Hata: {error}</Text>
      )}
      {!loading && !error && (
        <ScrollView>
          <View className="flex-row">
          //çeklenlri flatlistte gösterelim
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
                  onPress={() => navigation.navigate('ProductDetailPage', { product: item })}
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
//resim dışında short_explanation, price, avarage stars, yorum sayısı vesaire geliyor.

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

export default SporGidalariPage;
