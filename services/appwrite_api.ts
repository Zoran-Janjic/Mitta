// track searches made by a user
import { Client, Databases, ID, Query } from "react-native-appwrite";

// Define client first
const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const APPWRITE_API_CONFIG = {
  DATABASE_ID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  COLLECTION_ID: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!,

  client: client,
  database: new Databases(client),
};

export const updateMovieSearchCount = async (query: string, movie: Movie) => {
  try {
    //  Check if record of search term exists
    const result = await APPWRITE_API_CONFIG.database.listDocuments(
      APPWRITE_API_CONFIG.DATABASE_ID,
      APPWRITE_API_CONFIG.COLLECTION_ID,
      [Query.equal("searchTerm", query)]
    );

    //  If a entry exist increment the SearchCount field
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await APPWRITE_API_CONFIG.database.updateDocument(
        APPWRITE_API_CONFIG.DATABASE_ID,
        APPWRITE_API_CONFIG.COLLECTION_ID,
        existingMovie.$id,
        {
          count: (existingMovie.count || 0) + 1,
        }
      );
    } else {
      // If no entry create a new a new entry in the appwrite database
      await APPWRITE_API_CONFIG.database.createDocument(
        APPWRITE_API_CONFIG.DATABASE_ID,
        APPWRITE_API_CONFIG.COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          movieId: movie.id,
          count: 1,
          title: movie.title,
          posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }

    console.log("Search result:", result);
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    //  Check if record of search term exists
    const result = await APPWRITE_API_CONFIG.database.listDocuments(
      APPWRITE_API_CONFIG.DATABASE_ID,
      APPWRITE_API_CONFIG.COLLECTION_ID,
      [Query.limit(10), Query.orderDesc("count")]
    );
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log("error in getTrendingMovies:", error);
    return undefined;
  }
};
