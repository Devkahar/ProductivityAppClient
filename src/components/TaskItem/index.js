import { Box, Typography } from '@mui/material'
import React from 'react'
import Progress from '../Progress';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
const TaskItem = (props) => {
    return (
        <Box key={props.name} className="c-black" sx={{ mt:3, width: '100%', p: 2, display: 'flex', justifyContent: 'space-between', borderRadius: '10px', backgroundColor: props.bg }}>
            <Box sx={{ display: 'flex' }}>
                {props.complete && <Box sx={{ mr: 2 }}>
                    <Progress value={props.complete} />
                </Box>}
                <Box sx={{ display: 'block' }}>
                    {props.url?
                        <a color="inherit" href={props.url} target="_blank" style={{color:'inherit'}}><Typography className="task-font" variant="p">{props.name}</Typography></a>
                        : 
                        <Typography className="task-font" variant="p">{props.name}</Typography>
                    }
                    {/* <Typography className="task-font" variant="p">{props.name}</Typography> */}
                    {props.description && <><br /><Typography className="subtask-font" variant="p">{props.description}</Typography></>}
                </Box>
            </Box>
            <Box>
                {props.button && <Button onClick={props.buttonAction}>{props.button}</Button>}
            </Box>
            {/* <Box sx={{ display: 'flex', flexDirection: 'column'}}> */}
                {/* {props.url?<a color="inherit" href={props.url} target="_blank"><ArrowForwardIosIcon /></a>:<ArrowForwardIosIcon />}  */}
               
            {/* </Box> */}
            <Button onClick={ () => props.onClickHandler(props.parameter)}><AddTaskIcon/></Button>
        </Box>
    )
}

export default TaskItem
