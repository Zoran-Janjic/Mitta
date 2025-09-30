import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import useFetch from "@/services/hooks/useFetch";
import { fetchMovies } from "@/services/tmbd_api";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");



    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    const { data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: moviesRefetch,
        reset: moviesReset
    } = useFetch(() => fetchMovies({
        query: searchQuery
    }), false)

    // Debounced search effect
    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchQuery.trim()) {
                moviesRefetch();
            } else {
                moviesReset();
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [searchQuery]);

    return (
        <View className='bg-primary flex-1'>
            <Image source={images.bg} className='flex-1 absolute w-full z-0' />

            <FlatList data={movies}
                renderItem={({ item }) => (
                    <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                className='px-5'
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className='w-full  flex-row justify-center mt-20 items-center'>
                            <Image source={icons.logo} className='w-12 h-10' />
                        </View>

                        <View>
                            <SearchBar placeholder="Search for a movie" value={searchQuery}
                                onChangeText={handleSearch} />
                        </View>

                        {moviesLoading && (
                            <ActivityIndicator size="large" color="#0000ff" className="my-3" />
                        )}
                        {moviesError && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {moviesError.message}
                            </Text>
                        )}

                        {!moviesLoading &&
                            !moviesError &&
                            searchQuery.trim() &&
                            movies?.length! > 0 && (
                                <Text className="text-xl text-white font-bold">
                                    Search Results for{" "}
                                    <Text className="text-accent">{searchQuery}</Text>
                                </Text>
                            )}

                    </>
                }
            />

        </View>
    )
}
export default Search