export const TMBD_API_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_TMBD_API_KEY || "",
  BASE_URL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMBD_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMBD_API_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}`
    : `${TMBD_API_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMBD_API_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async ({
  movieId,
}: {
  movieId: string;
}): Promise<MovieDetails> => {
  try {
    console.log("id is ", movieId);

    const response = await fetch(
      `${TMBD_API_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMBD_API_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMBD_API_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error in fetchMovieDetails", error);
    throw error;
  }
};
