import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";


import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute, RouteProp, NavigationProp } from "@react-navigation/native";

import PrevIcon from "../../svgs/PrevIcon";
import { useBasket } from "../../contexts/BasketContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ProductDetailRouteParams, Product, Variant } from "@/types/Product";
import Toast from "react-native-toast-message";
import TruckSVG from "@/svgs/TruckSVG";
import TikSVG from "@/svgs/TikSVG";
import PercentageSVG from "@/svgs/PercentageSVG";
import { useLastViewedStore } from "@/stores/LastViewed";

import { RootStackParamList } from "@/navigation";



const { width } = Dimensions.get("window");

const BASE_URL = "https://fe1111.projects.academy.onlyjs.com/api/v1";
export const IMAGE_URL = "https://fe1111.projects.academy.onlyjs.com";

const ProductDetailPage = () => {
  const route =
    useRoute<RouteProp<Record<string, ProductDetailRouteParams>, string>>();


 
  const scrollRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);


  const { addToBasket, basket } = useBasket();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const basketLength = basket.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Extract productSlug from route params
  const productSlug = route.params?.productSlug;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Akordiyon state'leri
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);

  // Aroma ve varyant seçimi için state
  const [selectedAroma, setSelectedAroma] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );

  // Benzersiz aromaları bul
  const uniqueAromas = Array.from(
    new Set(product?.variants?.map((v) => v.aroma))
  );

  // Seçilen aroma için varyantlar (boyutlar)
  const availableVariants = product?.variants?.filter(
    (v) => v.aroma === selectedAroma
  );

  // Sepete ekle fonksiyonu
  const handleAddBasket = () => {

    if (!selectedAroma || !selectedVariantId || !product) return;
    const selectedVariant = product.variants?.find(v => v.id === selectedVariantId);

    if (selectedVariant) {
      addToBasket({
        ...product,
        selectedVariant,
      } as Product);
      Toast.show({
        type: "successCustom",
        text1: "Başarılı!",
        text2: "Ürün sepete eklendi 🎉",
        position: "top",
        topOffset: 50,
      });
    }
  };

  const AccordionItem = ({
    title,
    isOpen,
    onToggle,
    children,
  }: {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => (
    <View className="border-b border-gray-200">
      <TouchableOpacity
        onPress={onToggle}
        className="flex-row justify-between items-center py-4 px-2"
      >
        <Text className="font-semibold text-lg text-gray-800">{title}</Text>
        <AntDesign name={isOpen ? "up" : "down"} size={16} color="#666" />
      </TouchableOpacity>
      {isOpen && <View className="px-2 pb-4">{children}</View>}
    </View>
  );

  const { lastViewed, addLastViewed } = useLastViewedStore();

  // Son görüntülenenler için grup oluştur
  const viewedGroups = lastViewed
    .filter((p) => p.id !== product?.id)
    .slice(0, 12)
    .reduce((result: Product[][], item, idx, arr) => {
      if (idx % 3 === 0) result.push(arr.slice(idx, idx + 3));
      return result;
    }, []);

  // Sayfa değiştirme fonksiyonu
  const handleArrow = (direction: "left" | "right") => {
    let nextPage = currentPage;
    if (direction === "left" && currentPage > 0) nextPage -= 1;
    if (direction === "right" && currentPage < viewedGroups.length - 1)
      nextPage += 1;
    setCurrentPage(nextPage);
    scrollRef.current?.scrollTo({ x: nextPage * (width - 32), animated: true });
  };

  useEffect(() => {
    if (productSlug) {
      setLoading(true);
      fetch(`${BASE_URL}/products/${productSlug}`)
        .then((res) => res.json())
        .then((json) => {
          setProduct(json.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Ürün yüklenemedi.");
          setLoading(false);
        });
    } else {
      setError("Ürün slug bulunamadı.");
      setLoading(false);
    }
  }, [productSlug]);

  useEffect(() => {
    if (product) {
      addLastViewed(product);
    }
  }, [product]);

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
        <Text>{error || "Ürün bulunamadı."}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigator.goBack()}>
              <PrevIcon />
            </TouchableOpacity>
            <Text className="text-lg font-bold ml-4">Ürün Detayı</Text>
          </View>
          <TouchableOpacity onPress={() => navigator.navigate("BasketScreen")} className="relative">
            <AntDesign
              name="shoppingcart"
              size={21}
              color="black"
            />
            {basketLength > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {basketLength}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: IMAGE_URL + (product.variants[0]?.photo_src || "") }}
          style={{ width: width, height: width * 0.7, resizeMode: "contain" }}
        />
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2">{product.name}</Text>
          <Text className="text-base text-gray-600 mb-2">
            {product.short_explanation}
          </Text>
          <View className="flex-row flex-wrap">
            {product.tags?.map((tag: string) => (
              <View
                key={tag}
                className="bg-green-200 rounded-full px-3 py-1 mr-2 mb-2"
              >
                <Text className="text-xs text-green-800">{tag}</Text>
              </View>
            ))}
          </View>

          {/* Aroma Seçimi */}
          <Text className="font-semibold mb-2">Aroma Seçimi</Text>
          <View className="flex-row flex-wrap mb-4">
            {uniqueAromas.map((aroma, idx) => {
              const aromaVariant = product.variants?.find(
                (v) => v.aroma === aroma
              );
              return (
                <TouchableOpacity
                  key={idx}
                  className={`flex-row items-center px-3 py-1 mr-2 mb-2 rounded-full border ${
                    selectedAroma === aroma
                      ? "bg-green-200 border-green-600"
                      : "bg-gray-200 border-gray-400"
                  }`}
                  onPress={() => {
                    setSelectedAroma(aroma);
                    setSelectedVariantId(null); // Aroma değişince gramaj sıfırlansın
                  }}
                >
                  {aromaVariant?.photo_src && (
                    <Image
                      source={{ uri: IMAGE_URL + aromaVariant.photo_src }}
                      style={{
                        width: 38,
                        height: 28,
                        borderRadius: 14,
                        marginRight: 6,
                      }}
                      resizeMode="contain"
                    />
                  )}
                  <Text className="text-sm text-gray-700">{aroma}</Text>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      borderWidth: 2,
                      borderColor: selectedAroma === aroma ? "#16a34a" : "#888",
                      marginLeft: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    {selectedAroma === aroma && (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: "#16a34a",
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Gramaj/Boyut Seçimi */}
          {selectedAroma && (
            <>
              <Text className="font-semibold mb-2">Gramaj Seçimi</Text>
              <View className="flex-row flex-wrap mb-4">
                {availableVariants?.map((variant) => (
                  <TouchableOpacity
                    key={variant.id}
                    className={`flex-row items-center px-3 py-1 mr-2 mb-2 rounded-full border ${
                      selectedVariantId === variant.id
                        ? "bg-blue-200 border-blue-600"
                        : "bg-gray-200 border-gray-400"
                    }`}
                    onPress={() => setSelectedVariantId(variant.id)}
                  >
                    <Text className="text-sm text-gray-700">
                      {variant.size.pieces} Adet
                    </Text>
                    <View
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        borderWidth: 2,
                        borderColor:
                          selectedVariantId === variant.id ? "#2563eb" : "#888",
                        marginLeft: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                      }}
                    >
                      {selectedVariantId === variant.id && (
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: "#2563eb",
                          }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {selectedAroma &&
            selectedVariantId &&
            (() => {
              const selectedVariant = availableVariants?.find(
                (v) => v.id === selectedVariantId
              );
              if (!selectedVariant) return null;
              const price =
                selectedVariant.price?.discounted_price ??
                selectedVariant.price?.total_price;
              return (
                <Text className="text-xl font-bold text-green-700 mb-2">
                  {price} TL
                </Text>
              );
            })()}

          {/* Sepete Ekle Butonu */}
          <TouchableOpacity
            disabled={!selectedAroma || !selectedVariantId}
            onPress={handleAddBasket}
            className={`mt-2 py-3 rounded-lg ${
              selectedAroma && selectedVariantId
                ? "bg-green-600"
                : "bg-gray-400"
            }`}
          >
            <Text className="text-white text-center font-bold text-lg">
              Sepete Ekle
            </Text>
          </TouchableOpacity>
     
          {/* Akordiyon Bölümleri */}
          <AccordionItem
            title="Açıklama"
            isOpen={isDescriptionOpen}
            onToggle={() => setIsDescriptionOpen(!isDescriptionOpen)}
          >
            <Text className="text-sm text-gray-700">
              {product.explanation?.description}
            </Text>
          </AccordionItem>
          <AccordionItem
            title="Kullanım"
            isOpen={isUsageOpen}
            onToggle={() => setIsUsageOpen(!isUsageOpen)}
          >
            <Text className="text-sm text-gray-700">
              {product.explanation?.usage}
            </Text>
          </AccordionItem>
          <AccordionItem
            title="Özellikler"
            isOpen={isFeaturesOpen}
            onToggle={() => setIsFeaturesOpen(!isFeaturesOpen)}
          >
            <Text className="text-sm text-gray-700">
              {product.explanation?.features}
            </Text>
          </AccordionItem>
          {product.explanation?.nutritional_content?.nutrition_facts && (
            <AccordionItem
              title="Besin Değerleri"
              isOpen={isNutritionOpen}
              onToggle={() => setIsNutritionOpen(!isNutritionOpen)}
            >
              <View>
                {product.explanation.nutritional_content.nutrition_facts.ingredients?.map(
                  (ing: { name: string; amounts: string[] }, idx: number) => (
                    <Text key={idx} className="text-sm text-gray-700 mb-1">
                      {ing.name}: {ing.amounts?.join(", ")}
                    </Text>
                  )
                )}
                <Text className="text-xs text-gray-500 mt-2">
                  {product.explanation.nutritional_content.nutrition_facts.portion_sizes?.join(
                    ", "
                  )}
                </Text>
              </View>
            </AccordionItem>
          )}


          {viewedGroups.length > 0 && (
            <View style={{ marginTop: 24 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
                Son Görüntülenenler
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => handleArrow("left")}
                  disabled={currentPage === 0}
                  style={{ padding: 7, opacity: currentPage === 0 ? 0.5 : 1 }}
                >
                  <AntDesign name="arrowleft" size={28} color="#888" />
                </TouchableOpacity>
                <ScrollView
                  ref={scrollRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled={false}
                  style={{ width: width - 70 }}
                >
                  {viewedGroups.map((group, groupIdx) => (
                    <View
                      key={groupIdx}
                      style={{
                        flexDirection: "row",
                        width: width - 32,
                        justifyContent: "space-center",
                        columnGap: 50,
              
                      }}
                    >
                      {group.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={{
                            width: (width - 54) / 3,
                            marginHorizontal: 4,
                            alignItems: "center",
                            backgroundColor: "#fff",
                            borderRadius: 16,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.07,
                            shadowRadius: 2,
                            elevation: 1,
                            padding: 8,
                          }}
                          onPress={() =>
                            navigator.navigate("ProductDetailPage", {
                              productSlug: item.slug,
                            })
                          }
                        >
                          {item.variants?.[0]?.photo_src && (
                            <Image
                              source={{
                                uri: IMAGE_URL + item.variants[0].photo_src,
                              }}
                              style={{
                                width: "100%",
                                height: 100,
                                marginVertical: 8,
                                borderRadius: 18,
                              }}
                              resizeMode="contain"
                            />
                          )}
                          <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4, textAlign: "center" }}>
                              {item.name}
                            </Text>
                            {item.short_explanation && (
                              <Text style={{ color: "#6B7280", marginBottom: 4, textAlign: "center" }}>
                                {item.short_explanation}
                              </Text>
                            )}
                            {typeof item.average_star === "number" && (
                              <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 4 }}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <AntDesign
                                    key={i}
                                    name={i < Math.round(item.average_star) ? "star" : "staro"}
                                    size={16}
                                    color="#FFD700"
                                    style={{ marginHorizontal: 1 }}
                                  />
                                ))}
                              </View>
                            )}
                            {typeof item.comment_count === "number" && item.comment_count > 0 && (
                              <Text style={{ color: "#6B7280", marginBottom: 4, textAlign: "center" }}>
                                {item.comment_count} yorum
                              </Text>
                            )}
                        
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  onPress={() => handleArrow("right")}
                  disabled={currentPage === viewedGroups.length - 1}
                  style={{
                    padding: 8,
                    opacity: currentPage === viewedGroups.length - 1 ? 0.3 : 1,
                  }}
                >
                  <AntDesign name="arrowright" size={28} color="#888" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailPage;
