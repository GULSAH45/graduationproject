import {
  Image,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import PrevIcon from "@/svgs/PrevIcon";
import { useNavigation } from "@react-navigation/native";
import { ProductReview } from "@/components/productReview/ProductReview";
import { mockCustomerReviews, mockReviewStats } from "@/data/customerReviews";

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center mx-2 my-4">
        <TouchableOpacity onPress={() => navigation.navigate("HomeTabs", { screen: "MenuListScreen" })}>
          <PrevIcon />
        </TouchableOpacity>
        <Text className="text-black text-md font-semibold ml-2">
          Hakkımızda
        </Text>
      </View>

      <ScrollView>
        <View className="mx-5 py-3 my-2 items-center">
          <Text className="text-2xl font-bold ">
            Sağlıklı ve Fit Yaşamayı{" "}
            <View>
              <Text className="text-2xl font-bold ">Zevkli ve Kolay Hale </Text>
            </View>
            <View>
              <Text className="text-2xl font-bold ">Getirmek İçin Varız</Text>
            </View>
          </Text>

          <Text className="text-black text-sm font-normal leading-relaxed mx-4 mt-2">
            2016 yılından beri sporcu gıdaları, takviye edici gıdalar ve
            fonksiyonel gıdaları üreten bir firma olarak; müşterilerimize en
            kaliteli, lezzetli, tüketilmesi kolay ürünleri sunuyoruz. Müşteri
            memnuniyeti ve sağlığı her zaman önceliğimiz olmuştur.
            Ürünlerimizde, yüksek kalite standartlarına bağlı olarak, 
            sporcuların ve sağlıklı yaşam tutkunlarının ihtiyaçlarına yönelik
            besleyici çözümler sunuyoruz. Ürün yelpazemizdeki protein tozları,
            aminoasitler, vitamin ve mineral takviyeleri ile spor
            performansınızı desteklemek için ideal besin değerlerini sunuyoruz.
            Sizin için sadece en iyisinin yeterli olduğunu biliyoruz. Bu
            nedenle, inovasyon, kalite, sağlık ve güvenlik ilkelerimizi
            korurken, sürekli olarak ürünlerimizi geliştirmeye ve yenilikçi
            beslenme çözümleri sunmaya devam ediyoruz.
          </Text>

          <Text className="text-black text-sm font-normal mt-10 leading-relaxed mx-4 mb-2">
            Sporcu gıdaları konusunda lider bir marka olarak, sizin sağlığınıza
            ve performansınıza değer veriyoruz. Siz de spor performansınızı en
            üst seviyeye çıkarmak ve sağlıklı yaşam tarzınızı desteklemek
            istiyorsanız, bize katılın ve en besleyici çözümlerimizle tanışın.
            Sağlıklı ve aktif bir yaşam için biz her zaman yanınızdayız.
          </Text>

          <Text className="text-black text-sm font-normal mt-10 leading-relaxed mx-4">
            Sanatçılardan profesyonel sporculara, doktordan öğrencilere hayatın
            her alanında sağlıklı yaşamı ve beslenmeyi hedefleyen 1.000.000'den
            fazla kişiye ulaştık.
          </Text>
        </View>

        <View className="mx-5 py-3 my-2">
          <Text className="text-xl font-bold mb-2">Sertifikalarımız</Text>

          <Text className="text-black text-sm font-normal leading-relaxed mx-4 mt-2">
            Kalite politikamıza ulaşmak için Firmamızın sahip olduğu
            sertifikalara görsele tıklayarak ulaşabilirsiniz.
          </Text>

          <View className="flex-row px-6 mt-10 ml-5">
            <Image
              source={require("@/assets/certificate/iso.png")}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />{" "}
            <Image
              source={require("@/assets/certificate/blueiso.png")}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />{" "}
            <Image
              source={require("@/assets/certificate/blueiso.png")}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />{" "}
          </View>

          <View className="flex-row px-5 ml-5 my-3">
            {" "}
            <Image
              source={require("@/assets/certificate/gmp.png")}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />{" "}
            <Image
              source={require("@/assets/certificate/helal.png")}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />{" "}
            <Image
              source={require("@/assets/certificate/ghp.png")}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Müşteri Yorumları Bölümü */}
        <View className="mx-5 py-3 my-6">
          <Text className="text-xl font-bold mb-4">Müşteri Yorumları</Text>
          <ProductReview
            averageRating={mockReviewStats.averageRating}
            totalReviews={mockReviewStats.totalReviews}
            ratingBreakdown={mockReviewStats.ratingBreakdown}
            reviews={mockCustomerReviews}
            reviewsPerPage={3}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen


