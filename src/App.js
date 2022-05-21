import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ReminderPage from './pages/ReminderPage';
import ProgrammerMode from './pages/ProgrammerMode';
import CpMode from './pages/CpMode';
import Logout from './components/Logout';
import Todo from './pages/Todo';
import GymMode from './pages/GymMode';
import { useEffect } from 'react';
import axios from 'axios';
// import MyTodos from './pages/MyTodos';
function App() {
  useEffect( async()=>{
    try {
        const res = await axios.get('/api/getModel/housePrice');
        if(res){
          const f = res.data;
          console.log(typeof f);
        }
    } catch (error) {
        console.log(error);
    }
  },[]);
  return (
    <div className="App">
      <Router>
        {/* {console.log("Date ",Date().split(" "))} */}
        <Routes>
          <Route exect path="/" element={<Home/>} />
          <Route exect path="/dashboard" element={<Dashboard/>} />
          <Route exect path="/reminder" element={<ReminderPage/>} />
          <Route exect path="/programmerMode" element={<ProgrammerMode/>} />
          <Route exect path="/cpmode" element={<CpMode/>} />
          <Route exect path="/logout" element={<Logout/>} />
          <Route exect path="/todo" element={<Todo/>} />
          <Route exect path="/gymMode" element={<GymMode/>} />
          {/* <Route exect path="/mytodos" element={<MyTodos/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
