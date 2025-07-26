import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import PrevIcon from '../../svgs/PrevIcon'
import { useBasket } from '../../BasketContext';

const { width } = Dimensions.get('window');

const ProductDetailPage = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { product } = route.params || {};
  const { addToBasket } = useBasket();

  if (!product) {
    return (
      <SafeAreaView>
        <Text>Ürün bilgisi bulunamadı.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
     //ok lu kısım
        <View className="flex-row items-center mt-4 mx-4 mb-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <PrevIcon />
          </TouchableOpacity>
          <Text className="text-lg font-bold ml-2">{product.name}</Text>
        </View>
//ürün görseli
        <Image
          source={{ uri: `https://fe1111.projects.academy.onlyjs.com${product.photo_src}` }}
          className="w-full h-56 self-center"
          resizeMode="contain"
        />

//ürün 
        <View className="items-center my-4">
          <Text className="text-xl font-bold">{product.name}</Text>
          <Text className="text-base text-gray-600 mt-1">{product.short_explanation}</Text>
          <Text className="text-base text-yellow-600 mt-1">
            {product.average_star} ⭐ {product.comment_count} Yorum
          </Text>
        </View>

     //etiketler
        <View className="flex-row justify-center space-x-2 my-2">
          {product.is_vegetarian && (
            <View className="bg-gray-200 rounded-full px-3 py-1">
              <Text className="text-xs text-gray-700">VEJETARYEN</Text>
            </View>
          )}
          {product.is_gluten_free && (
            <View className="bg-gray-200 rounded-full px-3 py-1">
              <Text className="text-xs text-gray-700">GLUTENSİZ</Text>
            </View>
          )}
        </View>

  //bu var mı emin değilim.
        {product.aromas && (
          <View className="mx-4 my-2">
            <Text className="font-bold text-base mb-1">AROMA:</Text>
       //aroma gösterilen yer olacak
          </View>
        )}
//fiyat bilgisi
        <View className="flex-row items-center justify-between border-2 border-purple-300 rounded-xl mx-4 my-4 px-4 py-3">
          <View>
            <Text className="text-2xl font-bold text-black">{product.price_info?.total_price} TL</Text>
            <Text className="text-xs text-gray-500">34.31 TL / Servis</Text>
          </View>
          <TouchableOpacity className="bg-black rounded-lg w-[160px] h-[56px] items-center justify-center"
            onPress={() => {
              if (product) {
                addToBasket({
                  id: product.id?.toString() || Math.random().toString(),
                  name: product.name,
                  price: product.price_info?.total_price || 0,
                  photo: `https://fe1111.projects.academy.onlyjs.com${product.photo_src}`,
                  desc: product.short_explanation || '',
                  size: product.size || '400G 18 servis', // örnek, gerekirse product'tan al
                  quantity: 1,
                });
              }
            }}
          >
            <Text className="text-white font-bold text-base">SEPETE EKLE</Text>
          </TouchableOpacity>
        </View>
// Boyut seçimi (örnek)
        <View className="mx-4 my-2">
          <Text className="font-bold text-base mb-1">BOYUT:</Text>
          <View className="bg-gray-200 rounded-lg p-3 items-center w-[100px] mt-2">
            <Text className="text-sm text-gray-700 text-center">400G{"\n"}18 servis</Text>
          </View>
        </View>

    
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductDetailPage;