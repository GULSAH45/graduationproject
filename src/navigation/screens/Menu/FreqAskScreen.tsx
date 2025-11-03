import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import PrevIcon from "@/svgs/PrevIcon";
import GenelSSS from "@/svgs/GenelSSS";
import DropdownPlus from "@/svgs/dropdownPlus";
import DropdownMinus from "@/svgs/dropdownMinus";
import { useNavigation } from "@react-navigation/native";


const FreqAskScreen = () => {
  const navigation = useNavigation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center mx-2 mt-4 my-4">
        <TouchableOpacity onPress={() => navigation.navigate("HomeTabs", { screen: "MenuListScreen" })}>
          <PrevIcon />
        </TouchableOpacity>
        <Text className="text-black text-md font-semibold ml-2">S.S.S</Text>
      </View>

      {/* tablar */}
      <View className=" flex-row mx-2">
        <TouchableOpacity>
          {" "}
          <View className="bg-black p-6 mx-2">
            <Text className=" text-white text-sm font-normal">Genel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          {" "}
          <View className="bg-TextInputBorderColor mx-2 p-6">
            {" "}
            <Text className="text-black text-sm font-normal">Kargo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="bg-TextInputBorderColor p-6 mx-2">
            <Text className="text-black text-sm font-normal">Ürünler</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row mx-4 py-4 my-5 items-center">
        <GenelSSS />
        <Text className="text-sm mx-1font-semibold"> GENEL</Text>
      </View>

      {/* sorular */}

      <ScrollView>
        <View className="border mx-3 py-2 border-TextInputBorderColor">
          {/* 1. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                OJS Nutrition ürünlerinin menşei neresi?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(0)}>
                {openIndex === 0 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 0 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 2. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                Hangi sertifikalarınız var?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(1)}>
                {openIndex === 1 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 1 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 3. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                Satılan ürünler garantili midir? Değişim var mı?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(2)}>
                {openIndex === 2 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 2 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 4. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                Sipariş verirken sorun yaşıyorum, ne yapmam gerekir?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(3)}>
                {openIndex === 3 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 3 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 5. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                OJS Nutrition ürünleri nerede satılıyor?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(4)}>
                {openIndex === 4 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 4 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 6. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                Yüksek proteinli ürünleri kimler kullanabilir?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(5)}>
                {openIndex === 5 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 5 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 7. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                Taksit seçeneği neden yok?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(6)}>
                {openIndex === 6 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 6 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 8. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                Siparişimi nasıl iptal edebilirim?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(7)}>
                {openIndex === 7 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 7 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 9. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                Kapağın altındaki folyo açılmış veya tam yapışmamış gibi duruyor?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(8)}>
                {openIndex === 8 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 8 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 10. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                Sattığınız ürünler ilaç mıdır?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(9)}>
                {openIndex === 9 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 9 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 11. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                Siparişimi teslim alırken nelere dikkat etmeliyim ?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(10)}>
                {openIndex === 10 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 10 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 12. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                Kapıda ödeme hizmetiniz var mı?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(11)}>
                {openIndex === 11 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 11 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 13. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                Sipariş takibimi nasıl yapabilirim ?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(12)}>
                {openIndex === 12 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 12 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
          {/* 14. Soru */}
          <React.Fragment>
            <View className="mx-5 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold flex-1">
                İptal ve İade ettiğim ürünlerin tutarı hesabıma ne zaman aktarılır ?
              </Text>
              <TouchableOpacity onPress={() => toggleAccordion(13)}>
                {openIndex === 13 ? <DropdownMinus /> : <DropdownPlus />}
              </TouchableOpacity>
            </View>
            {openIndex === 13 && (
              <View className="mx-5 mb-2">
                <Text className="text-xs text-gray-700">Burada cevabı göreceksiniz.</Text>
              </View>
            )}
            <View className="border-b border-TextInputBorderColor mx-5" />
          </React.Fragment>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FreqAskScreen;
