
import { Text, View } from "react-native";
import "../localization/i18n";

export default function Index(props: any) {
  // Pass navigation if using a navigation library, otherwise remove navigation prop
  // return <IntroSliderScreen {...props} />;
  return (
    <View>
      <Text>Movie App Home Screen</Text>
    </View>
  )
}
