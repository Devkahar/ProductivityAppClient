import Calendar from '../../components/Calendar';
import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../Layout'
const Todo = () => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const todoTypes ={
        'general':{
            // Array of task items.
            tasks:[
                {
                    name: '',
                    priority:'',
                }
            ],
        },
        'meetings':{
            
        },
        'programmer':{

        },
        'project':{

        },
        'student':{

        },
        
    }
    return (
        <Layout>
            {/* Page Header Part */}
            <Grid container>
                <Grid item xs={12} sm={6} md={8} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                        <Typography className="c-black" variant="h4">Start planing You're Goals</Typography>
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