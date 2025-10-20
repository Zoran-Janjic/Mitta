import { useLocalSearchParams } from 'expo-router';
import { Text } from "react-native";


const MovieDetails = () => {
    const { id } = useLocalSearchParams()

    console.log("ALL PARAMS:", id); // Log everything

    // Fetch movie details using the id
    // const { data: movie, loading, error } = useFetch(() => fetchMovieDetails({ movieId: id as string })
    // )

    // if (loading) {
    //     return (
    //         <View className='bg-primary flex-1'>
    //             <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
    //                 {/* Movie details content goes here */}
    //                 <View>
    //                     {/* <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}` }} className='w-full h-[550px]' resizeMode='stretch' /> */}
    //                 </View>
    //                 <View className='flex-col items-start justify-center mt-5 px-5'>
    //                     <Text>Details</Text>
    //                 </View>
    //             </ScrollView>
    //         </View>
    //     )
    // }

    return (<Text>Movie Details Screen - ID: {id}</Text>)
}

export default MovieDetails