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
import Categories from "@/components/Categories";
import Bestsellers from "@/components/Bestsellers";

const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

const MainpageMainScreen = () => {


  const navigation = useNavigation<NavigationProp<RootStackParamList & HomeTabParamList>>();
  const { basket } = useBasket();
  const basketLength = basket.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (

      <SafeAreaView className="flex-1 bg-MainBackground">
            <ScrollView>
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
        <TouchableOpacity onPress={() => navigation.navigate("HomeTabs", { screen: "SearchScreen" })}>
          <SearchBarComp value={""} onChangeText={() => {}} editable={false} />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/SliderMain.png")}
          className="w-full h-[350px]"
          resizeMode="contain"
        />


         <Categories/>
     <Bestsellers/>
  
  
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
            </ScrollView>
      </SafeAreaView>

  )
}
export default MainpageMainScreen