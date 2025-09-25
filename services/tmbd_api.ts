export const TMBD_API_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_TMBD_API_KEY || "",
  BASE_URL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMBD_API_KEY}`,
  },
};

export const fetchMovice = async ({ query }: { query: string }) => {
  const endpoint = "/discover/movie?sort_by=popularity.desc";

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMBD_API_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};
