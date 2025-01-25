import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import DeleteRecipe from "./components/DeleteRecipe";
import ListRecipes from "./components/ListRecipes";
import OnlineRecipes from "./components/OnlineRecepies";

function App() {
  return (
    <Router>
      <div className="App w-full h-full absolute bg-gradient-to-r from-teal-500 to-red-100">
        {/* Header Component */}
        <Header />

        {/* Routes for different components */}
        <div className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={<ListRecipes />} />
            <Route path="/AddRecipe" element={<AddRecipe />} />
            <Route path="/EditRecipe" element={<EditRecipe />} />
            <Route path="/DeleteRecipe" element={<DeleteRecipe />} />
            <Route path="/OnlineRecipes" element={<OnlineRecipes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
