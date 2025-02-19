
"use client"
import React, { useEffect, useRef } from 'react'
import "./style.css"

import { VscSourceControl } from "react-icons/vsc";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/utils/app';
import { toast } from 'react-toastify';


function Education() {
    // const [school, setSchool] = useState<string>()
    // const [degree, setDegree] = useState<string>()
    // const [fieldofstudy, setFieldOfstudy] = useState<string>()
    // const [from, setFrom] = useState<string>()
    // const [to, setTo] = useState<string>()
    // const [certificate, setCertificate] = useState<string>()
    //useRef<HTMLButtonElement>(null)
    const school = useRef<HTMLInputElement | null>(null)
    const degree = useRef<HTMLInputElement | null>(null)
    const fieldofstudy = useRef<HTMLInputElement | null>(null)
    const from = useRef<HTMLInputElement | null>(null)
    const [to, setTo] = useState<string>("")

    const programm = useRef<HTMLTextAreaElement | null>(null)
    const [current, setCurrent] = useState<boolean>(false)  // Checkbox uchun

    const router = useRouter()
    useEffect(() => {
        if (current) setTo("Now");
    }, [current]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const user = {
            school: school.current?.value || "",
            degree: degree.current?.value || "",
            fieldofstudy: fieldofstudy.current?.value || "",
            from: from.current?.value || "",

            to: current ? "Now" : to, //checkbox

            programm: programm.current?.value || "",
        };
        if (!user.school || !user.degree || !user.fieldofstudy || !user.from) {
            toast.error("Please fill all required fields");
            return
        }

        try {
            const response = await axios.put(`${baseUrl}/profile/education`, { school: user.school, degree: user.degree, fieldofstudy: user.fieldofstudy, from: user.from, to: user.to }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            })

            console.log(response);
            if (response.status === 200 || response.status === 201) {
                toast.success("Ma'Lumotingiz qo'shildi")
                router.push('/dashboard')
            }


        } catch (err) {
            console.error(err)
            toast.error("Ma'lumot qo'shishda xatolik")
        }
    }

    return (
        <div className='experience'>
            <div className='experience_item'>

                <h1 className="text-5xl font-bold text-cyan-500">Add Your Education</h1>
                <h2 className="flex items-center gap-2 text-2xl font-medium ">
                    <VscSourceControl className='font-bold' /> Add any school or bootcamp that you have attended
                </h2>
                <p>* = required field</p>


                <form onSubmit={onSubmit} action="">
                    <input ref={school} type="text" placeholder='* School or Bootcamp' />
                    <input ref={degree} type="text" placeholder='* Degree or Certificate' />
                    <input ref={fieldofstudy} type="text" placeholder='* Field of Study' />
                    <div>
                        <label className='font-bold text-xl' htmlFor="">From Date</label>
                        <input ref={from} type="date" required />
                    </div>




                    <label htmlFor="" className='flex w-36 items-center  '>
                        <input type="checkbox" id="current" checked={current} onChange={() => setCurrent(!current)} /> <pre>Current Job </pre></label>

                    <div>
                        <label className='font-bold text-xl' htmlFor="for">To Date</label>
                        <input value={to} onChange={(e) => setTo(e.target.value)} type="date" disabled={current} />
                    </div>

                    <textarea ref={programm} className='h-32 border-2 border-zinc-400' name="" id="" placeholder='Programm Description'></textarea>
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

export default Education


