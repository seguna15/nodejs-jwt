import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import axios from "axios";
import PostCard from "../../components/PostCard";
import { STATUS } from "../../Status";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(STATUS.IDLE);
  const [deleteError, setDeleteError] = useState(null);
  //runs anytime posts changes

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const res = await axios.get("/blogs");
        setPosts(res.data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }

    fetchPosts();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault
    setDeleteStatus(STATUS.LOADING)
    try {
        const response = await axios.delete(`/blogs/${id}`);
        setDeleteStatus(STATUS.SUCCESSFUL);
        const newPost = posts.filter((post) => post.id !== id);
        console.log(newPost);
        setPosts(newPost); 
    } catch (error) {
        console.log(error);
        setDeleteError(error.response);
        setDeleteStatus(STATUS.ERROR);
    } 
  }

  return (
    <>
      <Header />
      <main className="flex flex-col md:flex-row mt-5 justify-center gap-4">
        {loading ? (
          <p className="text-purple-600 mt-5">Post is loading...</p>
        ) : null}
        {error ? (
          <p className="text-red-600 mt-5">
            Oh snap! an error occurred while loading posts
          </p>
        ) : null}
        {posts && posts.map((post) => <PostCard key={post.id}  post={post} isAdmin={true} handleDelete={handleDelete} />)}
      </main>
    </>
  );
};

export default BlogList;
