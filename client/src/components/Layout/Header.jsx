import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-slate-200">
      <div className=" flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Blog App</h1>
        <ul className="flex gap-4 align-bottom">
          <li>
            <Link to="/">Home</Link>
          </li>
          <div className="relative">
            <input
              type="search"
              name=""
              id=""
              className="bg-slate-100 rounded-sm pl-2 focus:bg-slate-50 w-[300px] max-w-xs"
              placeholder='search blog'
            />
            <FaSearch size={16} className='absolute top-1 right-1 text-gray-500'/>
          </div>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header