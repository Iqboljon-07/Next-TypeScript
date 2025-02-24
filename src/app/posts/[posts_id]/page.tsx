"use client"
import { useParams, useRouter } from "next/navigation"
import "./style.css"
import Loading from './../../../components/loading/Loading';
import useFetch from "@/hooks/useFetch";
import { log } from "console";
import { Post } from "@/interface/Post";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "@/utils/app";
import { TiDelete } from "react-icons/ti";
import useDelete from "@/hooks/useDelete"
import { MdDelete } from "react-icons/md";
import useAuth from "@/hooks/useAuth";



function PostsId() {

    const [text, setText] = useState<string>("")
    // const param = useParams()
    const { posts_id: id } = useParams()
    const { posts_id: post_id } = useParams()
    console.log(id, "idddddddddddddd");

    /////////////////////////////////////////////////////////
    //useauthdan chaqirish

    const { user } = useAuth()
    console.log("user", user)


    const { data: post, loading, refetch } = useFetch<Post>(`posts/${id}`)
    console.log("postid", post);
    const router = useRouter()

    ///comment submit qilish
    async function Comment(e: React.FormEvent) {
        e.preventDefault()

        try {
            const response = await axios.post(`${baseUrl}/posts/comment/${post_id}`, { text }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            })
            console.log(response, "comment")
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
    //delete qilish

    const { deleteUser } = useDelete()

    // async function DeleteComment(comment_id: string) {

    //     const response = await axios(`${baseUrl}/posts/`) ///shu yerda yozish

    // }
    async function DeleteComment(comment_id: string) {

        await deleteUser(`posts/comment/${id}/${comment_id} `)
        refetch()

    }
    if (loading) {
        return <Loading />
    }

    //delete qilish
    async function Delete(id: any) {
        await deleteUser(`posts/${id}`)
        router.back()


    }

    return (
        <>
            <div className='postid_wrapper'>
                <div className='postid_item'>

                    <div><button onClick={() => router.back()} className="bg-slate-300 px-6 py-2">Back To Posts</button></div>
                    {/* /////////////////////////////// */}
                    <div className="postid_item2">
                        <div className="flex flex-col items-center ">
                            {post?.avatar ? <img src={post?.avatar} alt="" /> : "User"}
                            <h1 className="text-xl font-bold text-cyan-500">{post?.name} </h1>


                        </div>

                        <div className="postid_item3">

                            <h1>{post?.text} </h1>
                            <div className="flex flex-col gap-2   ">



                                <span className="text-sm  text-gray-300" >Posted on: {post?.date ? new Date(post.date).toLocaleDateString() : "Date not available"}</span>
                                <div className="flex gap-3">
                                    <button className="bg-gray-300 text-white py-2 px-6"><AiFillLike className="text-black text-2xl" /></button>
                                    <button className="bg-gray-300 text-white py-2 px-6"><AiFillDislike className="text-black text-2xl" /></button>
                                    <Link href={""} className="bg-cyan-500 py-2 px-6 text-white ahref">Discussion </Link>
                                    {user?._id === post?.user && <button onClick={() => Delete(post?._id)} className=" px-5 py-2 bg-slate-300"><MdDelete className="text-red-600 text-2xl" /></button>}

                                </div>
                            </div>

                        </div>

                    </div>
                    {/* /////////////////////////////////////////////// */}
                    <button className="w-full bg-cyan-500 text-left py-3 text-xl text-white font-bold px-4">Leave a Comment</button>
                    <form onSubmit={Comment} action="">
                        <textarea value={text} onChange={(e) => setText(e.target.value)} className="h-44 w-full border-2 border-neutral-600" name="" id="" placeholder="Comment the post"></textarea>


                        <button className="bg-black text-white py-2 px-6">Submit</button>
                    </form>

                    <div className="comment">

                        {post?.comments?.map((comment) => (
                            <div key={comment._id} className="comment_item">
                                <div className="comment_item1">
                                    <img src={comment?.avatar} alt="" />
                                    <h1 className="text-cyan-500 font-bold">{comment?.name} </h1>
                                </div>

                                <div className="grid  items-center content-center  gap-1">
                                    <h2>{post?.text}</h2>
                                    <p className="text-gray-400">{`posted on ${new Date(post?.date).toLocaleTimeString()} `} </p>
                                    {user?._id === comment?.user && <MdDelete onClick={() => DeleteComment(comment._id)} className="text-red-600 text-3xl" />}
                                </div>

                            </div>

                        ))}

                    </div>



                </div>

            </div>


        </>
    )
}

export default PostsId
