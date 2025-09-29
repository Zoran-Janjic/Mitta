import { icons } from "@/constants/icons";
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-4 py-3">
      <Image
        source={icons.search}
        className="size-5 mr-3"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        onChangeText={() => { }}
        value={""}
        className="flex-1 text-left text-white"
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
      />
    </View>
  );
}

export default SearchBar