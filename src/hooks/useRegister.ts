"use client";

import { baseUrl } from "@/utils/app";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [isclient, SetIsclient] = useState<boolean>(false);

  useEffect(() => {
    SetIsclient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, [isclient]);

  async function register(name: string, email: string, password: string) {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/users`, {
        name,
        email,
        password,
      });
      console.log(response);

      if (response.status === 200) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", response.data.token);
        }
        toast.success("User registered successfully!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err.message);
      setLoading(false);
      toast(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, register };
}

export default useRegister;
