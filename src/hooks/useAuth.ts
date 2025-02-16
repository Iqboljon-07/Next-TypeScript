"use client";
import { User } from "@/interface/User";
import { baseUrl } from "@/utils/app";
import axios from "axios";
import { log } from "console";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useAuth<T>() {
  const [user, setUser] = useState<T | User[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function getMe() {
    try {
      setError("");
      let response = await axios.get(`${baseUrl}/auth`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getMe();
  }, []);

  async function login(email: string, password: string) {
    try {
      setError("");
      setLoading(true);
      let response = await axios.post(
        `${baseUrl}/auth`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        setUser(response.data.token);
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
        toast.success("Ro'yhatdan o'tdingiz");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {}
  return { user, login, logout, error, loading };
}

export default useAuth;
