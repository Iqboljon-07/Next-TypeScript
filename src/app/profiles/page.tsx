"use client";

import "./style.css";
import { FaConnectdevelop } from "react-icons/fa";

import user from "@/images/user.jpg";
import { FaCheck } from "react-icons/fa";

import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import useFetch from "@/hooks/useFetch";
import { Developer } from "@/interface/User";

function Developers() {

    const router = useRouter();
    const { data, error, loading } = useFetch<Developer[]>("profile")
    console.log("DATALLLLLLL", data);


    if (loading) {
        return <Loading />
    }
    return (

        <>

            <div className="my-[70px] developers">
                <div className="developers_item">
                    <h1 className="text-5xl text-blue-400 font-bold">Developers</h1>
                    <h2 className="flex  items-center text-2xl font-medium gap-2">
                        <FaConnectdevelop /> Browse and connect with developers
                    </h2>

                    <div className="dev_profile">
                        {data?.map((item) => (
                            <div
                                key={item._id}
                                className="bg-gray-200 flex items-center px-4 "
                            >
                                <img style={{ borderRadius: "100%" }} src={item?.user?.avatar} alt="" />

                                <div className=" w-full px-10 py-8  flex justify-between items-center ">
                                    <div className="flex flex-col  gap-3">
                                        <h1 className="text-2xl font-bold">{item.user?.name} </h1>

                                        <h1>
                                            {item.status} at {item.company}
                                        </h1>
                                        <h1>{item.location}</h1>
                                        <button
                                            onClick={() => router.push(`/profile/${item.user._id}`)}
                                            className="w-28 py-2 bg-cyan-500 text-white"
                                        >
                                            View profile
                                        </button>
                                    </div>

                                    <h1 className="text-cyan-500 flex flex-col items-center font-medium gap-1 ">

                                        <div className="flex w-24 flex-col gap-2">

                                            {item.skills.slice(0, 4).map((val, inx) => (
                                                <div className="grid grid-cols-2 items-center  text-lg gap-1" key={inx}>
                                                    <FaCheck />
                                                    <h1>{(val)}</h1>
                                                </div>

                                            ))}
                                        </div>

                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Developers;
