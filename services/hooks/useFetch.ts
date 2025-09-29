import { useEffect, useState } from "react";
/**
 * Custom React hook for fetching data asynchronously.
 *
 * @template T - The type of data expected from the fetch function.
 * @param fetchFunction - An asynchronous function that returns a promise resolving to data of type T.
 * @returns An object containing the fetched data, loading state, and any encountered error.
 *
 * @example
 * const { data, loading, error } = useFetch<User>(() => fetchUser(userId));
 */

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("An unknown error occurred using fetchData")
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
