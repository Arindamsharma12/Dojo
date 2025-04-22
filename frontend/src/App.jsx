import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Problems from "./pages/Problems";
import Contests from "./pages/Contests";
import Leaderboard from "./pages/Leaderboard";
import ProblemView from "./pages/ProblemView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles/main.css";
import "./styles/theme.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Problems />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemView />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;