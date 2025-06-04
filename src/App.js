import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import EditorPage from './Pages/EditorPage';
import ExecutionPage from './Pages/ExecutionPage';
import RuleBuilder from './Components/RuleBuilder';

function App() {
  return (
    <Router>
          <div className="app">
            <nav>
              <ul>
                <li>
                  <Link to="/">Rule Editor</Link>
                </li>
                <li>
                  <Link to="/execute">Rule Execution</Link>
                </li>
                <li>
                  <Link to="/create">Rule Creation</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<EditorPage />} />
              <Route path="/execute" element={<ExecutionPage />} />
              <Route path="/create" element={<RuleBuilder />} />
            </Routes>
          </div>
     </Router>
  );
}

export default App;
