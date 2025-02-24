"use client";
export interface User {
  name: string;
  _id: string;
  avatar: string;
  email: string;
  date: string;
}

export interface Developer {
  _id: number | string;
  bio: string;
  status: string;
  company: string;
  location: string;
  githubusername: string;
  education: [
    {
      _id: string;
      current: boolean;
      school: string;
      degree: string;
      fieldofstudy: string;
      from: string;
      to: string;
      programm: string;
      length: number;
    }
  ];
  experience: [
    {
      company: string;
      title: string;
      current: boolean;
      from: string;
      to: string;
      _id: string;
    }
  ];
  skills: [];
  user: {
    _id: string;
    name: string;
    avatar: string;
  };

  website: string;
  social: {
    youtube: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  date: string;
}

export interface UserId extends Developer {
  date: string;

  skills: [];

  location: string;
}

export interface MeDashboard extends UserId {
  _v: number;
  bio: string;
}
