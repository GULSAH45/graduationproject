import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import AntDesign from "@expo/vector-icons/AntDesign";
const SearchBarComp = () => {
  return (
     <View>
             <View className="items-center font-Inter mt-4">
               <View className="bg-InputBackground rounded-full justify-center
                w-[330px] h-[50px] flex-row items-center px-4">
                 <TouchableOpacity>
                   {" "}
                   <AntDesign name="search1" size={24} color="grey" />
                 </TouchableOpacity>
                 <TextInput
                   className="text-SearchBarPlaceholderColor flex-1 ml-2"
                   placeholder="Aradığınız ürünü yazınız..."
                 />
                 <TouchableOpacity><Text className='text-blue-600'>Vazgeç</Text></TouchableOpacity>
         
               </View>
             </View>
           </View>
  )
}

export default SearchBarComp