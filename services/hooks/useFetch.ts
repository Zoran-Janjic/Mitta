import { useEffect, useState } from "react";

// useFetch: a small reusable hook to call any async function and track
// the result, loading state, and any error that happens.
//
// Type parameter <T> is the type of the data the fetchFunction returns.
// fetchFunction should be an async function that returns a Promise<T>.
// autoFetch (default true) controls whether the hook runs the fetch
// as soon as the component mounts.

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {

  // where we store the successful result (or null before any result)
  const [data, setData] = useState<T | null>(null);

  // true while the request is in progress
  const [loading, setLoading] = useState<boolean>(false);
  
  // any error thrown by the fetchFunction
  const [error, setError] = useState<Error | null>(null);

  // fetchData: actually runs the provided async function and updates state
  const fetchData = async () => {
    try {
      // start loading and clear previous errors
      setLoading(true);
      setError(null);
      // call the user-supplied async function
      const result = await fetchFunction();
      // store the result so consumers can use it
      setData(result);
    } catch (err) {
      // store the error so consumers can show it
      setError(
        err instanceof Error
          ? err
          : new Error("An unknown error occurred using fetchData")
      );
    } finally {
      // no matter success or failure, we're no longer loading
      setLoading(false);
    }
  };

  // reset: clear any saved data/error and loading state
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  // run the fetch automatically when the component mounts if autoFetch is true
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // we intentionally don't add fetchFunction to the deps here to
    // avoid re-running the effect on every render if the function is re-created.
    // If you need to react to changes in fetchFunction, pass autoFetch=false and
    // call refetch manually when needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return a small API: the data, loading flag, error, plus helpers
  // - refetch: run the async function again
  // - reset: clear stored data and error
  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
