import React, { useState, useEffect } from "react";
import { ChefHat, Heart, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';


const RecipeWebsite = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const foodQuotes = [
    "Cooking is like love. It should be entered into with abandon or not at all.",
    "People who love to eat are always the best people.",
    "The only real stumbling block is fear of failure. In cooking you've got to have a what-the-hell attitude.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % foodQuotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1974&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4 z-10">
          <div className="animate-fade-in-down">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Discover the Art of
              <span className="block text-orange-400 mt-2">
                Delicious Cooking
              </span>
            </h1>
            <div className="text-xl md:text-2xl text-white italic mb-12 transition-opacity duration-500">
              "{foodQuotes[currentQuote]}"
            </div>
            <Link to="/home">
              <button className="absolute bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center">
                Explore Recipes
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
      {/* About Section */}
      <section className="py-24 px-4" id="about">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-orange-500">About</span> Us
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                We are passionate about bringing the joy of cooking to your
                kitchen. Our carefully curated recipes combine traditional
                flavors with modern techniques.
              </p>
              <div className="bg-orange-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To inspire and empower home cooks with delicious, reliable
                  recipes and cooking knowledge that brings people together
                  around the table.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1770&auto=format&fit=crop"
                alt="Cooking in kitchen"
                className="rounded-2xl shadow-2xl object-cover h-[400px] w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-2xl">
                <p className="text-2xl font-bold">10+ Years</p>
                <p>of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="bg-gray-100 py-24 px-4" id="specialties">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-orange-500">Our</span> Specialties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <ChefHat className="w-16 h-16 text-orange-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Gourmet Recipes</h3>
              <p className="text-gray-600">
                Expert-crafted recipes for the adventurous cook who wants to
                explore new flavors.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Clock className="w-16 h-16 text-orange-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Quick & Easy</h3>
              <p className="text-gray-600">
                Delicious 30-minute meals perfect for busy weeknights and simple
                cooking.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Heart className="w-16 h-16 text-orange-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Healthy Living</h3>
              <p className="text-gray-600">
                Nutritious and delicious recipes that promote a balanced
                lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4" id="contact">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-orange-500">Contact</span> Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8 bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-gray-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-gray-700">hello@recipesite.com</span>
              </div>
            </div>
            <form className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl transition-colors duration-300 font-semibold">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeWebsite;
