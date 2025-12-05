import React, { useEffect, useState } from "react";
import {

  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SearchBarComp from "@/components/SearchBarComp";
import { useNavigation } from "@react-navigation/native";
import { CategoryParams, CategoryResponse } from "@/types/Product";
import Categories from "@/components/Categories";
import Bestsellers from "@/components/Bestsellers";

const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";
// Fetch categories from the API

const WholeProduct = () => {
  const [categories, setCategories] = useState<CategoryParams[]>([]);
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const navigation = useNavigation();


  return (

      <SafeAreaView className="flex-1 bg-MainBackground">
            <ScrollView>
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

        <TouchableOpacity onPress={() => navigation.navigate("HomeTabs", { screen: "SearchScreen" })}>
        <SearchBarComp value={""} editable={false} onChangeText={function (text: string): void {
          throw new Error("Function not implemented.");
        } } />
        </TouchableOpacity>

<Categories />
<Bestsellers />
       </ScrollView>
      </SafeAreaView>
 
  )
}

export default WholeProduct

