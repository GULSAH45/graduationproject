import { View, Image, Text, SafeAreaView } from 'react-native'
import React from 'react'
import SearchBarComp from '../../components/SearchBarComp'

const SearchScreen = () => {
  return (
<SafeAreaView className='mx-5' >
      <Image
                source={require("../../assets/LOGO.png")}
                className="w-[119px] h-[26px] mb-3 mt-3"
                resizeMode="contain"
              />
    <SearchBarComp/>
</SafeAreaView>
  )
}

export default SearchScreen