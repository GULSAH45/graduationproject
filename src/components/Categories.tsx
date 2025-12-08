import { CategoryParams, CategoryResponse } from '@/types/Product';
import React, { useState, useEffect } from 'react';
import { View , Text, TouchableOpacity, Image} from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";

const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

function Categories() {
     const [categories, setCategories] = useState<CategoryParams[]>([]);
     const navigation = useNavigation<NavigationProp<any>>();
     
     // Kategori slug'ına göre görsel eşleştirme
     const categoryImages: { [key: string]: any } = {
       protein: require("@/assets/categoryPics/protein.png"),
       vitamin: require("@/assets/categoryPics/vitamin.png"),
       "spor-gidalari": require("@/assets/categoryPics/spor-gidalari.png"),
       gida: require("@/assets/categoryPics/gida.png"),
       saglik: require("@/assets/categoryPics/saglik.png"),
       "tum-urunler": require("@/assets/categoryPics/tum-urunler.png"),
     };

     // Tüm ürünler kategorisini ekle
     const allProductsCategory = {
       id: 0,
       name: "Tüm Ürünler",
       slug: "tum-urunler",
       photo_src: require("@/assets/categoryPics/tum-urunler.png"),
       order: 999,
     };
     const categoriesWithAll = [allProductsCategory, ...categories];

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
  return (

        <View>
          <Text className="text-md text-TextColor font-semibold ml-3 ">
            Kategoriler
          </Text>
          <View className="flex-row flex-wrap justify-between px-3 mt-2">
            {categoriesWithAll.map((cat, idx) => (
              <TouchableOpacity
                key={cat.id || idx}
                className="w-[48%] h-[120px] mb-3 bg-white rounded-lg items-center justify-center shadow"
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
                <View className="absolute bottom-3 right-3 left-3 items-end">
                  <Text 
                    className="text-lg font-extrabold text-black" 
                    style={{ 
                      textShadowColor: 'rgba(0,0,0,0.8)', 
                      textShadowOffset: {width: 1, height: 1}, 
                      textShadowRadius: 2,
                      textAlign: 'right'
                    }}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.7}
                  >
                    {cat.name.replace(/ /g, '\n')}
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
  )
}

export default Categories