
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
import TrendingMovieCard from "@/components/TrendingMovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getTrendingMovies } from "@/services/appwrite_api";
import useFetch from "@/services/hooks/useFetch";
import { fetchMovies } from "@/services/tmbd_api";
import { useRouter } from "expo-router";

export default function Index(props: any) {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies)

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

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />)
          : moviesError || trendingError ? (<Text className="text-red-500">Error: {moviesError?.message || trendingError?.message}</Text>)
            : (
              <FlatList
                data={movies}
                className="mt-2 pb-32 flex-1"
                ListHeaderComponent={
                  <>
                    <SearchBar onPress={() => { router.push("/search") }} placeholder="Search for a movie" />

                    {trendingMovies && (
                      <View className="mt-10">
                        <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                      </View>
                    )}

                    <FlatList
                      horizontal
                      data={trendingMovies}
                      ItemSeparatorComponent={() => <View className="w-4" />}
                      className="mb-4 mt-3"
                      style={{ height: 280 }}
                      renderItem={({ item, index }) => (
                        <TrendingMovieCard movie={item} index={index} />
                      )}
                      keyExtractor={(item, index) =>
                        String((item as any)?.movie_id ?? (item as any)?.id ?? index)
                      }
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}
                      scrollEnabled={true}
                    />

                    <Text className="text-lg text-white font-bold mb-3 mt-5">
                      Latest Movies
                    </Text>
                  </>
                }
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
            )}

      </View>

    </View>
  )
}
