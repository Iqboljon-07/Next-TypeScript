"use client";

import "./style.css";


import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

import Loading from "@/components/loading/Loading";


function Dashboard() {
  const router = useRouter();

  const { user, loading } = useAuth()




  return (
    <>

      {loading ? <Loading /> :
        <div className="dashboard">
          <div className="dashboard_item">
            <h1 className="text-5xl font-bold text-cyan-500">Dashboard</h1>
            <h2 className="flex items-center gap-2 text-2xl font-medium ">
              <FaUser /> Welcome {user?.name || "Iqboljon"}
            </h2>




            <p className="text-base text-gray-400">
              You have not yet setup a profile, please add some info
            </p>
            <button
              onClick={() => router.push("/create-profile")}
              className="w-36 h-10 bg-cyan-500 text-white "
            >
              Create Profile
            </button>


          </div>
        </div>}
    </>
  );
}

export default Dashboard;
