import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import userImg from '../../assets/user.jpeg';
import NotificationsIcon from '@mui/icons-material/Notifications';
const Userprofile = () => {
    
    return (
        <Box sx={{width: "250px",display: 'flex',mb: 3,alignItems: 'center',justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Avatar alt="Dev Kahar" src={userImg} />
                <Box sx={{ml: 2, display: 'flex', flexDirection: 'column'}}>
                    <Typography className="c-black task-font" variant="h6">Dev Kahar</Typography>
                    <Typography variant="p" style={{fontSize:"12px", marginTop: "-5px"}}>Full Stack Developer</Typography>
                </Box>
            </Box>
            <NotificationsIcon style={{color: '#9b90b9'}}/>
        </Box>
    )
}

export default Userprofile
