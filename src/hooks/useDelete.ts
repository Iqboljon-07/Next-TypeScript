"use client";
import { baseUrl } from "@/utils/app";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

function useDelete() {
  async function deleteUser(url: string) {
    try {
      const res = await axios.delete(`${baseUrl}/${url}`, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        toast.success("User deleted successfully");
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error("Error deleting user");
    }
  }

  return { deleteUser };
}

export default useDelete;
