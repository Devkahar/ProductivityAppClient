import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const PageWrapper = (props) => {
    return (
        <>
            <Box sx={{mb:5, textAlign: 'center'}}>
                <Typography className="c-black" variant="h2">{props.pageTitle}</Typography>
            </Box>
            {props.children}
        </>
    )
}

export default PageWrapper
