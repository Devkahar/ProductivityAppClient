import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import PageWrapper from '../Pagewrapper'
import { useDispatch, useSelector } from 'react-redux'
import { constestDetails } from '../../actions/contestAction'
import { saveContestData} from '../../actions/todoAction'
import TaskItem from '../../components/TaskItem';
import {getDuration,getDate} from '../../helper/index.js';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import Feedback from '../../components/Feedback';

const CpMode = () => {
    const webSitesName = ["HackerRank","HackerEarth","CodeChef","AtCoder","TopCoder","LeetCode","Kick Start","CodeForces"]
    const [selectItem, setSelectItem] = useState('CodeForces');
    const selectData = [{ value: 'HackerRank' }, { value: 'HackerEarth' }, { value: 'CodeChef' }, { value: 'AtCoder' },{ value: 'TopCoder' },{ value: 'LeetCode' },{value: 'Kick Start',value:'CodeForces'}];
    const constest = useSelector(state => state.contestList);
    const [contestData, setContentData] = useState([]);
    const [contestLoading, setContestLoading] = useState(true);
    const [contestError, setContestError] = useState('');
    const [open,setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity,setServirity] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(constestDetails());
        console.log("contest Data , ",);
    }, [dispatch]);
    useEffect(() =>{
        if (constest) {
            if (constest.loading) {
                setContestLoading(true);
            }
            if (constest.data) {
                setContentData(constest.data);
                setContestLoading(false);
                console.log("contest Data , ",constest.data);
            }
            if (constest.error) {
                setContestError(constest.error);
                setContestLoading(false);
            }
        }
    }, [constest]);

    useEffect(() =>{
        if(constest && constest.data){
            const filterData = constest.data.filter(e => e.site==selectItem);
            setContentData([...filterData]);
        }
    },[constest,selectItem])
    console.table(contestData);
    const addToDoHandler = async (data)=>{
        const date = data.date;
        const contestData = {
            name: data.name,
            priority: 0,
            link: data.url,
            startTime: data.time,
            websiteName: data.site,
            duration: data.duration
        }
        // console.log(data);
        // console.log("Date ", date,"\nData ",contestData);
        const status = await saveContestData(date, contestData);
        if(status == "success"){
            setOpen(true)
            setMessage("Contest Successfully added to todo");
            setServirity("success");
        }else{
            setOpen(true)
            setMessage("Something Went Wrong");
            setServirity("error");
        }

    }
    const getTime = (timeString)=>{
        let time = timeString.split(' ');
        time = time[4];
        return time;
    }
    

    return (
        <Layout>
            <PageWrapper pageTitle="Track Upcoming Contest">
                <Box>
                    <Box sx={{ mb: 3, p: 1 }}>
                        <Box sx={{display: 'flex',justifyContent: 'space-between', alignItems: 'center',}}>
                            <Typography className="c-black" variant="h4">Apply Filter</Typography>
                            <Box>
                                <InputLabel id="demo-simple-select-label">Select Platform</InputLabel>
                                <Select
                                    value={selectItem}
                                    onChange={e => setSelectItem(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    id="demo-simple-select-helper-label"
                                >
                                    {selectData.map(e => (
                                        <MenuItem key={e.value} value={e.value}>{e.value}</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Box>
                        <Box sx={{ p: 1, mt: 3, height: "500px", width: "100%", overflow: "hidden", overflowY: "scroll", }}>
                            {contestLoading ? <CircularProgress color="secondary" />
                                : contestError ? <Typography variant="p" color="danger">{contestError}</Typography>
                                    : contestData?.map(e => (
                                        <>
                                            <TaskItem key={e.name} name={e.name} bg="#d8cbf7" url={e.url} 
                                            description={`Contest Duration ${getDuration(e.duration)} | Start Date - ${getDate(new Date(e.start_time))}` } 
                                            parameter={{date: getDate(new Date(e.start_time)),name: e.name,url:e.url, time: getTime((new Date(e.start_time)).toString()),site: e.site,duration: getDuration(e.duration)}} 
                                            onClickHandler ={addToDoHandler}
                                            />
                                        </>
                                    ))
                            }
                        </Box>

                    </Box>

                </Box>
                <Feedback setOpen={setOpen} open={open} severity={severity} message={message}/>
            </PageWrapper>
        </Layout>
    )
}

export default CpMode