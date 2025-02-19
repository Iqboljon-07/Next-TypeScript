"use client";

import "./style.css";


import { FaUser } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { LuUserMinus } from "react-icons/lu";

import Loading from "@/components/loading/Loading";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { MeDashboard } from "@/interface/User";
import { IoPersonAdd } from "react-icons/io5";
import { MdCastForEducation } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/app";
import { toast } from "react-toastify";


function Dashboard<T>() {
  const router = useRouter();
  //usefetchdan olindi
  const { user, loading } = useAuth()
  console.log("user", user)

  //usefetchdan olindi
  const { data: me, setData } = useFetch<MeDashboard>(`profile/me`)

  console.log("me", me);



  console.log(user);


  async function DeleteExperience(exp_id: string) {

    try {


      const response = await axios.delete(`${baseUrl}/profile/experience/${exp_id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      })
      console.log(response);



      if (response.status === 200) {
        toast.info("Message deleted")
        // setData(me?.filter((val: any) => val.id !== exp_id))

      }


    } catch (err) {

      toast.error("Failed to delete message")
    }

  }




  return (
    <>

      {loading ? <Loading /> :
        <div className="dashboard">
          <div className="dashboard_item">
            <h1 className="text-5xl font-bold text-cyan-500">Dashboard</h1>
            <h2 className="flex items-center gap-2 text-2xl font-medium ">
              <FaUser /> Welcome {user?.name || <div className="loader"></div>}
            </h2>




            {me?.bio ? (
              <>
                <div className="flex gap-3 me_wrapper">


                  <Link className="w-32  text-center h-10 flex items-center justify-center gap-1" href={"/edit-profile"}><FaUser className="text-sky-700" /> Edit Profile</Link>
                  <Link className="w-40 text-center h-10 flex items-center justify-center gap-1" href={"/add-experience"}><IoPersonAdd className="text-sky-700" /> Add Experience </Link>
                  <Link className="w-40 text-center h-10 flex items-center justify-center gap-1" href={"/add-education"}><MdCastForEducation className="text-sky-700" /> Add Education</Link>

                </div>



                <div className="grid gap-8  credente">
                  <h1 className="text-3xl  font-medium">Experience Credentials</h1>


                  <table>
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th><pre>Years       </pre></th>
                        <th></th>

                      </tr>



                      {
                        me?.experience?.map((experience) => (
                          <tr key={experience._id}>


                            <td>{experience?.company}</td>
                            <td> {experience?.title}</td>
                            <td> {`${experience?.from.toString().slice(0, 10)} - ${experience?.to ? experience.to.toString().slice(0, 10) : "Now"}`}</td>
                            <td onClick={() => DeleteExperience(experience._id)} className="text-red-600 text-2xl"><MdDelete /></td>
                          </tr>
                        ))
                      }
                    </thead>
                  </table>


                </div>

                <div className="grid gap-8  credente">
                  <h1 className="text-3xl  font-medium">Experience Credentials</h1>


                  <table>
                    <thead>
                      <tr>
                        <th>Scholl</th>
                        <th>Degree</th>
                        <th><pre>Years           </pre></th>
                        <th></th>

                      </tr>

                      {

                        me?.education?.map((education) => (
                          <tr key={education._id}>


                            <td>{education?.school}</td>
                            <td> {education?.degree}</td>
                            <td> {`${education?.from.toString().slice(0, 10)} - ${education?.to?.toString()?.slice(0, 10)}`}</td>
                            <td className="text-red-600 text-2xl"><MdDelete /></td>
                          </tr>
                        ))
                      }

                    </thead>
                  </table>
                </div>
                <button className="bg-[red] w-48 h-10 text-white flex items-center justify-center gap-2 btn "><LuUserMinus className="text-2xl" /> Delete My Account</button>
              </>

            ) : (
              <>
                <p className="text-base text-gray-400">
                  You have not yet setup a profile, please add some info
                </p>
                <button
                  onClick={() => router.push("/create-profile")}
                  className="w-36 h-10 bg-cyan-500 text-white btn "
                >
                  Create Profile
                </button>
              </>
            )}


          </div>
        </div>}
    </>
  );
}


export default Dashboard;
