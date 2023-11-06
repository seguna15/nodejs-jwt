import axios from 'axios';
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {
  const [auth, setAuth] = useState(localStorage.getItem("auth"));
  const navigate = useNavigate();
  const handleLogout = async(e) => {
    e.preventDefault()

    try {
      await axios.post('auth/logout', {}, { withCredentials: true });
      localStorage.removeItem("auth");
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="bg-slate-200">
      <div className=" flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Blog App</h1>
        <ul className="flex flex-col md:flex-row gap-4 align-bottom">
          <li>
            <Link to="/">Home</Link>
          </li>
          <div className="relative">
            <input
              type="search"
              name=""
              id=""
              className="bg-slate-100 rounded-sm pl-2 focus:bg-slate-50 w-[300px] max-w-xs"
              placeholder="search blog"
            />
            <FaSearch
              size={16}
              className="absolute top-1 right-1 text-gray-500"
            />
          </div>
          {auth ? (
            <>
              <li>
                <Link to="/create-blog">Create</Link>
              </li>
              <li>
                <Link to="/admin/blogs">Admin</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header