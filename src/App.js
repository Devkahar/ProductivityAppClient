import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Todo from './components/Todo';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import ReminerPage from './pages/ReminerPage';
function App() {
  return (
    <div className="App">
      <Router>
        {console.log("Date ",Date().split(" "))}
        <Routes>
          <Route exect path="/" element={<ReminerPage/>} />
          <Route exect path="/app" element={<Todo/>} />
          <Route exect path="/dashboard" element={<Dashboard/>} />
          <Route exect path="/reminder" element={<ReminerPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
