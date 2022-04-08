import { Box, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import chairPose from '../../assets/chairPose.jpg'
import cobraPose from '../../assets/cobraPose.jpg'
import trianglePose from '../../assets/trianglePose.jpg'
import dogPose from '../../assets/dogPose.jpg'
import shoulderPose from '../../assets/shoulderPose.jpg'
import treePose from '../../assets/treePose.jpg'
import warriorPose from '../../assets/warriorPose.jpg'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import selectPose from '../../assets/selectPose.jpg'
import "./style.css";
const poseItems = [
    { name: 'Chair', img: chairPose },
    { name: 'Cobra', img: cobraPose },
    { name: 'Dog', img: dogPose },
    { name: 'ShoulderStand', img: shoulderPose },
    { name: 'Traingle', img: trianglePose },
    { name: 'Warrior', img: warriorPose },
    { name: 'Tree', img: treePose }
];
const SelectPose = ({currentPose,setCurrentPose}) => {
    const [toggelItems, setToggelItems] = useState(false);
    const selectPoseHandler = (data) => {
        setToggelItems(false);
        setCurrentPose(data);
    }
    return (
        <Box >
            <Box sx={{ zIndex: '5' }}>
                <Box onClick={() => setToggelItems(!toggelItems)} sx={{ display: 'flex', justifyContent: 'space-evenly', border: "1px solid #eee", height: '130px', width: '350px', p: 3, alignItems: 'center' }}>
                    <Box className="c-black"><Typography variant='h6'>{currentPose? currentPose.name:'Select Pose'}</Typography></Box>
                    {currentPose&&<Box sx={{ height: '120px', width: '150px' }}><img src={currentPose.img} style={{ height: '100%', width: '100%', objectFit: 'contain' }} /></Box>}
                    {toggelItems ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </Box>
                {toggelItems && 
                <Box sx={{ height: '380px', width: '360px', overflow: 'scroll',position: 'absolute'}}>
                    {poseItems.map((pose, idx) => (
                        <Box onClick={() => selectPoseHandler(pose)} key={`${pose.name}-${idx}`} className="item-hover" sx={{ backgroundColor:'#fff',display: 'flex', justifyContent: 'space-evenly', border: "1px solid #eee", height: '130px', width: '350px', p: 3, alignItems: 'center' }}>
                            <Box className="c-black"><Typography variant='h6'>{pose.name}</Typography></Box>
                            <Box sx={{ height: '120px', width: '150px' }}><img src={pose.img} style={{ height: '100%', width: '100%', objectFit: 'contain' }} /></Box>
                        </Box>
                    ))}
                </Box>}
            </Box>
            <Box sx={{ zIndex: '1', height: '500px', width: '400px' }}>
                {currentPose&& <img src={currentPose.img} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />}
            </Box>
        </Box>
    )
}

export default SelectPose