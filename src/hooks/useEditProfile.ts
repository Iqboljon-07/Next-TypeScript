import { baseUrl } from "@/utils/app";
import axios from "axios";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function useEditProfile() {
  const router = useRouter();
  async function editProfil(
    bio: string,
    company: string,
    location: string,

    githubusurname: string,
    status: string,
    skills: string | [],
    website: string,
    youtube: string,
    twitter: string,
    instagram: string,
    linkedin: string,
    facebook: string
  ) {
    try {
      const response = await axios.post(
        `${baseUrl}/profile`,
        {
          bio,
          company,
          location,

          githubusurname,
          status,
          skills,
          website,
          youtube,
          twitter,
          instagram,
          linkedin,
          facebook,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Editttttt", response.data);

      toast.success("Saqlandi");
    } catch (error: any) {
      console.error(error);
      toast(error.message);
      return error;
    } finally {
    }
  }
  return { editProfil };
}

export default useEditProfile;
