import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function LanguageScreen() {
  const { t, i18n } = useTranslation();
  return (
    <View className="flex-row justify-center items-center gap-4 mt-8">
      <TouchableOpacity
        className="bg-gray-200 py-3 px-6 rounded-lg items-center"
        onPress={() => i18n.changeLanguage("en")}
      >
        <Text className="text-base font-semibold">English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-gray-200 py-3 px-6 rounded-lg items-center"
        onPress={() => i18n.changeLanguage("ja")}
      >
        <Text className="text-base font-semibold">Japanese</Text>
      </TouchableOpacity>
    </View>
  );
}
