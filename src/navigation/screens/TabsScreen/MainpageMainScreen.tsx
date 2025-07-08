import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

import SearchBarComp from "../../../components/SearchBarComp";

interface CategoryParams {
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

  // Kategori slug'ına göre görsel eşleştirme
  const categoryImages: { [key: string]: any } = {
    protein: require("../../../assets/categoryPics/protein.png"),
    vitamin: require("../../../assets/categoryPics/vitamin.png"),
    "spor-gidalari": require("../../../assets/categoryPics/spor-gidalari.png"),
    gida: require("../../../assets/categoryPics/gida.png"),
    saglik: require("../../../assets/categoryPics/saglik.png"),
    "tum-urunler": require("../../../assets/categoryPics/tum-urunler.png"),
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
          <TouchableOpacity>
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
        <SearchBarComp />
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
                style={{ minWidth: 110 }}
                onPress={() => {
                  console.log("Kategori tıklandı:", cat.name);
                }}
              >
                <Image
                  source={categoryImages[cat.slug]}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
                <View className="absolute bottom-2 right-2 w-[110%] items-end">
                  <Text className="text-base font-extrabold text-right">
                    {cat.name}
                  </Text>
                  <View className="mt-2 bg-black rounded px-3 py-1">
                    <Text className="text-white font-extrabold text-xs text-right">
                      İNCELE
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  );
};

export default MainpageMainScreen;
