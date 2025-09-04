import { Picker } from "@react-native-picker/picker";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "日本語", value: "ja" },
];

export default function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language);

  const handleChange = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View className="w-full items-center my-4">
      <Picker
        selectedValue={selectedLanguage}
        style={{ width: 180 }}
        onValueChange={handleChange}
      >
        {LANGUAGES.map((lang) => (
          <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
        ))}
      </Picker>
      <Text className="mt-2 text-gray-500">Current: {selectedLanguage}</Text>
    </View>
  );
}
