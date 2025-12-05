import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
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
    <View className="my-4">
      
      <View className="flex-row mx-auto flex-wrap" style={{ justifyContent: 'center' }}>
        {bestSellers.map((item, idx) => (
          <TouchableOpacity
            key={item.slug || idx}
            className="rounded-md mb-3 mx-5 items-center shadow"
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
            
            {/* Star Rating and Review Count */}
            {typeof item.average_star === 'number' && (
              <View className="items-center mt-1">
                <View className="flex-row">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <AntDesign
                      key={i}
                      name={i < Math.round(item.average_star) ? "star" : "staro"}
                      size={14}
                      color="#FFD700"
                      style={{ marginHorizontal: 1 }}
                    />
                  ))}
                </View>
                <Text className="text-xs text-gray-500 ml-1">
                  ({item.comment_count} yorum)
                </Text>
              </View>
            )}
            
            <Text className="font-bold text-green-700 mt-1 text-md">
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