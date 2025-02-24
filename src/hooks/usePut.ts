"use client";
import { baseUrl } from "@/utils/app";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";
import { Post } from "@/interface/Post";

function usePut() {
  async function Put(url: string) {
    try {
      let response = await axios.put(
        `${baseUrl}/${url}`,
        {},
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,

            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data, "kjhbgvcxz");

      if (response.status === 200) {
      }
    } catch (error: any) {
      console.error(error);
      toast(error.message);
    } finally {
    }
  }

  return { Put };
}

export default usePut;
