
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AddRecipe from './components/AddRecipe';

function App() {
  return (
    <Router>
    <div className="App w-full h-full absolute bg-gradient-to-r from-teal-500 to-red-100">
      <Header/>
      <Routes>
        <Route path="/AddRecipe" element={<AddRecipe />} />
        </Routes>
      <div className='bg-indigo-600 w-full'>

      </div>
    </div>
    </Router>
  );
}

export default App;
