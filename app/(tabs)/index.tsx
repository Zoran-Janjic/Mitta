
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View
} from "react-native";
import "../../localization/i18n";
// Import your images object or define it here
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/services/hooks/useFetch";
import { fetchMovies } from "@/services/tmbd_api";
import { useRouter } from "expo-router";

export default function Index(props: any) {
  const router = useRouter();

  const { data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ""
  }))

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <View className="flex-1 px-5">

        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />

        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />)
          : moviesError ? (<Text className="text-red-500">Error: {moviesError?.message}</Text>)
            : (
              <View className="flex-1">
                <SearchBar onPress={() => { router.push("/search") }} placeholder="Search for a movie" />

                <Text className="text-lg text-white font-bold mb-3">
                  Latest Movies
                </Text>

                <FlatList
                  data={movies}
                  className="mt-2 pb-32 flex-1"
                  renderItem={({ item }) => (
                    <MovieCard {...item} />
                  )}
                  numColumns={3}
                  keyExtractor={(item) => item.id.toString()}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}
                />

              </View>)}

      </View>

    </View>
  )
}
