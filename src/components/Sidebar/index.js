import React from 'react'
import {Typography,Box} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    const navItems = [
        {name: 'DashBoard', icon : <DashboardIcon/>,link: '/dashboard'}, 
        {name: 'Reminder',icon: <DateRangeIcon/>, link: '/reminder'},
        {name: 'Report',icon: <SummarizeIcon/>,link: '/report'},
        {name: 'Settings',icon: <SettingsIcon/>, link: '/settings'},
        {name: 'Support',icon: <SupportAgentIcon/>, link: '/support'},
    ];
    // 
    return (
        <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',height: '100vh',padding: '30px', width: '250px', borderRight: '1px solid #eee'}}>
            {/* Top Logo */}
            <div>
                <Typography>Logo</Typography>
            </div>

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
            <Link className="nav-links" to="/login">
                <Box sx={{display: 'flex'}}>
                    <LoginIcon/>
                    <Typography style={{marginLeft: '15px'}}> Log Out</Typography>
                </Box>
            </Link>
            </div>
        </Box>
    )
}

export default Sidebar
