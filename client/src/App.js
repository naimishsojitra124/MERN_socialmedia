import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register, Login } from "./pages/index";
import PageRender from "./PageRender";
function App() {
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Routes>
            <Route path="/:page" element={<PageRender />} />
            <Route path="/:page/:id" element={<PageRender />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
