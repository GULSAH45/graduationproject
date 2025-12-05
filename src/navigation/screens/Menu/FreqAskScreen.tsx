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
import { FreqAskData } from "@/data/FreqAsk";

const FreqAskScreen = () => {
  const navigation = useNavigation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"Genel" | "Kargo" | "Ürünler">("Genel");

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const filteredQuestions = FreqAskData.filter(
    (item) => item.category === activeTab
  );

  const getTabStyle = (tabName: "Genel" | "Kargo" | "Ürünler") =>
    activeTab === tabName ? "bg-black" : "bg-TextInputBorderColor";
  const getTabTextStyle = (tabName: "Genel" | "Kargo" | "Ürünler") =>
    activeTab === tabName ? "text-white" : "text-black";

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center mx-2 my-4">
        <TouchableOpacity onPress={() => navigation.navigate("HomeTabs", { screen: "MenuListScreen" })}>
          <PrevIcon />
        </TouchableOpacity>
        <Text className="text-black text-md font-semibold ml-2">S.S.S</Text>
      </View>

      {/* tablar */}
      <View className=" flex-row mx-2">
        <TouchableOpacity onPress={() => setActiveTab("Genel")}>
          <View className={`${getTabStyle("Genel")} p-6 mx-2`}>
            <Text className={`${getTabTextStyle("Genel")} text-sm font-normal`}>
              Genel
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Kargo")}>
          <View className={`${getTabStyle("Kargo")} mx-2 p-6`}>
            <Text className={`${getTabTextStyle("Kargo")} text-sm font-normal`}>
              Kargo
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Ürünler")}>
          <View className={`${getTabStyle("Ürünler")} p-6 mx-2`}>
            <Text className={`${getTabTextStyle("Ürünler")} text-sm font-normal`}>
              Ürünler
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row mx-4 py-4 my-5 items-center">
        <GenelSSS />
        <Text className="text-sm mx-1 font-semibold"> {activeTab.toUpperCase()}</Text>
      </View>

      {/* sorular */}

      <ScrollView>
        <View className="border mx-3 py-2 border-TextInputBorderColor">
          {filteredQuestions.map((item, idx) => (
            <React.Fragment key={idx}>
              <View className="mx-5 py-4 flex-row justify-between items-center">
                <Text className="text-sm font-bold flex-1">
                  {item.question}
                </Text>
                <TouchableOpacity onPress={() => toggleAccordion(idx)}>
                  {openIndex === idx ? <DropdownMinus /> : <DropdownPlus />}
                </TouchableOpacity>
              </View>
              {openIndex === idx && (
                <View className="mx-5 mb-2">
                  <Text className="text-xs text-gray-700">{item.answer}</Text>
                </View>
              )}
              <View className="border-b border-TextInputBorderColor mx-5" />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FreqAskScreen;
