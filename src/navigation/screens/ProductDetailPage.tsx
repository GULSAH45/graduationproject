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
import { ProductReview } from "@/components/ProductReview/ProductReview";
import { useAuthStore } from "@/stores/useAuthStore";
import { formatCurrency } from "react-native-format-currency";



const { width } = Dimensions.get("window");

export const BASE_URL = "https://fe1111.projects.academy.onlyjs.com/api/v1";
export const IMAGE_URL = "https://fe1111.projects.academy.onlyjs.com";

// Aroma isimlerini icon dosyalarıyla eşleştiren fonksiyon
const getAromaIcon = (aroma: string): any => {
  const aromaLower = aroma.toLowerCase().trim();

  // Aroma isimlerini icon dosyalarıyla eşleştir
  const aromaMap: { [key: string]: any } = {
    "limonata": require("@/assets/icons/limonata.webp"),
    "çilek": require("@/assets/icons/çilek.webp"),
    "muz": require("@/assets/icons/muz.webp"),
    "muhallebi": require("@/assets/icons/muhallebi.webp"),
    "bisküvi": require("@/assets/icons/bisküvi.webp"),
    "cookie & cream": require("@/assets/icons/bisküvi.webp"),
    "çikolata": require("@/assets/icons/çikolata.webp"),
    "dubai çikolatası": require("@/assets/icons/çikolata.webp"),
    "choco nut": require("@/assets/icons/çokonat.webp"),
    "çokonat": require("@/assets/icons/çokonat.webp"),
    "karamel": require("@/assets/icons/karamel.webp"),
    "salted caramel": require("@/assets/icons/karamel.webp"),
    "cake": require("@/assets/icons/cake.webp"),
    "birthday cake": require("@/assets/icons/cake.webp"),
    "blueberry muffin": require("@/assets/icons/cake.webp"),
    "raspberry cheesecake": require("@/assets/icons/rasperryChescake.webp"),
    "rasperry cheesecake": require("@/assets/icons/rasperryChescake.webp"),
    "lemon cheesecake": require("@/assets/icons/lemonCheescake.webp"),
    "fruit fusion": require("@/assets/icons/fruitfusion.webp"),
    "tigers": require("@/assets/icons/tigers.webp"),
    "yeşil elma": require("@/assets/icons/yesilelma.webp"),
    "seftali": require("@/assets/icons/seftali.webp"),
    "şeftali": require("@/assets/icons/seftali.webp"),
    "karpuz": require("@/assets/icons/karpuz.webp"),
    "ahududu": require("@/assets/icons/ahududu.webp"),
    "aromasız": require("@/assets/icons/aromasız.webp"),
  };

  // Direkt eşleşme kontrolü
  if (aromaMap[aromaLower]) {
    return aromaMap[aromaLower];
  }

  for (const key in aromaMap) {
    if (aromaLower.includes(key) || key.includes(aromaLower)) {
      return aromaMap[key];
    }
  }

  // Eşleşme bulunamazsa varsayılan icon
  return require("@/assets/icons/aromasız.webp");
};

const ProductDetailPage = () => {
  const route =
    useRoute<RouteProp<Record<string, ProductDetailRouteParams>, string>>();
    
    const { accessToken } = useAuthStore();


  const scrollRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);


  const { handleAddToBasket, basket } = useBasket();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const basketLength = basket.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Extract productSlug from route params
  const productSlug = route.params?.productSlug;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

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

  // Seçilen aroma için varyantlar (boyutlar) - unique pieces
  const availableVariants = product?.variants
    ?.filter((v) => v.aroma === selectedAroma)
    .filter((variant, index, self) =>
      index === self.findIndex((v) => v.size.pieces === variant.size.pieces)
    );

  // Sepete ekle fonksiyonu
  const handleAddBasket = () => {

    if (!selectedAroma || !selectedVariantId || !product) return;
    const selectedVariant = product.variants?.find(v => v.id === selectedVariantId);

    if (selectedVariant) {
      handleAddToBasket({
        ...product,
        selectedVariant,
      } as Product);

      if(accessToken) {
      Toast.show({
        type: "successCustom",
        text1: "Başarılı!",
        text2: "Ürün sepete eklendi 🎉",
        position: "top",
        topOffset: 50,
      });
      }
      else {
        Toast.show({
          type: "errorCustom",
          text1: "Hata!",
          text2: "Lütfen giriş yapınız.",
          position: "top",
          topOffset: 50,
        });
        return navigator.navigate("LogScreen");
      }
      setTimeout(() => {
        navigator.navigate("BasketScreen");
      }, 150);
    }
  };
  // Yorumları formatla ve istatistikleri hesapla
  const formatReviewsData = () => {
    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        formattedReviews: [],
      };
    }

    // Rating breakdown hesapla
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;

    const formattedReviews = reviews.map((review, index) => {
      const rating = parseInt(review.stars) || 5;
      breakdown[rating as keyof typeof breakdown]++;
      totalRating += rating;

      // Tarihi formatla
      const date = new Date(review.created_at);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;

      return {
        id: `${index}`,
        author: `${review.first_name} ${review.last_name}`.trim(),
        date: formattedDate,
        rating: rating,
        title: review.title || "",
        content: review.comment || "",
        isVerified: true,
        aroma: review.aroma || "",
      };
    });

    const averageRating = totalRating / reviews.length;

    return {
      averageRating,
      totalReviews: reviews.length,
      ratingBreakdown: breakdown,
      formattedReviews,
    };
  };

  const reviewsData = formatReviewsData();
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

  const viewedGroups = lastViewed
    .filter((p) => p.id !== product?.id)
    .slice(0, 12)
    .reduce((result: Product[][], item, idx, arr) => {
      if (idx % 3 === 0) result.push(arr.slice(idx, idx + 3));
      return result;
    }, []);

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

  // Yorumları çek
  useEffect(() => {
    if (productSlug) {
      setReviewsLoading(true);
      fetch(`${BASE_URL}/products/${productSlug}/comments?limit=10&offset=0`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === "success" && json.data?.results) {
            setReviews(json.data.results);
          }
          setReviewsLoading(false);
        })
        .catch(() => {
          setReviewsLoading(false);
        });
    }
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
          source={{ uri: IMAGE_URL + (product.variants[0]?.photo_src|| "") }}
          style={{ width: width, height: width * 0.7, resizeMode: "contain" }}
        />
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2">{product.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            {/* Yıldızlar */}
            {typeof product.average_star === "number" && (
              <View style={{ flexDirection: "row", marginRight: 8 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <AntDesign
                    key={i}
                    name={i < Math.round(product.average_star) ? "star" : "staro"}
                    size={18}
                    color="#FFD700"
                    style={{ marginHorizontal: 1 }}
                  />
                ))}
              </View>
            )}
            {/* Yorum sayısı */}
            {typeof product.comment_count === "number" && (
              <Text style={{ color: "#6B7280", fontSize: 14 }}>
                {product.comment_count} yorum
              </Text>
            )}
          </View>
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
              const aromaIcon = getAromaIcon(aroma);
              const isSelected = selectedAroma === aroma;
              return (
                <View key={idx} className="mr-2 mb-2 relative">
                  <TouchableOpacity
                    className={`flex-row items-center px-3 py-2 rounded-full border ${isSelected
                      ? "bg-green-200 border-green-600"
                      : "bg-white border-gray-300"
                      }`}
                    onPress={() => {
                      setSelectedAroma(aroma);
                      setSelectedVariantId(null); // Aroma değişince gramaj sıfırlansın
                    }}
                  >
                    <Image
                      source={aromaIcon}
                      style={{
                        width: 45,
                        height: 35,
                        borderRadius: 8,
                        marginRight: 8,
                      }}
                      resizeMode="contain"
                    />
                    <Text className="text-sm text-gray-700">{aroma}</Text>
                  </TouchableOpacity>

                  {isSelected && (
                    <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-600 items-center justify-center">
                      <AntDesign name="check" size={10} color="#fff" />
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Gramaj/Boyut Seçimi */}
          {selectedAroma && (
            <>
              <Text className="font-semibold mb-2">Gramaj Seçimi</Text>
              <View className="flex-row flex-wrap mb-4">
                {availableVariants?.map((variant) => {
                  const isSelected = selectedVariantId === variant.id;
                  return (
                    <View key={variant.id} className="mr-2 mb-2 relative">
                      <TouchableOpacity
                        className={`px-4 py-3 rounded-full border-2 ${
                          isSelected 
                            ? "bg-green-100 border-green-600" 
                            : "bg-white border-gray-300"
                        }`}
                        onPress={() => setSelectedVariantId(variant.id)}
                      >
                        <Text 
                          className={`text-sm font-semibold ${
                            isSelected ? "text-green-700" : "text-gray-700"
                          }`}
                        >
                          {variant.size.pieces} Adet
                        </Text>
                      </TouchableOpacity>
                      
                      {isSelected && (
                        <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-600 items-center justify-center">
                          <AntDesign name="check" size={10} color="#fff" />
                        </View>
                      )}
                    </View>
                  );
                })}
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
                <View className="mb-4">
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-xl ml-5 font-bold text-green-700">
                        {formatCurrency({ amount: price || 0, code: "TRY" })[0]}
                      </Text>
                      <Text className="text-xs ml-5 text-gray-500 mt-1">
                        {selectedVariant.size.total_services} servis • {formatCurrency({ amount: selectedVariant.price?.price_per_servings || 0, code: "TRY" })[0]}/servis
                      </Text>
                    </View>
                    {/* Sepete Ekle Butonu */}
                    <TouchableOpacity
                      disabled={!selectedAroma || !selectedVariantId}
                      onPress={handleAddBasket}
                      className={`py-3 w-[200px] rounded-sm ${selectedAroma && selectedVariantId
                        ? "bg-green-600"
                        : "bg-gray-400"
                        }`}
                    >
                      <Text className="text-white text-center font-bold text-lg">
                        Sepete Ekle
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })()}

         

          {/* Özellikler Bölümü */}
          <View className="flex-row justify-between items-center py-6 px-2 mt-4 bg-white">
            <View className="flex-1 items-center">
              <TruckSVG width={40} height={40} />
              <Text className="text-sm font-semibold text-gray-800 mt-2 text-center">
                Aynı Gün
              </Text>
              <Text className="text-xs text-gray-600 text-center">
                Ücretsiz Kargo
              </Text>
            </View>
            <View className="flex-1 items-center">
              <TikSVG width={40} height={40} />
              <Text className="text-sm font-semibold text-gray-800 mt-2 text-center">
                750.000+
              </Text>
              <Text className="text-xs text-gray-600 text-center">
                Mutlu Müşteri
              </Text>
            </View>
            <View className="flex-1 items-center">
              <PercentageSVG width={40} height={40} />
              <Text className="text-sm font-semibold text-gray-800 mt-2 text-center">
                Memnuniyet
              </Text>
              <Text className="text-xs text-gray-600 text-center">
                Garantisi
              </Text>
            </View>
          </View>

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
                        justifyContent: "center",
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
                              productId: item.id,
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

          <ProductReview
            averageRating={reviewsData.averageRating}
            totalReviews={reviewsData.totalReviews}
            ratingBreakdown={reviewsData.ratingBreakdown}
            reviews={reviewsData.formattedReviews}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailPage
