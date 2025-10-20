import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface TrendingCardProps {
    movie: {
        id: number;
        title: string;
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        posterUrl: string;
        release_date: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    };
    index: number;
}

const TrendingCard = ({
    movie: { id, title, posterUrl },
    index,
}: TrendingCardProps) => {

    console.log("first TrendingCard is ", id, title, posterUrl, index);

    return (
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity className="w-32">
                {/* Poster image container with index overlay */}
                <View className="relative">
                    <Image
                        source={{ uri: posterUrl }}
                        className="w-32 h-48 rounded-lg"
                        resizeMode="cover"
                    />

                    {/* Index number in bottom-left corner of image */}
                    <View
                        style={{
                            position: "absolute",
                            left: -8,
                            bottom: -8,
                            zIndex: 9999,
                            elevation: 30,
                        }}
                    >
                        <MaskedView
                            style={{
                                width: 64,
                                height: 64,
                                overflow: "visible",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 16,
                            }}
                            maskElement={
                                <View className="absolute bottom-1  px-2 py-1 rounded-full">

                                    <Text
                                        className="text-6xl font-bold text-white"
                                    >
                                        {index + 1}
                                    </Text>
                                </View>
                            }
                        >
                            <Image
                                source={images.rankingGradient}
                                style={{ width: 64, height: 64, borderRadius: 16 }}
                                resizeMode="cover"
                            />
                        </MaskedView>
                    </View>
                </View>

                {/* Title below the image */}
                <Text
                    className="text-sm font-bold mt-2 text-white"
                    numberOfLines={2}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        </Link>
    );
};

export default TrendingCard;