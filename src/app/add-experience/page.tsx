
"use client"
import React, { useState } from 'react'
import "./style.css"

import { VscSourceControl } from "react-icons/vsc";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { baseUrl } from '@/utils/app';


function Experience() {
    const [title, setTitle] = useState<string>("")
    const [company, setCompany] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [from, setFrom] = useState<string>("")
    const [to, setTo] = useState<string>("")
    const [job, setJob] = useState<string>("")
    const [current, setCurrent] = useState<boolean>(false)
    const router = useRouter()
    const OnSubmit = async function (e: React.FormEvent) {
        e.preventDefault();
        if (!title || !company || !to || !from) {
            toast.error("Please fill all required fields");
            return null

        }
        let User = {
            title,
            company,

            from,
            to: current ? "Now" : to

        }

        try {
            let response = await axios.put(`${baseUrl}/profile/experience`, { title: User.title, company: User.company, from: User.from, to: User.to }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            })
            console.log(response)
            if (response.request.readyState === 4) {
                toast.success("Jo'natmalaringiz saqlandi")
                router.push("/dashboard")
            }
            else {
                toast.error("Error")

            }

        } catch (err: any) {
            toast.error(err.message)

        }
    }





    return (
        <div className='experience'>
            <div className='experience_item'>

                <h1 className="text-5xl font-bold text-cyan-500">Add An Experience</h1>
                <h2 className="flex items-center gap-2 text-2xl font-medium ">
                    <VscSourceControl className='font-bold' /> Add any developer/programming positions that you have had in the past
                </h2>
                <p>* = required field</p>


                <form onSubmit={OnSubmit} action="">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='* Job Title' />
                    <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder='* Company' />
                    <input value={location} type="text" onChange={(e) => setLocation(e.target.value)} placeholder='* Location' />
                    <div>
                        <label className='font-bold text-xl' htmlFor="">From Date</label>
                        <input value={from} onChange={(e) => setFrom(e.target.value)} required type="date" />
                    </div>




                    <label htmlFor="for" className='flex w-28 gap-2 items-center  '>   <input className='text-in' type="checkbox" id="current" checked={current} onChange={() => setCurrent(!current)} /> <pre>Current Job </pre></label>

                    <div>
                        <label className='font-bold text-xl' htmlFor="for">To Date</label>
                        <input value={to} onChange={(e) => setTo(e.target.value)} disabled={current} type="date" />
                    </div>

                    <textarea value={job} onChange={(e) => setJob(e.target.value)} className='h-32 border-2 border-zinc-400' name="" id="" placeholder='Job Description'></textarea>
                    <div className="flex gap-5">
                        <button className="w-36 h-10 bg-blue-500 text-white" type="submit">
                            Oтправить
                        </button>
                        <button
                            onClick={(e) => {

                                e.preventDefault();
                                router.back()
                            }}
                            className="w-36 h-10 bg-gray-300"
                        >
                            Go Back
                        </button>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default Experience


