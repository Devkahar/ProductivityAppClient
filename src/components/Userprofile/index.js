import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import userImg from '../../assets/user.jpeg';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useSelector} from 'react-redux';
const Userprofile = () => {
    const user = useSelector(state => state.userData);
    return (
        <Box sx={{padding:"5px",width: "200px",display: 'flex',mb: 3,alignItems: 'center',justifyContent: 'space-between',border: "1px solid #eee", borderRadius: "5px",cursor: "pointer"}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Avatar alt={user?.name} src={user.imageUrl} />
                <Box sx={{ml: 2, display: 'flex', flexDirection: 'column'}}>
                    <Typography className="c-black task-font" variant="h6">{user?.name}</Typography>
                    {/* <Typography variant="p" style={{fontSize:"12px", marginTop: "-5px"}}>Full Stack Developer</Typography> */}
                </Box>
            </Box>
            {/* <NotificationsIcon style={{color: '#9b90b9'}}/> */}
        </Box>
    )
}

export default Userprofile
