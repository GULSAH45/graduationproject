import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const MainpageMainScreen = () => {
  return (
    <ScrollView>
      {" "}
      <SafeAreaView className="flex-1 bg-MainBackground">
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
              size={24}
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
        <View>
          <View className="items-center font-Inter mt-4">
            <View className="bg-InputBackground rounded-full justify-center
             w-[330px] h-[50px] flex-row items-center px-4">
              <TouchableOpacity>
                {" "}
                <AntDesign name="search1" size={24} color="black" />
              </TouchableOpacity>
              <TextInput
                className="text-SearchBarPlaceholderColor flex-1 ml-2"
                placeholder="Aradığınız ürünü yazınız..."
              />
            </View>
          </View>
        </View>
        <Image
          source={require("../../assets/SliderMain.png")}
          className="w-full h-[350px]"
          resizeMode="contain"
        />

// Categories
<View>

<Text className="text-md text-TextColor font-semibold ml-3 ">
  Kategoriler
</Text>

</View>

      </SafeAreaView>
    </ScrollView>
  );
};

export default MainpageMainScreen;
