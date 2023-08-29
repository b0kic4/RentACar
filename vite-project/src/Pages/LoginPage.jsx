import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useContext } from "react";
export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/login", { username, password });
      const userInfo = response.data;
      setUser(userInfo);
      localStorage.setItem("token", userInfo.token); // Store token in local storage
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      alert("Login Failed");
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="text-center max-w-md mx-auto" onSubmit={loginUser}>
          <div className="gap-2 flex justify-center items-center">
            <div className="w-screen">
              <label>username</label>
              <input
                type="text"
                className="w-auto md:w-52 sm:w-24 text-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
              />
            </div>
            <div className="w-screen">
              <label>Password</label>
              <input
                type="password"
                className="w-auto md:w-52 sm:w-24 text-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter your password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
          </div>
          <div className="pt-4">
            <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
              Login
            </button>
          </div>
          <div className="text-center py-2 text-gray-600">
            Don't have an account yet?{" "}
            <Link
              className="underline text-black hover:text-red-600"
              to={"/register"}
            >
              Register Now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
