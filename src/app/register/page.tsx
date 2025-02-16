"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { FaUser } from "react-icons/fa";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const validationSchema = Yup.object({
    name: Yup.string()
        .min(4, "Kamida 4 harf qatnashsin")
        .max(16, "Ko'pi bilan 16ta harf qatnashsin")
        .required("Maydon bo'sh bo'lmasin"),
    email: Yup.string()
        .min(4, "Kamida 4 harf qatnashsin")
        .max(36, "Ko'pi bilan 36ta harf qatnashsin")
        .required("Maydon bo'sh bo'lmasin"),
    password: Yup.string()
        .min(4, "Kamida 4 harf qatnashsin")
        .max(16, "Ko'pi bilan 16ta harf qatnashsin")
        // .matches(/^(?=.*[A-Za-z])/, "Parol kamida bitta Harf qatnashsin")
        .required("Maydon bo'sh bo'lmasin"),
    confirmPassword: Yup.string()
        .min(4, "Kamida 4 harf qatnashsin")
        .max(16, "Ko'pi bilan 16ta harf qatnashsin")
        .required("maydon bo'sh bo'lmasin"),
});

function Register() {


    const OnSubmit = async (values: any) => {
        console.log(values.password);

        if (values.password === values.confirmPassword) {

        } else {
            toast.error("Parollar  to'g'ri emas");
        }
    };

    return (
        <div className="register">
            <div className="register_item">
                <h1 className="text-5xl text-blue-400 font-bold">Sign In</h1>
                <h2 className="flex  items-center text-2xl font-medium gap-2">
                    <FaUser /> Sign Into Your Account
                </h2>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={OnSubmit}
                >
                    {() => (
                        <Form>
                            <div>
                                <label htmlFor="name"></label>
                                <Field type="text" name="name" id="name" placeholder="Name" />
                                <ErrorMessage name="name" component="div" className="error" />
                            </div>
                            <div>
                                <label htmlFor="email"></label>
                                <Field
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Email address"
                                />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                            <div>
                                <label htmlFor="password"></label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="error"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword"></label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="error"
                                />
                            </div>
                            <button type="submit" className="btn">
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className="flex gap-3">
                    <h2>Don't have an account?</h2>
                    <Link href={"/login"} className="text-cyan-500">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
