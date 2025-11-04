import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList, HomeTabParamList } from "@/navigation";

import SearchBarComp from "@/components/SearchBarComp";
import { BestSellerProductTypes, CategoryParams, CategoryResponse } from "@/types/Product";
import { useBasket } from "@/contexts/BasketContext";
import { IMAGE_URL } from "../ProductDetailPage";

const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

const MainpageMainScreen = () => {
  const [categories, setCategories] = useState<CategoryParams[]>([]);
  const [bestSellers, setBestSellers] = useState<BestSellerProductTypes[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList & HomeTabParamList>>();
  const { basket } = useBasket();
  const basketLength = basket.reduce((sum, item) => sum + (item.quantity || 0), 0);

  useEffect(() => {
    fetch(`${base_url}/categories`)
      .then((response) => response.json())

      .then((data: CategoryResponse) => {
        if (data && Array.isArray(data.data.data)) {
          setCategories(data.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Best seller ürünleri çek
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

  // Kategori slug'ına göre görsel eşleştirme
  const categoryImages: { [key: string]: any } = {
    protein: require("@/assets/categoryPics/protein.png"),
    vitamin: require("@/assets/categoryPics/vitamin.png"),
    "spor-gidalari": require("@/assets/categoryPics/spor-gidalari.png"),
    gida: require("@/assets/categoryPics/gida.png"),
    saglik: require("@/assets/categoryPics/saglik.png"),
  };


  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-MainBackground">
        <View className="flex-row justify-between mx-3 ">
          {" "}
          <Image
            source={require("@/assets/LOGO.png")}
            className="w-[119px] h-[26px] mb-3 mt-3"
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => navigation.navigate("BasketScreen")}>
            {" "}
            <AntDesign
              name="shoppingcart"
              className="py-3 px-5"
              size={21}
              color="black"
            />
            {basketLength >= 0 && (
              <View className="absolute top-2 right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {basketLength}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View
          className="border "
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 0.9,
          }}
        ></View>
        // Search Bar
        <TouchableOpacity onPress={() => navigation.navigate("HomeTabs", { screen: "SearchScreen" })}>
          <SearchBarComp value={""} onChangeText={function (text: string): void {
            throw new Error("Function not implemented.");
          } } />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/SliderMain.png")}
          className="w-full h-[350px]"
          resizeMode="contain"
        />
        {/* Categories */}
        <View>
          <Text className="text-md text-TextColor font-semibold ml-3 ">
            Kategoriler
          </Text>
          <View className="flex-row flex-wrap justify-between px-3 mt-2">
            {categories.map((cat, idx) => (
              <TouchableOpacity
                key={cat.id || idx}
                className="w-[48%] h-[100px] mb-3 bg-white rounded-lg items-center justify-center shadow"
                style={{ minWidth: 100, overflow: 'hidden' }}
                onPress={() => {
                  // Kategori bilgilerini params olarak gönder
                  navigation.navigate('CategoryPage', {
                    categoryId: cat.id,
                    categoryName: cat.name,
                    categorySlug: cat.slug,
                  });
                }}
              >
                <Image
                  source={categoryImages[cat.slug]}
                  style={{ 
                    width: "100%", 
                    height: "100%",
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                  resizeMode="cover"
                />
                <View className="absolute bottom-3 right-5 w-[100%] items-end">
                  <Text className="text-base font-extrabold text-right text-black" style={{ textShadowColor: 'rgba(0,0,0,0.8)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 2 }}>
                    {cat.name}
                  </Text>
                  <View className="mt-2 bg-black rounded-3xl px-3 py-1">
                    <Text className="text-white font-extrabold text-xs text-right">
                      İNCELE
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
       // çok satanlar
        <View className="mt-4">
          <Text className="text-2xl text-center font-extrabold text-TextColor  ml-3 mb-2">
          Çok Satanlar
          </Text>
          <View className="flex-row flex-wrap justify-center">
            {bestSellers.map((item, idx) => (
              <TouchableOpacity
                key={item.slug || idx}
                className=" rounded-md mb-3 p-2 mx-2 items-center shadow h-64"
                style={{ width: '150px' }}
                onPress={() => (navigation as any).navigate('ProductDetailPage', { productSlug: item.slug })}
              >
                {item.price_info.discounted_price && (
                  <View className="absolute z-10 top-0 right-0 bg-red-500 rounded-bl-md px-2 py-1">
                    <Text className="text-white text-xs font-bold">
                      %{Math.round(((item.price_info.total_price - item.price_info.discounted_price) / item.price_info.total_price) * 100)} İNDİRİM
                    </Text>
                  </View>
                )}
                <Image
                  source={{
                    uri: IMAGE_URL + item.photo_src,
                  }}
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
        <View className="w-full m-0 px-0 flex items-center justify-center mt-4">
          <Image
            className="w-[450px] h-[560px]"
            source={require("@/assets/GreenFooterPic.png")}
            resizeMode="contain"
          />
          <View
            className="w-[346 px] h-[94px]"
            style={{ position: "absolute", bottom: 60 }}
          >
            <Image
              className="w-[326 px] h-[74px]"
              source={require("../../../assets/OJStext.png")}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}
export default MainpageMainScreen