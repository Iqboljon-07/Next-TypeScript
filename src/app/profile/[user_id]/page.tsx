"use client";

import "./style.css";
import { useParams, useRouter } from "next/navigation";


import { FaUserCircle } from "react-icons/fa";
import { VscGlobe } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa";
import Loading from "@/components/loading/Loading";
import useFetch from "@/hooks/useFetch";
import { UserId } from "@/interface/User";
import { Span } from "next/dist/trace";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { GitHub } from "@/interface/Github";
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
    //userId uchun data
    const { user_id } = useParams();
    //const { user_id: username } = useParams();

    const { data: user, loading } = useFetch<UserId>(`profile/user/${user_id}`)
    console.log("Usersssssssssssssss", user);
    console.log(user?.githubusername.toString().slice(19), "githubusername");



    //github uchun
    // const { data: github } = useFetch(`profile/github/${user?.githubusername?.toString().slice(19)}`)
    const { data: github } = useFetch<GitHub[]>(`profile/github/${user?.githubusername}`)
    console.log("github", github);



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
                            {user?.social && user?.social?.facebook ? (
                                <div className="flex gap-3 tarmoqlar">
                                    <FaYoutube onClick={() => location.href = `${user?.social?.youtube}`} />
                                    <FaTwitter onClick={() => location.href = `${user?.social?.twitter}`} />
                                    <FaInstagram onClick={() => location.href = `${user?.social?.instagram}`} />
                                    <ImLinkedin onClick={() => location.href = `${user?.social?.linkedin}`} />
                                    <FaFacebookSquare onClick={() => { location.href = `${user?.social?.facebook}` }} />





                                </div>

                            ) : <VscGlobe className="text-5xl text-white globe " />}
                        </div>
                        {/* //////////////////////////////////////////////////// */}
                        <div className="w-full bg-gray-300 h-80  flex flex-col  border-1 border-zinc-400 px-4">
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
                        {/* ///////////////////////////// */}
                        <div className="exp_edu">

                            <div className="exp_1"><h1 className="text-3xl text-cyan-600 font-bold">Experience</h1>

                                {user?.experience && user?.experience.length ? (

                                    <>
                                        {user?.experience?.map((value) => (
                                            <ul className="grid gap-3">
                                                <li className="font-bold">{value?.company} </li>
                                                <li>{`${value?.from.slice(0, 10)} - ${value?.to?.slice(0, 10)}   `}</li>
                                                <li className="flex items-center gap-2 "><h1 className="font-bold">Position:</h1> {value?.title}  </li>
                                                <li className="flex items-center "><h1 className="font-bold">Location:</h1> { }  </li>
                                                <li className="flex items-center "><h1 className="font-bold">Description:</h1>  </li>

                                            </ul>



                                        ))}

                                    </>
                                ) : <span className="font-bold">No experience credentials</span>}

                            </div>
                            <div className="edu_1"><h1 className="text-3xl text-cyan-600 font-bold">Education</h1>


                                {user?.education && user?.education.length ? (

                                    <>
                                        {user?.education?.map((value) => (
                                            <ul className="grid gap-3">
                                                <li className="font-bold">{value?.school} </li>
                                                <li>{`${value?.from.slice(0, 10)} - ${value?.to?.slice(0, 10)}   `}</li>
                                                <li className="flex items-center gap-2 "><h1 className="font-bold">Degree:</h1> {value?.degree}  </li>
                                                <li className="flex items-center gap-2 "><h1 className="font-bold">Field Of Study:</h1> {value?.fieldofstudy}  </li>
                                                <li className="flex items-center "><h1 className="font-bold">Description:</h1>  </li>

                                            </ul>



                                        ))}

                                    </>
                                ) : <span className="font-bold">No education credentials</span>}
                            </div>
                            {/* //////////////////////////////////////////////////// */}



                        </div>

                        <div className="github grid gap-4">
                            <h1 className="text-2xl text-cyan-600 font-bold">Github Repos</h1>
                            <div className="flex flex-col grid-cols-1 grid-rows-5 gap-5">

                                {github?.map((val) => (

                                    <div key={val.id} className="border-2 border-solid gray py-10 flex items-center  justify-between px-5 ">
                                        <div className="text-sm">
                                            <Link className=" text-cyan-600 text-lg font-bold" href={`${val?.html_url}`} >{val?.name} </Link>
                                            <p>{val?.description}</p>
                                        </div>
                                        <div className="grid text-sm">
                                            <button className="px-1 py-1 bg-cyan-600 text-white ">Stars:0</button>
                                            <button className="px-1 py-1 bg-black text-white ">Watchers: 0</button>
                                            <button className="px-1 py-1 bg-gray-300">Forks: 0</button>

                                        </div>
                                    </div>

                                ))}

                            </div>


                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default View;
