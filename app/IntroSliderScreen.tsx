
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import LanguageDropdown from "./LanguageDropdown";

export default function IntroSliderScreen({ navigation }: { navigation: any }) {
    const { t, i18n } = useTranslation();
    return (
        <View className="flex-1 justify-center items-center bg-blue-100 px-8">
            <Text className="text-2xl font-bold text-center mb-8">
                {t("screens.intro.text.introText")}
            </Text>
            <View className="flex-row w-full justify-center gap-4 mb-8">
                <TouchableOpacity
                    className="flex-1 bg-gray-200 py-3 rounded-lg items-center"
                    onPress={() => navigation?.navigate && navigation.navigate("Login")}
                >
                    <Text className="text-base font-semibold">
                        {t("screens.intro.text.login")}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 bg-blue-500 py-3 rounded-lg items-center"
                    onPress={() => navigation?.navigate && navigation.navigate("Register")}
                >
                    <Text className="text-base font-semibold text-white">
                        {t("screens.intro.text.signup")}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Language Dropdown */}
            <LanguageDropdown />
        </View>
    );
}
