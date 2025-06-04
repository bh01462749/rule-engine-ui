import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import EditorPage from './Pages/EditorPage';
import ExecutionPage from './Pages/ExecutionPage';
import RuleBuilder from './Components/RuleBuilder';
import DataDictionary from './Pages/DataDictionary';

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
                <li>
                  <Link to="/data-dictionary">Data Dictionary</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<EditorPage />} />
              <Route path="/execute" element={<ExecutionPage />} />
              <Route path="/create" element={<RuleBuilder />} />
              <Route path="/data-dictionary" element={<DataDictionary />} />
            </Routes>
          </div>
     </Router>
  );
}

export default App;
