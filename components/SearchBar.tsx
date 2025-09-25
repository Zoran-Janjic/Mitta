import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from "@/constants/icons";

interface Props{
placeholder:string,
onPress?:()=>void
}

const SearchBar = ({placeholder, onPress}:Props) => {

  return (
    <View className="flex-row bg-dark-200 items-center rounded-full px-5 py-5">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor={"#ab8bff"} />
      <TextInput onPress={onPress} onChangeText={()=>{}} value="" className="flex-1 ml-2 text-white" placeholder={placeholder} placeholderTextColor="#a8b5db" />
    </View>
  )
}

export default SearchBar