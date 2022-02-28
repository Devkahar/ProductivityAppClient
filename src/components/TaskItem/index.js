import { Box, Typography } from '@mui/material'
import React from 'react'
import Progress from '../Progress';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
const TaskItem = (props) => {
    return (
        <Box key={props.name} className="c-black" sx={{ mt:3, width: '100%', p: 2, display: 'flex', justifyContent: 'space-between', borderRadius: '10px', backgroundColor: props.bg }}>
            <Box sx={{ display: 'flex' }}>
                {props.complete && <Box sx={{ mr: 2 }}>
                    <Progress value={props.complete} />
                </Box>}
                <Box sx={{ display: 'block' }}>
                    <Typography className="task-font" variant="p">{props.name}</Typography>
                    {props.description && <><br /><Typography className="subtask-font" variant="p">{props.description}</Typography></>}
                </Box>
            </Box>
            {props.url?<a color="inherit" href={props.url} target="_blank"><ArrowForwardIosIcon /></a>:<ArrowForwardIosIcon />} 
        </Box>
    )
}

export default TaskItem
