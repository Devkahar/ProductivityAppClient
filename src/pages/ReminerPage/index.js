import { Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
// import ApiCalendar from 'react-google-calendar-api';

const ReminerPage = () => {
    const gapi = window.gapi;
    const CLIENT_ID = '153115645135-67620duj9tspjc1qbg7a65p6en7ailf7.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyDo9uZKgEufwCg5gf94OqaahKa0wjeCdm0';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.events";
    const [calendarSrc,setCalendarSrc] = useState('');
    useEffect(()=>{
        gapi.load('client:auth2', () => {
            console.log('loaded client')
            gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES,
            })
      
            gapi.client.load('calendar', 'v3', () => console.log('bam!'))
      
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
              
              var event = {
                'summary': 'Awesome Event!',
                'location': '800 Howard St., San Francisco, CA 94103',
                'description': 'Really great refreshments',
                'start': {
                  'dateTime': '2020-06-28T09:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'end': {
                  'dateTime': '2020-06-28T17:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                  {'email': 'lpage@example.com'},
                  {'email': 'sbrin@example.com'}
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                  ]
                }
              }
      
              var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event,
              })
      
              request.execute(event => {
                console.log(event)
                // window.open(event.htmlLink)
                setCalendarSrc(event.htmlLink);
              })
          
      
            })
          })
       
    },[]);
    return (
        <>
            <Sidebar/>
            <Box>
            <object type="text/html" data={calendarSrc} width="800px" height="600px">
    </object>
            <iframe src={calendarSrc} style={{height:"300px",width:"300px"}}></iframe>
            </Box>
        </>
    )
}

export default ReminerPage;
