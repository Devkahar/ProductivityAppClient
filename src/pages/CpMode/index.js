import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import PageWrapper from '../Pagewrapper'
import { useDispatch, useSelector } from 'react-redux'
import { constestDetails } from '../../actions/contestAction'
import TaskItem from '../../components/TaskItem';
import {getDuration} from '../../helper/index.js'
const CpMode = () => {
    const constest = useSelector(state => state.contestList);
    const [contestData, setContentData] = useState([]);
    const [contestLoading, setContestLoading] = useState(true);
    const [contestError, setContestError] = useState('');
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
    console.log("Contest", contestData);
    // setInterval(()=>{
    //     console.log("Dev");
    //     console.log("Hii");
    // }, (60*60*100));
    return (
        <Layout>
            <PageWrapper pageTitle="Track Upcoming Contest">
                <Box>
                    <Box sx={{ mb: 3, p: 1 }}>
                        <Typography className="c-black" variant="h4">Apply Filter</Typography>
                        <Box sx={{ p: 1, mt: 3, height: "500px", width: "100%", overflow: "hidden", overflowY: "scroll", }}>
                            {contestLoading ? <CircularProgress color="secondary" />
                                : contestError ? <Typography variant="p" color="danger">{contestError}</Typography>
                                    : contestData?.map(e => (
                                        <TaskItem key={e.name} name={e.name} bg="#d8cbf7" url={e.url} description={`Contest Duration ${getDuration(e.duration)} Date Timer -${new Date(e.start_time)}` } />
                                    ))
                            }
                        </Box>

                    </Box>

                </Box>
            </PageWrapper>
        </Layout>
    )
}

export default CpMode
