import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { API_ROUTE } from '../../Server';
import axios from 'axios';

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //withCredential will allow you send back the cookies.
      const res = await axios.post(`${API_ROUTE}/auth/login`,{email,password},{withCredentials: true});
      const data = res.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${data["accessToken"]}`; 
      setLoading(false);
      setError(false);
      navigate("/")
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }


  return (
    <main className="mt-5">
      <section className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold">Sign In</h1>
        {error ? (
          <p className="text-red-600 text-center my-5">Something went wrong</p>
        ) : null}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-bold text-gray-500 capitalize"
            >
              Email
            </label>
            <input
              type="text"
              className="w-full bg-slate-100 p-3 rounded-lg"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-bold text-gray-500 capitalize"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                id="password"
                className="w-full bg-slate-100 p-3 rounded-lg"
                placeholder="Enter password"
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
            type="submit"
            disabled={loading}
            className="bg-slate-700 text-white p-3 uppercase rounded-md hover:opacity-90 disabled:opacity-80"
          >
            {loading ? "loading..." : "sign in"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Do not have an account?</p>
          <Link to="/signup">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default SignInPage