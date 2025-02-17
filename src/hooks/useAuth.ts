"use client";
import { User } from "@/interface/User";
import { baseUrl } from "@/utils/app";
import axios from "axios";
import { log } from "console";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  //const token = localStorage.getItem("token");

  async function getMe() {
    try {
      setError("");
      let response = await axios.get(`${baseUrl}/auth`, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      });

      console.log(response);
      if (response.status === 200) {
        setUser(response.data as User);
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
        window.localStorage.setItem("token", response.data.token);

        router.push("/dashboard");

        toast.success("Ro'yhatdan o'tdingiz");

        // setTimeout(() => {
        //   location.reload();
        // }, 1000);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error("Ro'yhatdan o'tishda xatolik");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");

      router.push("/login");
      toast.success("Tark etdingiz");
    }
  }
  return { user, login, logout, error, loading };
}

export default useAuth;
