"use client"
import { useParams, useRouter } from "next/navigation"
import "./style.css"
import Loading from './../../../components/loading/Loading';
import useFetch from "@/hooks/useFetch";
import { log } from "console";
import { Post } from "@/interface/Post";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import Link from "next/link";
function PostsId() {
    // const param = useParams()
    const { posts_id: id } = useParams()
    console.log(id);

    const { data: post, loading } = useFetch<Post>(`posts/${id}`)
    const router = useRouter()
    if (loading) {
        return <Loading />
    }

    return (
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
                                <Link href={""} className="bg-cyan-500 py-2 px-6 text-white">Discussion </Link>
                            </div>
                        </div>

                    </div>

                </div>
                {/* /////////////////////////////////////////////// */}
                <button className="w-full bg-cyan-500 text-left py-3 text-xl text-white font-bold">Leave a Comment</button>

            </div>
        </div>
    )
}

export default PostsId
