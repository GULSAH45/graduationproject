import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import PrevIcon from "../../svgs/PrevIcon";
import GenelSSS from "../../svgs/GenelSSS";
import DropdownPlus from "../../svgs/dropdownPlus";
import DropdownMinus from "../../svgs/dropdownMinus";
import { useNavigation } from "@react-navigation/native";

const FreqAskScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center mx-2 mt-4 my-4">
        <TouchableOpacity onPress={() => navigation.navigate("MenuListScreen")}>
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
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              OJS Nutrition ürünlerinin menşei neresi?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              Hangi sertifikalarınız var?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              Satılan ürünler garantili midir? Değişim var mı?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />{" "}
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              Sipariş verirken sorun yaşıyorum, ne yapmam gerekir?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />{" "}
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              OJS Nutrition ürünleri nerede satılıyor?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />{" "}
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              Yüksek proteinli ürünleri kimler kullanabilir?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />{" "}
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              Taksit seçeneği neden yok?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />{" "}
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              Siparişimi nasıl iptal edebilirim?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />{" "}
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              Kapağın altındaki folyo açılmış veya tam yapışmamış gibi duruyor?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />{" "}
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              Sattığınız ürünler ilaç mıdır?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />{" "}
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              Siparişimi teslim alırken nelere dikkat etmeliyim ?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />{" "}
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              Kapıda ödeme hizmetiniz var mı?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              Sipariş takibimi nasıl yapabilirim ?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />{" "}
          <View className="mx-5 py-4 flex-row justify-between ">
            <Text className=" text-sm  font-bold">
              İptal ve İade ettiğim ürünlerin tutarı hesabıma ne zaman aktarılır
              ?
            </Text>
            <TouchableOpacity>
              {" "}
              <DropdownMinus />
            </TouchableOpacity>
          </View>
          <View className="border-b border-TextInputBorderColor mx-5" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FreqAskScreen;
