import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { modalOpen } from "../features/modal/modalSlice";
import { handlePostState } from "../features/post/postSlice";

const Form = () => {
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const uploadPost = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "https://linkedin-clone-green.vercel.app/api/posts",
      {
        input: input,
        photoUrl: photoUrl,
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAt: new Date().toString(),
      }
    );

    dispatch(handlePostState(true));

    dispatch(modalOpen());
  };

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75">
      <textarea
        rows="4"
        placeholder="What do you want to talk about?"
        className="bg-transparent focus:outline-none dark:placeholder-white/75"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a photo URL (optional)"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />

      <button
        className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-white/75 disabled:bg-black/40 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
        disabled={!input.trim() && !photoUrl.trim()}
        type="submit"
        onClick={uploadPost}
      >
        Post
      </button>
    </form>
  );
};

export default Form;
