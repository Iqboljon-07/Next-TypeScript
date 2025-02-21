"use client";

import { baseUrl } from "@/utils/app";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function useDeleteProfile(url: string) {
  async function deleteProfile() {
    try {
      const response = await axios(`${baseUrl}/${url}`);
      if (response.status === 200) {
        toast.success("Profile deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete profile.");
    }
  }

  return { deleteProfile };
}

export default useDeleteProfile;
