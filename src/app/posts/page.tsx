"use client"
import useFetch from "@/hooks/useFetch";
import "./style.css"
import { FaUser } from "react-icons/fa";
import { Post } from "@/interface/Post";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import Loading from "@/components/loading/Loading";
import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/app";
import { toast } from "react-toastify";
import { log } from 'console';
import Link from "next/link";

function Posts() {
    const { data: post, error, loading, refetch } = useFetch<Post[]>(`posts`)
    console.log(post, "pppppppppppposts")
    const [text, setText] = useState<string>("")

    async function Create(e: React.FormEvent) {
        e.preventDefault()

        try {
            const response = await axios.post(`${baseUrl}/posts`, { text }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            })
            console.log(response, "aswdefrg")
            if (response.status === 200) {
                toast.success("Post created successfully")
                setText("")
                refetch()
            }

        } catch (err: any) {
            console.log(err)
            toast(err)
        }



    }

    return (
        <div className="posts">
            <div className="posts_item">

                <h1 className="text-5xl font-bold text-cyan-500">Posts</h1>
                <h2 className="flex items-center gap-2 text-2xl font-medium ">
                    <FaUser className='font-bold' /> Welcome to the community
                </h2>
                <div className="grid gap-5">
                    <button className="w-full bg-cyan-500 text-left py-3 text-xl font-bold text-white px-2">Say Something...</button>
                    <form onSubmit={Create} action="">
                        <textarea value={text} onChange={(e) => setText(e.target.value)} className="h-44 w-full border-2 border-neutral-600" name="" id="" placeholder="Create a post"></textarea>


                        <button className="bg-black text-white py-2 px-6">Submit</button>
                    </form>

                    {loading ? <Loading /> : <>



                        <div className="posts_wrapper">
                            {post?.map((post) => (
                                <div className="posts_wrapper_item" key={post._id}>

                                    <div className="flex flex-col  items-center w-44  ">
                                        <img src={post?.avatar} alt="" />
                                        <h2 className="text-cyan-500">{post?.name} </h2>



                                    </div>
                                    <div className="grid gap-4  px-24">
                                        <h2>{post?.text} </h2>

                                        <div className="grid gap-2">
                                            <p className="text-gray-400">{`Posted on  ${new Date(post.date).toLocaleDateString()}`} </p>
                                            <div className="flex gap-3">
                                                <button className="bg-gray-300 text-white py-2 px-6"><AiFillLike className="text-black text-2xl" /></button>
                                                <button className="bg-gray-300 text-white py-2 px-6"><AiFillDislike className="text-black text-2xl" /></button>
                                                <Link href={`/posts/${post._id}`} className="bg-cyan-500 py-2 px-6 text-white">Discussion </Link>
                                            </div>


                                        </div>


                                    </div>

                                </div>

                            ))}

                        </div>





                    </>}



                </div>



            </div>
        </div>
    )
}

export default Posts

