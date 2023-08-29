import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
        username,
      });
      if (response.status === 200) {
        alert("Registration Completed You Can Login Now");
        setRedirect(true);
      } else if (response.status === 400) {
        alert("Registration Failed Due To Existing User");
      }
    } catch (error) {
      alert("Registration Failed Please Try Again");
    }
  }
  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form onSubmit={registerUser} className="text-center max-w-md mx-auto">
          <div className="gap-2 flex items-center justify-center">
            <div className="w-screen">
              <label>Full Name</label>
              <input
                type="text"
                className="w-auto md:w-52 sm:w-24  text-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
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
              <label>Email</label>
              <input
                type="text"
                className="w-auto md:w-52 sm:w-24 text-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
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
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-600">
            Already have an account?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login Now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
