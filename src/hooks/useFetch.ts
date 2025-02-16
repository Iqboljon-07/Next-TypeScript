"use client";
import { baseUrl } from "@/utils/app";
import axios from "axios";
import React, { useEffect, useState } from "react";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      let response = await axios.get(`${baseUrl}/url`);
      console.log(response.data);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
      setError(null);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return { data, error, loading, refetch: fetchData };
}

export default useFetch;
