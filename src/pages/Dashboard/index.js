import { Button, Grid, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import DownloadIcon from '@mui/icons-material/Download';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Progress from '../../components/Progress';
import { Line } from 'react-chartjs-2';
import Calendar from '../../components/Calendar';
import Userprofile from '../../components/Userprofile';
import Timetracker from '../../components/Timetracker';
import Programmer from '../../assets/programmer.svg'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
/* light Bluilsh Shade #ced2e4 
    purple Shade #d8cbf7
    yellow shade #f3f37b
    offBlue shade #bedce4
*/
const Dashboard = () => {
    const [selectItem,setSelectItem] = useState('This Week');
    const selectData = [{value: 'This Week'},{value: 'Today'},{value: 'This Month'},{value: 'Year'}];
    const reportData =[{name: 'Total Task',value: 42,},{name: 'bar'},{name: 'Completed',value: 27,},{name: 'bar'},{name: 'In Progress',value: 5,},{name: 'bar'},{name: 'Reschedule',value: 10,}]
    const taskData = [{name: 'All Task', bg: '#ced2e4'},{name: 'Dynamic Programming', complelte: 20,bg: '#d8cbf7'},{name: 'Minor Project',subname: 'Client-Side', complelte: 40,bg: '#f3f37b'}, {name: 'Fitness',subname: 'chess-press', complelte: 90,bg: '#bedce4'}];
    // const labels = Utils.months({count: 7});
    const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [{
        label: 'Weekly Analysis Of Performance',
        data: [65, 59, 80, 81, 56, 55, 71  ],
        fill: false,
        borderColor: '#d8cbf7',
        tension: 0.1
    }]
    };
    return (
        <>
            <Box sx={{display: 'flex'}}>
                <Sidebar/>
                <Box sx={{padding: "30px 30px 30px 50px", width: "70%", borderRight: '1px solid #eee'}}>
                    {/* Page Header Part */}
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',mb: 5}}>
                        <Typography className="c-black" variant="h4">Dashboard</Typography>
                        <div>
                            <Select
                                value={selectItem}
                                onChange={e => setSelectItem(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                >
                                {selectData.map(e =>(
                                    <MenuItem key={e.value} value={e.value}>{e.value}</MenuItem>
                                ))}
                            </Select>
                        </div>
                    </Box>
                    {/* Display User And its info */}
                    {/* <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
                        <Box>
                            Welcome, Dev Kahar
                        </Box>
                        <Box sx={{width:"300px",height: "80px"}}>
                            <img style={{width:"100%",height:"100"}} src={Programmer}/>
                        </Box>
                    </Box> */}
                    {/* Page Report Part */}
                    <Box sx={{mt: 5,display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography className="c-black" variant="h6">Daily Report</Typography>
                        <Button style={{ color: '#000', textTransform: 'capitalize'}}className="btn-feel" variant="text">
                            <DownloadIcon/>
                            Download Report
                        </Button>
                    </Box>

                    {/* Page Report-content Part */}
                    <Box sx={{mt: 5,mb:5,display: 'flex',justifyContent: 'space-evenly', alignItems: 'center',borderRadius: '10px', border: '1px solid #eee', padding: "10px"}}>
                        {/* content */}
                        {reportData.map((e,idx)=>(
                            e.name ==='bar'? <div className="v-line" key={e.name}></div> : (<Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: ''}}>
                            <Typography key={e.name} className="c-black" variant="h4">
                                {e.value}
                            </Typography>
                            <Typography variant="p">
                                {e.name}
                            </Typography>
                        </Box>)
                        ))}
                    </Box>

                    {/* Analysis */}

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {taskData.map(e=>(
                                <Box key={e.name} className="c-black" sx={{mb:3,width: '240px',p:2,display: 'flex',justifyContent: 'space-between', borderRadius:'10px',backgroundColor: e.bg}}>
                                    <Box sx={{display: 'flex'}}>
                                        {e.complelte && <Box sx={{mr: 2}}>
                                            <Progress value={e.complelte}/>
                                        </Box>}
                                        <Box sx={{display: 'block'}}> 
                                            <Typography className="task-font" variant="p">{e.name}</Typography>
                                            {e.subname &&<><br/><Typography className="subtask-font" variant="p">{e.subname}</Typography></> }
                                        </Box>
                                    </Box>
                                    <ArrowForwardIosIcon/>
                                </Box>
                            ))}
                        </Grid>
                        <Grid item xs={8}>
                            {/* Analysis Data */}
                            <Typography className="c-black" variant="h6">Analysis</Typography>
                            <Line data={data} />
                        </Grid>
                    </Grid>
                </Box>
                {/* Calander Displays */}
                <Box sx={{padding: "30px", width: "30%"}}>
                    <Userprofile/>
                    <Calendar />
                    <Timetracker/>
                </Box>
            </Box>
            
        </>
        
    )
}

export default Dashboard
