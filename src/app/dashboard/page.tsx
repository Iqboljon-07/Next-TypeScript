"use client";

import "./style.css";


import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";


import Loading from "@/components/loading/Loading";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { MeDashboard } from "@/interface/User";
import { IoPersonAdd } from "react-icons/io5";
import { MdCastForEducation } from "react-icons/md";


function Dashboard() {
  const router = useRouter();

  const { user, loading } = useAuth()

  const { data: me } = useFetch<MeDashboard>(`profile/me`)
  console.log("me", me);




  console.log(user);


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
              <div className="flex gap-3">

                <button className="w-32 bg-gray-300 text-center h-10 flex items-center justify-center gap-1" ><FaUser className="text-sky-700" /> Edit Profile</button>
                <button className="w-40 bg-gray-300 text-center h-10 flex items-center justify-center gap-1"><IoPersonAdd className="text-sky-700" /> Add Experience </button>
                <button className="w-40 bg-gray-300 text-center h-10 flex items-center justify-center gap-1"><MdCastForEducation className="text-sky-700" /> Add Education</button>

              </div>
            ) : (
              <>
                <p className="text-base text-gray-400">
                  You have not yet setup a profile, please add some info
                </p>
                <button
                  onClick={() => router.push("/create-profile")}
                  className="w-36 h-10 bg-cyan-500 text-white "
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
