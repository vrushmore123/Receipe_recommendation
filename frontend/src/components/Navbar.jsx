import React, { useState } from "react";
import { ChefHat, Menu, X, LogIn, UserPlus, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "specialties", label: "Specialties" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className=" w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              RecipeMaster
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-600 hover:text-orange-500 transition-colors px-2"
              >
                {item.label}
              </button>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center text-gray-600 hover:text-orange-500 border border-gray-300 px-4 py-2 rounded-full transition-colors"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Register
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-orange-500"
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <button className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-orange-500">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </button>
                <button className="flex items-center w-full px-3 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
