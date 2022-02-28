import { Container } from '@material-ui/core'
import { Box } from '@mui/material'
import React from 'react'
import Auth from '../../components/Auth'
import Sidebar from '../../components/Sidebar'
import Userprofile from '../../components/Userprofile'
import "./style.css"
const Layout = (props) => {
    return (
        <Box className={'flex-container'}>
            <Sidebar/>
            <Box sx={{display: 'flex',flexDirection: 'column', width: '100%'}}>
                <Container>
                    <Box sx={{p:3,pb:0,pt:2,width: '100%',display: 'flex',flexDirection: 'column', alignItems: 'flex-end',}}>
                        <Auth type='signup' />
                        {/* <Userprofile/> */}
                    </Box>
                    <Box sx={{p:3,pt:1}}>
                    {props.children}
                    </Box>
                    
                </Container>
            </Box>
        </Box>
    )
}
export default Layout;
