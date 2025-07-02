import React from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SearchBarComp from "../../components/SearchBarComp";

const WholeProduct = () => {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 12 }}>
        <Image
          source={require("../../assets/LOGO.png")}
          style={{ width: 119, height: 26, marginTop: 12, marginBottom: 12 }}
          resizeMode="contain"
        />
        <TouchableOpacity style={{ paddingVertical: 12, paddingHorizontal: 20 }}>
          <AntDesign name="shoppingcart" size={21} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderWidth: 1,
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 0.5,
        }}
      />

      <SearchBarComp />
    </SafeAreaView>
  );
};

export default WholeProduct;

