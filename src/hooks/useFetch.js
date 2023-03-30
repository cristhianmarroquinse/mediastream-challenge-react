import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
};
