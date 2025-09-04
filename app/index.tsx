
import "../localization/i18n";
import IntroSliderScreen from "./IntroSliderScreen";

export default function Index(props: any) {
  // Pass navigation if using a navigation library, otherwise remove navigation prop
  return <IntroSliderScreen {...props} />;
}
