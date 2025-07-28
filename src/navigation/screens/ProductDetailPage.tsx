import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import PrevIcon from '../../svgs/PrevIcon'
import { useBasket } from '../../BasketContext';

const { width } = Dimensions.get('window');

const BASE_URL = 'https://fe1111.projects.academy.onlyjs.com/api/v1';

// Types for API response
interface Product {
  id: string;
  name: string;
  slug: string;
  short_explanation: string;
  explanation: {
    usage: string;
    features: string;
    description: string;
    nutritional_content: {
      ingredients?: { aroma: string | null; value: string }[];
      nutrition_facts?: {
        ingredients: { name: string; amounts: string[] }[];
        portion_sizes: string[];
      };
      amino_acid_facts?: any;
    };
  };
  tags: string[];
  variants: Variant[];
}

interface Variant {
  id: string;
  size: { pieces: number; total_services: number };
  aroma: string;
  price: {
    profit: number | null;
    total_price: number;
    discounted_price: number | null;
    price_per_servings: number;
    discount_percentage: number | null;
  };
  photo_src: string;
  is_available: boolean;
}

type ProductDetailRouteParams = { productSlug: string };

const ProductDetailPage = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, ProductDetailRouteParams>, string>>();
  const { addToBasket } = useBasket();
  const productSlug = (route.params as ProductDetailRouteParams)?.productSlug;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productSlug) return;
    setLoading(true);
    fetch(`${BASE_URL}/products/${productSlug}`)
      .then(res => res.json())
      .then(json => {
        setProduct(json.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ürün yüklenemedi.');
        setLoading(false);
      });
  }, [productSlug]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }
  if (error || !product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>{error || 'Ürün bulunamadı.'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-row items-center p-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <PrevIcon />
          </TouchableOpacity>
          <Text className="text-lg font-bold ml-4">Ürün Detayı</Text>
        </View>
        <Image
          source={{ uri: BASE_URL + (product.variants[0]?.photo_src || '') }}
          style={{ width: width, height: width * 0.7, resizeMode: 'contain' }}
        />
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2">{product.name}</Text>
          <Text className="text-base text-gray-600 mb-2">{product.short_explanation}</Text>
          <View className="flex-row flex-wrap mb-2">
            {product.tags?.map((tag: string) => (
              <View key={tag} className="bg-green-200 rounded-full px-3 py-1 mr-2 mb-2">
                <Text className="text-xs text-green-800">{tag}</Text>
              </View>
            ))}
          </View>
          <Text className="font-semibold mt-2 mb-1">Açıklama</Text>
          <Text className="text-sm text-gray-700 mb-2">{product.explanation?.description}</Text>
          <Text className="font-semibold mt-2 mb-1">Kullanım</Text>
          <Text className="text-sm text-gray-700 mb-2">{product.explanation?.usage}</Text>
          <Text className="font-semibold mt-2 mb-1">Özellikler</Text>
          <Text className="text-sm text-gray-700 mb-2">{product.explanation?.features}</Text>
          {product.explanation?.nutritional_content?.nutrition_facts && (
            <View className="mt-2">
              <Text className="font-semibold mb-1">Besin Değerleri</Text>
              {product.explanation.nutritional_content.nutrition_facts.ingredients?.map((ing: { name: string; amounts: string[] }, idx: number) => (
                <Text key={idx} className="text-sm text-gray-700">
                  {ing.name}: {ing.amounts?.join(', ')}
                </Text>
              ))}
              <Text className="text-xs text-gray-500 mt-1">
                {product.explanation.nutritional_content.nutrition_facts.portion_sizes?.join(', ')}
              </Text>
            </View>
          )}
          <View className="mt-4">
            <Text className="font-semibold mb-2">Varyantlar</Text>
            {product.variants?.map((variant: Variant) => (
              <View key={variant.id} className="flex-row items-center mb-4 p-2 border rounded-lg">
                <Image
                  source={{ uri: BASE_URL + (variant.photo_src || '') }}
                  style={{ width: 80, height: 80, borderRadius: 8, marginRight: 12 }}
                />
                <View className="flex-1">
                  <Text className="font-bold">{variant.size.pieces} Adet / {variant.size.total_services} Servis</Text>
                  <Text className="text-sm text-gray-700">Aroma: {variant.aroma}</Text>
                  <Text className="text-lg font-bold text-green-700 mt-1">
                    {variant.price.discounted_price ? (
                      <>
                        <Text className="line-through text-gray-400 text-base mr-2">{variant.price.total_price}₺</Text>
                        {variant.price.discounted_price}₺
                      </>
                    ) : (
                      `${variant.price.total_price}₺`
                    )}
                  </Text>
                  <Text className="text-xs text-gray-500">Servis başı: {variant.price.price_per_servings}₺</Text>
                </View>
                <TouchableOpacity
                  className="bg-green-600 px-4 py-2 rounded-lg ml-2"
                  onPress={() => addToBasket({
                    id: product.id,
                    name: product.name,
                    price: variant.price.discounted_price || variant.price.total_price,
                    photo: BASE_URL + (variant.photo_src || ''),
                    desc: product.short_explanation,
                    size: `${variant.size.pieces} Adet / ${variant.size.total_services} Servis`,
                    quantity: 1,
                  })}
                >
                  <Text className="text-white font-bold">Sepete Ekle</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProductDetailPage;