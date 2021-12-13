import { Box } from '@material-ui/core'
import { Link, Typography } from '@mui/material'
import React from 'react'

const Timetracker = () => {
    const trackerData = [{name: "Dynamic Prgramming",topic: "Tabulation",timeSpent: "02:30:36"},{name: "Fitness",topic: "Exercise",timeSpent: "01:02:40"},,{name: "Minor Project",topic: "WebSite",timeSpent: "04:21:49"},,{name: "Me time",topic: "Book Reading",timeSpent: "01:12:02"}];
    return (
        <Box>
            <Box sx={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                <Typography className="c-black" variant="h6">Time Tracker</Typography>
                <Link className="extra-links" to="/view">
                    view all 
                </Link>
            </Box>
            <Box>
                {trackerData.map((e,idx)=>(
                    <Box key={e.name} sx={{mt:2}}>
                        <Box  sx={{mb:2,display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                            <Box>
                                <Typography className="c-black" variant="h6">{e.name}</Typography>
                                <Typography  variant="p">{e.topic}</Typography>
                            </Box>
                            <Typography  variant="p">{e.timeSpent}</Typography>
                        </Box>

                       {idx!==(trackerData.length-1) && <hr style={{color: "#eee"}}/>}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Timetracker
