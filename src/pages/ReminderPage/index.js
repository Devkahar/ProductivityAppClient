import { Box, Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import DateTimePicker from '../../components/DateTimePicker';
import Sidebar from '../../components/Sidebar'
import Layout from '../Layout';
// import ApiCalendar from 'react-google-calendar-api';
const ReminderPage = () => {
    const [calendarSrc,setCalendarSrc] = useState('');
    return (
        <Layout>
            <Box className="c-black">
                <Typography variant="h2">Create Action Making Remindes</Typography>
                <Button />
                <DateTimePicker/>
            </Box>
        </Layout>
    )
}
export default ReminderPage;