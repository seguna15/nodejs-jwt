import React, { useEffect, useState } from 'react'
import  { STATUS } from '../Status';
import axios from "axios";
import moment from "moment";


const BlogContent = ({id}) => {

    const [blog, setBlog] = useState({})
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(STATUS.IDLE);
    
    useEffect(() => {
      const fetchData = async () => {
        setStatus(STATUS.LOADING)
        try {
          const res = await axios.get(`/blogs/${id}, {withCredentials: true}`);
          setBlog(res.data);
          setStatus(STATUS.SUCCESSFUL)
        } catch (error) {
          setError(error.response.data.message || error.message);
          setStatus(STATUS.ERROR);
        }
      };

      fetchData();
    }, []);

    const statusObj = {
      isLoading: status === STATUS.LOADING,
      isSuccessful: status === STATUS.SUCCESSFUL,
      isError: status === STATUS.ERROR,
    }


  return (
    <>
      {statusObj.isLoading && blog && (
        <p className="text-gray-600 font-bold">
          Kindly wait while post is loading...
        </p>
      )}
      {statusObj.isError && (
        <p className="text-red-800 font-bold">{error}...</p>
      )}

      {statusObj.isSuccessful && (
        <>
          <header className="mb-4 lg:mb-6 not-format">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl ">
              {blog.title}
            </h1>
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 "
                  >
                    {blog.author.username}
                  </a>

                  <p className="text-base text-gray-500 ">
                    <time dateTime="2022-02-08" title="February 8th, 2022">
                      {moment(blog.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </time>
                  </p>
                </div>
              </div>
            </address>
          </header>
          <section>
            <p className="lead">{blog.body}</p>
          </section>
        </>
      )}
    </>
  );
}

export default BlogContent