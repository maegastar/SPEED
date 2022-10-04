import React from "react";
import {
  Route,
  Routes,
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom";
import Home from "./pages/Home";
import SEPractice from "./pages/SE-Practice";
import SubmitArticle from "./pages/Submit-Article";
import SearchArticle from "./pages/Search-Article";
import ModeratorLogin from "./pages/Moderator-Login";
import AnalystLogin from "./pages/Analyst-Login";
import NotFoundPage from "./pages/404";

const App = () => {
  return (
    <Router>
      <div>

        <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
        <ul className="header">
          <li><NavLink end to="/">Home</NavLink></li>
          <li><NavLink to="/SEPractice">Select the Practice</NavLink></li>
          <li><NavLink to="/SubmitArticle">Submit an Article</NavLink></li>
          <li><NavLink to="/SearchArticle">Search Articles</NavLink></li>
          <li><NavLink to="/Moderator-Login">Moderator</NavLink></li>
          <li><NavLink to="/Analyst-Login">Analyst</NavLink></li>
        </ul>
        <div className="content">

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/SEPractice" element={<SEPractice />} />
            <Route path="/SubmitArticle" element={<SubmitArticle />} />
            <Route path="/SearchArticle" element={<SearchArticle />} />
            <Route path="/Moderator-Login" element={<ModeratorLogin />} />
            <Route path="Analyst-Login" element={<AnalystLogin />} />
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;