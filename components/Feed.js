import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handlePostState,
  handleUseSSRPostsState,
} from "../features/post/postSlice";
import Input from "./Input";
import Post from "./Post";

const Feed = ({ posts }) => {
  const [realtimePosts, setRealtimePosts] = useState([]);
  const state = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        "https://linkedin-clone-green.vercel.app/api/posts"
      );

      setRealtimePosts(data);
      dispatch(handlePostState(false));
      dispatch(handleUseSSRPostsState());
    };

    fetchPosts();
  }, [dispatch, state.postState.default]);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/* Posts */}
      {!state.useSSRPostsState.default
        ? realtimePosts.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Feed;
