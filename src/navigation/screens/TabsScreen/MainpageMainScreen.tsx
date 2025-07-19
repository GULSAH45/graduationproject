import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

import SearchBarComp from "../../../components/SearchBarComp";

interface CategoryParams {
  photo_src: any;
  ginseng: any;
  id: number;
  name: string;
  slug: string;
  order: number;
}

interface CategoryResponse {
  status: string;
  data: {
    data: CategoryParams[];
    status: string;
  };
}

const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";
// Fetch categories from the API

const MainpageMainScreen = () => {
  const [categories, setCategories] = useState<CategoryParams[]>([]);
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`${base_url}/categories`)
      .then((response) => response.json())

      .then((data: CategoryResponse) => {
        console.log("Kategoriler:", data);
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
    protein: require("../../../assets/categoryPics/protein.png"),
    vitamin: require("../../../assets/categoryPics/vitamin.png"),
    "spor-gidalari": require("../../../assets/categoryPics/spor-gidalari.png"),
    gida: require("../../../assets/categoryPics/gida.png"),
    saglik: require("../../../assets/categoryPics/saglik.png"),
  };

  // Kategori slug'ına göre ekran adı eşleştirme
  const categoryScreens: { [key: string]: string } = {
    protein: "ProteinPage",
    vitamin: "VitaminPage",
    "spor-gidalari": "SporGidalariPage",
    gida: "GidaPage",
    saglik: "SaglikPage",
  };

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-MainBackground">
        <View className="flex-row justify-between mx-3 ">
          {" "}
          <Image
            source={require("../../../assets/LOGO.png")}
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
          </TouchableOpacity>
        </View>
        <View
          className="border "
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 0.5,
          }}
        ></View>
        // Search Bar
        <SearchBarComp value={""} onChangeText={function (text: string): void {
          throw new Error("Function not implemented.");
        } } />
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
                className="w-[48%] h-[100px] bg-white rounded-lg mb-3 items-center justify-center shadow"
                style={{ minWidth: 100}}
                onPress={() => {
                  const screenName = categoryScreens[cat.slug];
                  if (screenName) {
                    navigation.navigate(screenName);
                  } else {
                    console.log("Bu kategori için sayfa yok:", cat.slug);
                  }
                }}
              >
                <Image
                  source={categoryImages[cat.slug]}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
                <View className="absolute bottom-3 right-5 w-[100%] items-end">
                  <Text className="text-base font-extrabold text-right">
                    {cat.name}
                  </Text>
                  <View className="mt-2 bg-black rounded-xl px-3 py-1">
                    <Text className="text-white font-extrabold text-xs text-right">
                      İNCELE
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Best Seller Ürünler */}
        <View className="mt-4">
          <Text className="text-md text-TextColor font-semibold ml-3 mb-2">
            Best Seller Ürünler
          </Text>
          <FlatList
            data={bestSellers}
            horizontal
            keyExtractor={(item) => item.slug}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8}}
            renderItem={({ item }) => (
              <View
                className="bg-white rounded-md mr-3 p-2 items-center"
                style={{ width: 160 }}
              >
                <Image
                  source={{
                    uri: `https://fe1111.projects.academy.onlyjs.com${item.photo_src}`,
                  }}
                  style={{ width: 120, height: 120, borderRadius: 2 }}
                  resizeMode="contain"
                />
                <Text className="font-bold text-sm mt-2 text-center">
                  {item.name}
                </Text>
                <Text className="text-xs text-gray-500 text-center">
                  {item.short_explanation}
                </Text>
                <Text className="font-bold text-green-700 mt-1">
                  {item.price_info.discounted_price
                    ? `${item.price_info.discounted_price}₺`
                    : `${item.price_info.total_price}₺`}
                </Text>
              </View>
            )}
          />
        </View>
        <View className="w-full flex items-center justify-center mt-4">
          <Image
            className="w-[390px] h-[483px]"
            source={require("../../../assets/GreenFooterPic.png")}
            resizeMode="contain"
          />
          <View
            className="w-[326 px] h-[74px]"
            style={{ position: "absolute", bottom: 20 }}
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

export default MainpageMainScreen; 