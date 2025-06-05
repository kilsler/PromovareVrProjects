import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewProjectForm from "./pages/NewProjectForm";
import EditProjectForm from "./pages/EditProjectForm";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "20px" }}>Главная</Link>
          <Link to="/new">Новый проект</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewProjectForm />} />
          <Route path="/edit/:projectId" element={<EditProjectForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
