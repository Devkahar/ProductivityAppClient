import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ReminerPage from './pages/ReminerPage';
import ProgrammerMode from './pages/ProgrammerMode';
import CpMode from './pages/CpMode';
import Logout from './components/Logout';
import Todo from './pages/Todo';
function App() {
  return (
    <div className="App">
      <Router>
        {/* {console.log("Date ",Date().split(" "))} */}
        <Routes>
          <Route exect path="/" element={<Home/>} />
          <Route exect path="/dashboard" element={<Dashboard/>} />
          <Route exect path="/reminder" element={<ReminerPage/>} />
          <Route exect path="/programmerMode" element={<ProgrammerMode/>} />
          <Route exect path="/cpmode" element={<CpMode/>} />
          <Route exect path="/logout" element={<Logout/>} />
          <Route exect path="/todo" element={<Todo/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
