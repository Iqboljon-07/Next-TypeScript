export type Post = {
  avatar: string;
  comments: [
    {
      avatar: string;
      name: string;
      _id: string;
      text: string;
      user: string;
      date: string;
    }
  ];
  date: string;
  likes: [];
  name: string;
  text: string;
  user: string;
  _v: number;
  _id: string;
};
