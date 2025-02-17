"use client";

import "./style.css";
import { useParams, useRouter } from "next/navigation";


import { FaUserCircle } from "react-icons/fa";
import { VscGlobe } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa";
import Loading from "@/components/loading/Loading";
import useFetch from "@/hooks/useFetch";
import { UserId } from "@/interface/User";
//import { UserId } from "@/interface/User";

// interface UserId {

//     bio: string;
//     data: string;
//     status: string;
//     company: string;
//     githubusername: string;
//     user: {
//         _id: number | string; //o'zida yozza ham bo'ladi
//         name: string;
//         avatar: string;


//     }
//     website: string;
//     skills: [];
//     social: {};
//     location: string;


// }

function View() {
    let router = useRouter();
    // let param = useParams();
    // console.log(param);
    const { user_id } = useParams();
    const { data: user, loading } = useFetch<UserId>(`profile/user/${user_id}`)
    console.log("Usersssssssssssssss", user);




    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="view">
                    <div className="view_item">
                        <button
                            onClick={() => router.push("/profiles")}
                            className="w-40 py-3 bg-gray-300"
                        >
                            Back to Profiles
                        </button>
                        <div className="w-full h-[600px] bg-cyan-600 flex items-center flex-col justify-center gap-6 ">
                            <FaUserCircle className="text-[280px] text-gray-400 " />

                            <h1 className="text-white text-5xl "> {user?.user?.name} </h1>

                            <h1 className="text-white text-2xl ">
                                {`${user?.status} at ${user?.company}  `}
                            </h1>
                            <h1 className="text-white">{user?.location} </h1>
                            <VscGlobe className="text-5xl text-white globe " />
                        </div>

                        <div className="w-full bg-gray-300 h-80  flex flex-col  border-2 border-zinc-400 px-4">
                            <div className="w-full h-[50%] border_1 flex items-center justify-center flex-col gap-1">
                                <h1 className="text-2xl text-cyan-600">Users Bio</h1>
                                <h1>{user?.bio} </h1>
                            </div>
                            <div className="w-full h-[50%] border_1 flex items-center justify-center flex-col gap-1">
                                <h1 className="text-2xl text-cyan-600">Scills Set</h1>
                                <div className="flex gap-4">
                                    {user?.skills.map((item, inx) => (
                                        <div key={inx} className="flex items-center gap-1">
                                            <FaCheck />
                                            <h1 className="flex">{item} </h1>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default View;
