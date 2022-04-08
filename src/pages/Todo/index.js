import Calendar from '../../components/Calendar';
import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import {  Button, TextField } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import {getToDoData,saveToDoData} from '../../actions/todoAction'
const Todo = () => {
    const dispatch = useDispatch();
    const todoObj = useSelector(state => state.todoData);
    console.log(todoObj);
    const [selectedDate, handleDateChange] = useState(new Date());
    const parameters = ['general','meetings','programmer','project','student']
    const listData = {
        'general': {
            name: '',
            Link: '',
            priority: 0,
        },
        'meetings':{
            name: '',
            Link: '',
            time: '',
            priority: 0,
        },
        'programmer':{
            name: '',
            Link: '',
            priority: 0,
        },
        'project':{
            name: '',
            Link: '',
            priority: 0,
        },
        'student':{
            name: '',
            Link:'',
            priority: 0,
        }
    }
    const [todoData,setTodoData] = useState({
        'general':{
            tasks:[],
            linkRequired: false,
        },
        'meetings':{
            tasks:[],
            linkRequired: true,
        },
        'programmer':{
            tasks:[],
            linkRequired: true,
        },
        'project':{
            tasks:[],
            linkRequired: false,
        },
        'student':{
            tasks:[],
            linkRequired: false,
        },
        
    })
    // console.log(selectedDate);
    useEffect(() => {
        let date = selectedDate.toString().split(' ');
        date = date[2]+'-'+date[1]+'-'+date[3];
        dispatch(getToDoData(date));
        const copyTodoData = {...todoData};
        parameters.map(key =>{
            copyTodoData[key].tasks = [];
        })
        setTodoData(copyTodoData);
    },[selectedDate])
    useEffect(() => {
        const loading = todoObj.loading;
        if(!loading){
            if(!todoObj.error){
                const data = todoObj?.data;
                const copyTodoData = {...todoData};
                data?.map(el =>{
                    copyTodoData[el.todoType].tasks = [...el.tasks];
                })
                setTodoData(copyTodoData);
            }
        }

    },[todoObj]);
    const setMyValues = (value,key,index,subkey)=>{
        if(value == 'NaN') value = 0;
        // console.log(key," ",index, " ",subkey," ",typeof value);
        const copyTodoData = {...todoData};
        copyTodoData[key].tasks[index][subkey] = value;
        copyTodoData[key].tasks.sort(function(a,b){ return (b.priority - a.priority)})
        setTodoData(copyTodoData);
    }
    const addMoreTasks = (key)=>{
        const copyTodoData = {...todoData};
        copyTodoData[key].tasks.push(listData[key]);
        
        setTodoData(copyTodoData);
    }
    const removeTask = (key,idx)=>{
        const copyTodoData = {...todoData};
        copyTodoData[key].tasks.splice(idx,1);
        setTodoData(copyTodoData);
    }
    const onSaveHandler = () => {
        const newData = [];
        let date = selectedDate.toString().split(' ');
        date = date[2]+'-'+date[1]+'-'+date[3];
        parameters.map(key =>{
            if(todoData[key].tasks.length > 0)
                newData.push({todoType: key,tasks: [...todoData[key].tasks]});
            
        })
        dispatch(saveToDoData(newData,date));
        // console.log(newData);
    }
    // console.log(new Date().toUTCString());
    return (
        <Layout>
            {/* Page Header Part */}
            <Grid container>
                <Grid item xs={12} sm={6} md={8} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                        <Typography className="c-black" variant="h4">Start planing You're Goals</Typography>
                    </Box>
                    <Box className="c-black" sx={{width: '100%',}}>
                        <Typography className="c-black" variant="p">{todoObj?.error}</Typography>
                        <Box sx={{display: 'flex',justifyContent: 'space-between'}}>
                            <Typography variant="h4">
                                {Date() ==selectedDate?"Create Today's Todo": `Create Todo`}
                            </Typography>
                            <Button variant="contained" color="secondary" onClick={onSaveHandler}>Save</Button>
                        </Box>
                        
                        <Box className="c-black" sx={{width: '100%'}}>
                            <Box sx={{width: '100%', height: "70vh" ,overflow: 'scroll'}}>
                                {parameters.map(key => (
                                    <Box sx={{width: '100%',mt:2 ,p:1, border: "1px solid #eee"}}>
                                        <Typography variant="h6">
                                            {key}
                                        </Typography>
                                        {todoData[key].tasks.map((e,idx)=>(
                                            <Box key={`${key}-${idx}`} sx={{p:1,}}>
                                                <Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between'}}>
                                                    <Typography variant="p">{`Task-${idx+1}`}</Typography>
                                                    <Button color="secondary" onClick={()=> removeTask(key,idx)}><RemoveCircleOutlineIcon/></Button>
                                                </Box>
                                                <TextField fullWidth label="Task Name" value={e.name} onChange={(e) => setMyValues(e.target.value,key,idx,'name')}/>
                                                <br/>
                                                <TextField fullWidth label="Task Link" value={e.link} onChange={(e) => setMyValues(e.target.value,key,idx,'link')}/>
                                                <br/>
                                                <TextField type="number" fullWidth label="Set Priority" value={e.priority} onChange={(e) => setMyValues(parseInt(e.target.value),key,idx,'priority')}/>
                                            </Box>
                                        ))}
                                        <Button variant="contained" color="primary" onClick={()=> addMoreTasks(key)}>Add Item</Button>
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

export default Todo;