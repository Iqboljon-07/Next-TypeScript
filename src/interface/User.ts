"use client";
export interface User {
  name: string;
}

export interface Developer {
  _id: number | string;
  bio: string;
  status: string;
  company: string;
  location: string;
  githubusername: string;

  skills: [];
  user: {
    _id: number | string;
    name: string;
    avatar: string;
  };

  website: string;
  social: {};
  date: string;
}

export interface UserId extends Developer {
  date: string;

  skills: [];

  location: string;
}

export interface MeDashboard extends UserId {
  bio: string;
}
