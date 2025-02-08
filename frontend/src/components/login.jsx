import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Popup from '../../model/popup';
import { LoginUser } from '../../utils/api';
import {  useNavigate } from 'react-router-dom';

const LoginUsers = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await LoginUser(userData);
      const { token } = response;
      localStorage.setItem("Token", token);
      setPopupMessage("Login successful!");
      setPopupVisible(true);
    } catch (error) {
      console.error("Login failed:", error);
      setPopupMessage(error.message || "Error during login. Please try again.");
      setPopupVisible(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
            <span className="block text-orange-500 mt-1">to Our Kitchen</span>
          </h1>
          <p className="text-gray-600 text-lg">Sign in to access your recipes</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-orange-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-orange-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-orange-500 hover:text-orange-600">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center group"
            >
              Sign In
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <Popup
          message={popupMessage}
          onClose={() => {
            setPopupVisible(false);
            navigate('/');
          }}
        />
      )}
    </div>
  );
};

export default LoginUsers;