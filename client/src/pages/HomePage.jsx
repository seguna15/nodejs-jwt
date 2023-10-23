import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import axios from 'axios';
import PostCard from '../components/PostCard';

const HomePage = () => {
  const [posts, setPosts] =  useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //runs anytime posts changes
 
 
  useEffect(  () =>{
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
     };

     fetchPosts(); 
  },[])


  return (
    <>
        <Header/>
        <main className='flex mt-5 justify-center gap-4'>
          { loading ? <p className="text-purple-600 mt-5">Post is loading...</p> : null }
          { error ? <p className="text-red-600 mt-5">Oh snap! an error occurred while loading posts</p> : null }
          {
            posts && posts.map(post => <PostCard key={post.id} post={post}/>)
          }
 
        </main>
    </>
  )
}

export default HomePage