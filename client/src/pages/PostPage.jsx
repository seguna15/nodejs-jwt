import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import { useParams } from 'react-router-dom';
import BlogContent from '../components/BlogContent';
import { STATUS } from '../Status';
import axios from 'axios';
import { toast } from 'react-toastify';


const PostPage = () => {
  const { id } = useParams();
  const [commentBody, setCommentBody] = useState('');
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/blog/${id}`, {withCredentials: true});
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchComments();
  },[])


  const handleCreateComment = async (e) => {
    e.preventDefault();
    setStatus(STATUS.LOADING);
    try {
      const res = await axios.post(`/comments/blog/${id}`, {commentBody}, {withCredentials: true});
      setStatus(STATUS.SUCCESSFUL);
      toast.success("Comment added successfully", {
        position: "top-center",
      });
    } catch (error) {
      setStatus(STATUS.ERROR)
      setError(error.response);
    }
  }

  return (
    <>
      <Header />

      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white  antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
            <BlogContent id={id} />

            <section className="not-format mt-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
                  Discussion ({comments.length})
                </h2>
              </div>
              <form className="mb-6" onSubmit={handleCreateComment}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0"
                    placeholder="Write a comment..."
                    required
                    onChange={(e) => setCommentBody(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-bold text-center text-white bg-gray-900 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-gray-700"
                >
                  Post comment
                </button>
              </form>
              {comments.map((comment) => (
                <article
                  className="p-6 mb-6 text-base bg-white rounded-lg"
                  key={comment.id}
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 ">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough"
                        />
                        {comment.user.username}
                      </p>
                      <p className="text-sm text-gray-600 ">
                        <time dateTime="2022-02-08" title="February 8th, 2022">
                          Feb. 8, 2022
                        </time>
                      </p>
                    </div>
                    <button
                      id="dropdownComment1Button"
                      data-dropdown-toggle="dropdownComment1"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
                      type="button"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                      >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                      <span className="sr-only">Comment settings</span>
                    </button>

                    <div
                      id="dropdownComment1"
                      className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow "
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 "
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 "
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 "
                          >
                            Remove
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 "
                          >
                            Report
                          </a>
                        </li>
                      </ul>
                    </div>
                  </footer>
                  <p>
                    {comment.body}
                  </p>
                  
                </article>
              ))}
            </section>
          </article>
        </div>
      </main>
    </>
  );
}

export default PostPage