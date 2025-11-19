import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { BestSellerProductTypes } from "@/types/Product";
import { IMAGE_URL } from "@/navigation/screens/ProductDetailPage";

const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

function Bestsellers() {
  const [bestSellers, setBestSellers] = useState<BestSellerProductTypes[]>([]);
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    fetch(`${base_url}/products/best-sellers`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setBestSellers(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching best sellers:", error);
      });
  }, []);

  return (
    <View className="mt-4">
      <Text className="text-2xl text-center font-extrabold text-TextColor ml-3 mb-2">
        Çok Satanlar
      </Text>
      <View className="flex-row flex-wrap justify-center">
        {bestSellers.map((item, idx) => (
          <TouchableOpacity
            key={item.slug || idx}
            className="rounded-md mb-3 p-2 mx-2 items-center shadow h-64"
            style={{ width: 150 }}
            onPress={() => navigation.navigate("ProductDetailPage", { productSlug: item.slug })}
          >
            {item.price_info.discounted_price && (
              <View className="absolute z-10 top-0 right-0 bg-red-500 rounded-bl-md px-2 py-1">
                <Text className="text-white text-xs font-bold">
                  %{Math.round(((item.price_info.total_price - item.price_info.discounted_price) / item.price_info.total_price) * 100)} İNDİRİM
                </Text>
              </View>
            )}
            <Image
              source={{ uri: IMAGE_URL + item.photo_src }}
              style={{ width: 150, height: 150, borderRadius: 8 }}
              resizeMode="contain"
            />
            <Text className="font-bold text-xs mt-2 text-center" numberOfLines={2}>
              {item.name}
            </Text>
            <Text className="text-xs text-gray-500 text-center mt-1" numberOfLines={2}>
              {item.short_explanation}
            </Text>
            <Text className="font-bold text-green-700 mt-1 text-xs">
              {item.price_info.discounted_price
                ? `${item.price_info.discounted_price}₺`
                : `${item.price_info.total_price}₺`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default Bestsellers;