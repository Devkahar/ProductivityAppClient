import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Todo from './components/Todo';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
function App() {
  return (
    <div className="App">
      <Router>
        {console.log("Date ",Date().split(" "))}
        <Routes>
          <Route exect path="/" element={<Home/>} />
          <Route exect path="/app" element={<Todo/>} />
          <Route exect path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
