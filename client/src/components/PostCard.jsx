import React from 'react'
import { Link } from 'react-router-dom';

const PostCard = ({post, isAdmin, handleDelete}) => {
  
  return (
    <div className="w-full md:w-[300px] p-6 bg-white border border-gray-200 rounded-lg shadow">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {post.title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700">
        {post.body.length > 100 ? `${post.body.slice(0, 100)}...` : post.body}
      </p>
      {isAdmin ? (
        <div className="flex justify-between items-center">
          <Link
            to={`/edit/${post.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Edit
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
            onClick={(e) => handleDelete(e, post.id)}
          >
            Delete
          </button>
        </div>
      ) : (
        <Link
          to={`/post/${post.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Read more
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}

export default PostCard