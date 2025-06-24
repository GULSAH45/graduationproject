import { View, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchBarComp from '../../components/SearchBarComp';

const WholeProduct = () => {
  return (
    <SafeAreaView>
        <View className="flex-row justify-between mx-3 ">
          {" "}
          <Image
            source={require("../../assets/LOGO.png")}
            className="w-[119px] h-[26px] mb-3 mt-3"
            resizeMode="contain"
          />
          <TouchableOpacity>
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
            <SearchBarComp/>
    </SafeAreaView>
  )
}

export default WholeProduct