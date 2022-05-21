import { Button, Grid, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download';
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
} from 'chart.js';
import Layout from '../Layout';
import "./style.css"
import TaskItem from '../../components/TaskItem';
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
    const [selectItem, setSelectItem] = useState('This Week');
    const selectData = [{ value: 'This Week' }, { value: 'Today' }, { value: 'This Month' }, { value: 'Year' }];
    const reportData = [{ name: 'Total Task', value: 42, }, { name: 'bar' }, { name: 'Completed', value: 27, }, { name: 'bar' }, { name: 'In Progress', value: 5, }, { name: 'bar' }, { name: 'Reschedule', value: 10, }]
    const taskData = [{ name: 'All Task', bg: '#ced2e4' }, { name: 'Dynamic Programming', complete: 20, bg: '#d8cbf7' }, { name: 'Minor Project', description: 'Client-Side', complete: 40, bg: '#f3f37b' }, { name: 'Fitness', description: 'chess-press', complete: 90, bg: '#bedce4' }];
    // const labels = Utils.months({count: 7});
    const data = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            label: 'Weekly Analysis Of Performance',
            data: [65, 59, 80, 81, 56, 55, 71],
            fill: false,
            borderColor: '#d8cbf7',
            tension: 0.1
        }]
    };
    const parameters = ['general','meetings','programmer','project','student'];
    
    return (
        <Layout>
            {/* Page Header Part */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                <Typography className="c-black" variant="h4">Dashboard</Typography>
                <Box>
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
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography className="c-black" variant="h6">Daily Report</Typography>
                <Button style={{ color: '#000', textTransform: 'capitalize' }} className="btn-feel" variant="text">
                    <DownloadIcon />
                    Download Report
                </Button>
            </Box>

            {/* Page Report-content Part */}
            <Box className={'reduce-font-size'} sx={{ mt: 5, mb: 5, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', borderRadius: '10px', border: '1px solid #eee', padding: "10px" }}>
                {/* content */}
                {reportData.map((e, idx) => (
                    e.name === 'bar' ? <div className="v-line" key={e.name}></div> : (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                <Grid item xs={12} md={5} sm={12}>
                    {taskData.map(e => (
                        <TaskItem key={e.name} name={e.name} bg={e.bg} complete={e.complete} description={e.description} />
                    ))}
                </Grid>
                <Grid item xs={12} md={7} sm={12}>
                    {/* Analysis Data */}
                    <Box>
                        <Typography className="c-black" variant="h6">Analysis</Typography>
                        <Line data={data} />
                    </Box>
                </Grid>
            </Grid>
            {/* Calander Displays */}
            {/* <Box sx={{padding: "30px"}}>
                    <Userprofile/>
                    <Calendar />
                    <Timetracker/>
                </Box> */}
        </Layout>

    )
}

export default Dashboard;
