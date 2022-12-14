import React from "react";
import {
  Route,
  Routes,
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom";
import Home from "./pages/Home";
import SubmitArticle from "./pages/Submit-Article";
import SearchArticle from "./pages/Search-Article";
import ModeratorLogin from "./pages/Moderator-Login";
import AnalystLogin from "./pages/Analyst-Login";
import Moderator from "./pages/Moderator";
import Analyst from "./pages/Analyst";
import NotFoundPage from "./pages/404";
import LogOut from "./pages/LogOut";
import { isAnalyst, isModerator, getCookie } from "./Cookie";

const LoggedInRouter = (
  <Router>
    <div>
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
      <ul className="header">
        <li class="logged-in"><NavLink end to="/logout">Logout</NavLink></li>
      </ul>
      <div className="content">

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/SubmitArticle" element={<SubmitArticle />} />
          <Route path="/SearchArticle" element={<SearchArticle />} />
          <Route path="/Moderator-Login" element={<ModeratorLogin />} />
          <Route path="/Moderator" element={<Moderator />} />
          <Route path="Analyst-Login" element={<AnalystLogin />} />
          <Route path="/Analyst" element={<Analyst />} />
          <Route path="/LogOut" element={<LogOut />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  </Router>
);

const NotLoggedInRouter = (
  <Router>
    <div>
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
      <ul className="header">
        <li class="not-logged-in"><NavLink end to="/">Home</NavLink></li>
        <li class="not-logged-in"><NavLink to="/SubmitArticle">Submit an Article</NavLink></li>
        <li class="not-logged-in"><NavLink to="/SearchArticle">Search Articles</NavLink></li>
        <li class="not-logged-in"><NavLink to="/Moderator-Login">Moderator</NavLink></li>
        <li class="not-logged-in"><NavLink to="/Analyst-Login">Analyst</NavLink></li>
      </ul>
      <div className="content">

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/SubmitArticle" element={<SubmitArticle />} />
          <Route path="/SearchArticle" element={<SearchArticle />} />
          <Route path="/Moderator-Login" element={<ModeratorLogin />} />
          <Route path="/Moderator" element={<Moderator />} />
          <Route path="Analyst-Login" element={<AnalystLogin />} />
          <Route path="/Analyst" element={<Analyst />} />
          <Route path="/LogOut" element={<LogOut />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  </Router>
);

const App = () => {
  return (isAnalyst() || isModerator()) ? LoggedInRouter : NotLoggedInRouter;
}

export default App;