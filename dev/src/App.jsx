import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ColoringGame from "./pages/coloring-game"; // Adjust path to where your game file is located
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/login' Component={Login}></Route>
        <Route path='/register' Component={Register}></Route>
        <Route path='/coloring-game' Component={ColoringGame}></Route>
        <Route path='/analytics-dashboard' Component={AnalyticsDashboard}></Route>
      </Routes>
    </>
  );
}

export default App;
