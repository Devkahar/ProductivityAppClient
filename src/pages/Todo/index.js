import Calendar from '../../components/Calendar';
import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../Layout'
import {  Button, TextField } from '@material-ui/core';
const Todo = () => {
    const [selectedDate, handleDateChange] = useState(new Date());
    console.log(selectedDate);
    const listData = {
        'general': {
            name: '',
            priority:'',
        },
        'meetings':{
            name: '',
            Link:'',
            priority:'',
        },
        'programmer':{
            name: '',
            Link:'',
            priority:'',
        },
        'project':{
            name: '',
            Link:'',
            priority:'',
        },
        'student':{
            name: '',
            Link:'',
            priority:'',
        }
    }
    const [todoTypes,setTodoTypes] = useState({
        'general':{
            tasks:[
                {
                    name: 'My  General Task',
                    Link:'',
                    priority:'',
                }
            ],
        },
        'meetings':{
            tasks:[
                {
                    name: 'My meetings',
                    Link:'',
                    priority:'',
                }
            ],
        },
        'programmer':{
            tasks:[
                {
                    name: 'My Programmer Task',
                    Link:'',
                    priority:'',
                }
            ],
        },
        'project':{
            tasks:[
                {
                    name: 'My Project Task',
                    Link:'',
                    priority:'',
                }
            ],
        },
        'student':{
            tasks:[
                {
                    name: 'Chutiya',
                    Link:'',
                    priority:'',
                }
            ],
        },
        
    })
    const parameters = ['general','meetings','programmer','project','student']
    const addMoreTasks = (key) =>{
        todoTypes[key].tasks.push(listData[key]);
    }
    const setMyValues = (e,key,index,subkey)=>{
        const value = e.target.value;
        console.log(key," ",index, " ",subkey," ",value);
        const copyTodoData = {...todoTypes};
        copyTodoData[key].tasks[index][subkey] = value;
        setTodoTypes(copyTodoData);
    }
    return (
        <Layout>
            {/* Page Header Part */}
            <Grid container>
                <Grid item xs={12} sm={6} md={8} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                        <Typography className="c-black" variant="h4">Start planing You're Goals</Typography>
                    </Box>
                    <Box className="c-black" sx={{width: '100%',}}>
                        <Box>
                            <Typography variant="h4">
                                {Date() ==selectedDate?"Create Today's Todo": `Create Todo`}
                            </Typography>
                        </Box>
                        
                        <Box className="c-black" sx={{width: '100%'}}>
                            <Box sx={{width: '100%', height: "70vh" ,overflow: 'scroll'}}>
                                {parameters.map(key => (
                                    <Box sx={{width: '100%',mt:2 ,p:1, border: "1px solid #eee"}}>
                                        <Typography variant="h6">
                                            {key}
                                        </Typography>
                                        {todoTypes[key].tasks.map((e,idx)=>(
                                            <Box key={`${key}-${idx}`} sx={{p:1,}}>
                                                <Typography variant="p">{`Task-${idx+1}`}</Typography>
                                                <TextField fullWidth label="Task Name" value={e.name} onChange={(e) => setMyValues(e,key,idx,'name')}/>
                                                <br/>
                                                <TextField fullWidth label="Task Link" onChange={(e) => setMyValues(e,key,idx,'link')}/>
                                                <br/>
                                                <TextField fullWidth label="Set Priority" onChange={(e) => setMyValues(e,key,idx,'priority')}/>
                                            </Box>
                                        ))}
                                        <Button variant="contained" color="primary">Add More</Button>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{display: 'flex', flexDirection: 'column',alignItems:'center'}}>
                        <Typography className="c-black" variant="h5">Pick Planing Date</Typography>
                        <Calendar  selectedDate={selectedDate} handleDateChange={handleDateChange}/>
                    </Box>
                </Grid>
            </Grid>
            
            
        </Layout>
    )
}

export default Todo