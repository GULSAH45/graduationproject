import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PrevIcon from "../../svgs/PrevIcon";
import FlagSvg from "../../svgs/FlagSvg";
import DropDownFlag from "../../svgs/DropDownFlag";

const Adressess = () => {
  const navigation = useNavigation();
  return (
    <View>
      <SafeAreaView>
        <View className="flex-row items-center mx-2 mt-4 my-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("MenuListScreen")}
          >
            <PrevIcon />
          </TouchableOpacity>
          <Text className="text-black text-md font-semibold ml-2">
            Adres Oluştur
          </Text>
        </View>
        <View className="mx-5 py-3 my-4 items-center">
          <Text className="self-start">Adres Başlığı</Text>
          <TextInput
            className="bg-InputBackground border p-4
             border-TextInputBorderColor w-[388px] h-[50px] my-4 rounded"
            placeholder="ev, iş vb..."
          />
          <Text className="self-start">Ad</Text>
          <TextInput
            className="bg-InputBackground border p-4
             border-TextInputBorderColor w-[388px] h-[50px] my-4 rounded"
            placeholder=""
          />
          <Text className="self-start">Soyad</Text>
          <TextInput
            className="bg-InputBackground border
             border-TextInputBorderColor my-4 w-[388px] h-[50px] rounded p-4"
            placeholder=""
          />
          <Text className="self-start">Adres</Text>
          <TextInput
            className="bg-InputBackground border p-4
             border-TextInputBorderColor my-4 rounded w-[388px] h-[50px]"
            placeholder=""
          />
          <Text className="self-start">Apartman, daire</Text>
          <TextInput
            className="bg-InputBackground border border-TextInputBorderColor 
            my-4 w-[388px] h-[50px] rounded p-4"
            placeholder=""
          />
          <Text className="self-start">Şehir</Text>
          <TextInput
            className="bg-InputBackground border
             border-TextInputBorderColor my-4 w-[388px] h-[50px] rounded p-4"
            placeholder=""
          />


        <Text className="text-sm mx-7 my-5">Telefon</Text>
        <View className="bg-InputBackground border
         border-TextInputBorderColor rounded-md 
         flex-row items-center w-[388px] h-[50px] mx-6 px-2">
          <TouchableOpacity className="flex-row items-center mr-2">
            <FlagSvg />
            <DropDownFlag />
          </TouchableOpacity>
          <TextInput
            className="flex-1 p-2"
            placeholder="Telefon numaranızı giriniz"
            keyboardType="phone-pad"
          />
        </View>

       
        </View>
           <View className=" my-5">
            <TouchableOpacity className="items-center w-[101px] h-[55px] 
             bg-black rounded-lg py-2">
              <Text className="text-white text-lg font-bold text-center">
                Gönder
              </Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    </View>
  );
};

export default Adressess;
