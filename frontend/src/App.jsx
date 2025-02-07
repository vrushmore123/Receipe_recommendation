import "./App.css";
import Hero from "./components/Homepage";
import LoginUsers from "./components/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/register";
import Homepage from "./components/Homepage";
import RecipeWebsite from "./components/landing";
import Navbar from "./components/Navbar";
import RecipeDetails from "./components/recipeDetails";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<RecipeWebsite />}></Route>
          <Route path="/sample" element={<Homepage />}></Route>
          <Route path="/login" element={<LoginUsers />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
