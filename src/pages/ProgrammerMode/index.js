import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import TaskItem from '../../components/TaskItem'
import Layout from '../Layout'
import PageWrapper from '../Pagewrapper'
/* light Bluilsh Shade #ced2e4 
    purple Shade #d8cbf7
    yellow shade #f3f37b
    offBlue shade #bedce4
*/
const ProgrammerMode = () => {
    const projectData = [
        {name: "Productivity App", description: "Minor Project",bg: '#d8cbf7'},
        {name: "House Price Pridector", description: "Machine Learning Project",bg: '#f3f37b'},
    ]
    const problemData = [
        {name: "A. Problem", description: "Div-2",bg: '#d8cbf7'},
        {name: "B. Problem",description: "Div-3",bg: '#f3f37b'},
    ]
    const links = {
        cpMode: "/cpmode",
        projectMode: "/projectmode",
    }
    return (
        <Layout>
            <PageWrapper pageTitle="Welcome to Programmer Mode">
                <Box>
                    <Grid container className="c-black">
                        <Grid item md={6}>
                            <Link className="extra-links" to={links.projectMode}><Typography variant="h3">Manage Your Projects</Typography></Link>
                            <Box sx={{mt:3,mb:3,p: 1}}>
                                <Typography className="c-black" variant="h4">On Going Projects</Typography>
                                <Box sx={{mt:3}}>
                                    {projectData?.map(e=>(
                                        <TaskItem key={e.name} name={e.name} bg={e.bg} description={e.description}/>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Link  className="extra-links"  to={links.cpMode}><Typography variant="h3">Competitive Programming</Typography></Link>
                            <Box sx={{mt:3,mb:3,p: 1}}>
                                <Typography className="c-black" variant="h4">Problem For Today</Typography>
                                <Box sx={{mt:3}}>
                                    {problemData?.map(e=>(
                                        <TaskItem key={e.name} name={e.name} bg={e.bg} description={e.description}/>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </PageWrapper>
        </Layout>
    )
}

export default ProgrammerMode
