import React from 'react'
import {Typography,Box} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LoginIcon from '@mui/icons-material/Login';
import CodeIcon from '@mui/icons-material/Code';
import ListIcon from '@mui/icons-material/List';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../../assets/logo.png';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
// import MyTodos from '../../pages/MyTodos';
const Sidebar = () => {
    const navItems = [
        {name: 'DashBoard', icon : <DashboardIcon/>,link: '/dashboard'}, 
        // {name: 'My Todos', icon: <MyTodos/>, link: '/mytodos'},
        {name: 'Reminder',icon: <DateRangeIcon/>, link: '/reminder'},
        // {name: 'Report',icon: <SummarizeIcon/>,link: '/report'},
        {name: 'GymMode',icon: <FitnessCenterIcon/>, link: '/gymMode'},
        // {name: 'Support',icon: <SupportAgentIcon/>, link: '/support'},
        {name: 'Programmer Mode', icon: <CodeIcon/>, link: '/programmerMode'},
        {name: 'Todo Maker', icon: <ListIcon/>, link: '/todo'},
        
        // {name: 'Settings',icon: <SettingsIcon/>, link: '/settings'},
    ];
    return (
        <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',height: '100vh',padding: '30px', width: '300px', borderRight: '1px solid #eee', overflow: 'scroll'}}>
            {/* Top Logo */}
            <Box sx={{height: '60px'}}>
                {/* <Typography>Monk Node</Typography> */}
                {/* <CloseIcon/> */}
                <Link to="/"><img src={Logo} style={{height:'100%',width:'100%',objectFit: 'contain'}} /></Link>
                
            </Box>
            {/* Nav things */}
            <div>
                {navItems.map(e =>
                    <Box key={e.name} sx={{mb: 3}}>
                        <Link className="nav-links" to={e.link}>
                            <Box sx={{display: 'flex'}}>
                            {e.icon}
                            <Typography style={{marginLeft: '15px'}}> {e.name}</Typography>
                            </Box>
                        </Link>
                    </Box>
                )}
            </div>
            {/* Login Signup */}
            <div>
            <Link className="nav-links" to="/logout">
                <Box sx={{display: 'flex'}}>
                    <LoginIcon/>
                    <Typography style={{marginLeft: '15px'}}> Log Out</Typography>
                </Box>
            </Link>
            </div>
        </Box>
    )
}

export default Sidebar;
