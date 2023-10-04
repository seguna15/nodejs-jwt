import axios from 'axios';
import React, { useState } from 'react'
import {FaEye, FaEyeSlash} from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { API_ROUTE } from '../../Server';

const SignUpPage = () => {
    // State variable for our form data;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // state variable to handle show or hide password
    const [visible, setVisible] = useState(false);

    //function to handle form submission
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
             const res = await axios.post(
               `${API_ROUTE}/auth/register`,
               { username, email, password, role: "USER" }
             );
             console.log(res.data);
             setLoading(false);
             setError(false);
             navigate("/signin");
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
       
    }


  return (
    <main className="mt-5">
      <section className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold">Sign Up</h1>
        {error ? <p className='text-red-600 text-center my-5'>Something went wrong</p> : null }
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="font-bold text-gray-600 capitalize"
            >
              username
            </label>
            <input
              type="text"
              className="w-full bg-slate-100 p-3 rounded-lg"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-bold text-gray-600 capitalize"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-slate-100 p-3 rounded-lg"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-bold text-gray-600 capitalize"
            >
              password
            </label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                id="password"
                className="w-full bg-slate-100 p-3 rounded-lg"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute top-3 right-2">
                {visible ? (
                  <FaEye size={25} onClick={(e) => setVisible(!visible)} />
                ) : (
                  <FaEyeSlash size={25} onClick={(e) => setVisible(!visible)} />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit" disabled={loading}
            className="bg-slate-700 text-white p-3 uppercase rounded-md hover:opacity-90 disabled:opacity-80"
          >
            {loading ? "loading..." : "sign up"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>{" "}
          <Link to="/signin">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default SignUpPage;