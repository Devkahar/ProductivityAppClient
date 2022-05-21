import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import model from '../../model.json'
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs';
import { Select,MenuItem,Typography,Button,TextField,Box, InputLabel, FormControl} from '@material-ui/core';
// import {    } from '@mui/material';
import { connections as keyPointConnections, POINTS } from '../../helper'
import Layout from '../Layout';
import SelectPose from '../../components/SelectPose';
import correctAudio from '../../assets/correct.mp3';
const drawPoint = (ctx, x, y, r, color = 'rgb(255,255,255)') => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}
const drawLine = (ctx, [mx, my], [tx, ty], color = 'rgb(255,255,255)') => {
    ctx.beginPath()
    ctx.moveTo(mx, my)
    ctx.lineTo(tx, ty)
    ctx.lineWidth = 3
    ctx.strokeStyle = color
    ctx.stroke()
}
let interval,fault =0;
let skeletonColor = 'rgb(255,255,255)'
const poseKey = {
    'Chair': 0,
    'Cobra': 1,
    'Dog': 2,
    'No_Pose': 3,
    'ShoulderStand': 4,
    'Traingle': 5,
    'Tree': 6,
    'Warrior': 7,
}
let startValueIsSet = false;
const GymMode = () => {
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    const [modelIsRunning, setmodelIsRunning] = useState(false);
    const [detector,setDetector] = useState(null);
    const [poseClassifier,setPoseClassifier] = useState(null);
    const [currentPose,setCurrentPose] = useState(null)
    const [startTime,setStartTime] = useState(0);
    const [currentTime,setCurrentTime] = useState(0);
    const [totalTime,setTotalTime] = useState(0);
    const [accuracy,setAccuracy] = useState(0);
    const [currentPoseSet,setCurrentPoseSet] = useState(0);
    const [poseTimeDuration,setposeTimeDuration] = useState(60);
    const [poseSets,setPoseSets] = useState(3);
    const audio1 = new Audio(correctAudio);
    useEffect(async () => {
        setDetector(await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER }));
        setPoseClassifier(await tf.loadLayersModel('https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json'));
    }, [])
    useEffect(()=>{
        if(currentTime==0){ 
            setStartTime(0);
            setTotalTime(0);
            return;
        }
        let time = (currentTime-startTime)/1000;
        setTotalTime(time);
    },[currentTime]);
    useEffect(()=>{
        if(totalTime===poseTimeDuration){
            setCurrentPoseSet(currentPoseSet+1);
            setCurrentTime(0);
            startValueIsSet=false;
        }
    },[totalTime])
    useEffect(()=>{
        setCurrentTime(0);
        setTotalTime(0);
        setStartTime(0);
        startValueIsSet=false;
        if(modelIsRunning){
            stopModelHandler();
        }
    },[currentPose]);
    function get_center_point(landmarks, left_bodypart, right_bodypart) {
        let left = tf.gather(landmarks, left_bodypart, 1)
        let right = tf.gather(landmarks, right_bodypart, 1)
        const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5))
        return center
    }

    function get_pose_size(landmarks, torso_size_multiplier = 2.5) {
        let hips_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
        let shoulders_center = get_center_point(landmarks, POINTS.LEFT_SHOULDER, POINTS.RIGHT_SHOULDER)
        let torso_size = tf.norm(tf.sub(shoulders_center, hips_center))
        let pose_center_new = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
        pose_center_new = tf.expandDims(pose_center_new, 1)

        pose_center_new = tf.broadcastTo(pose_center_new,
            [1, 17, 2]
        )
        // return: shape(17,2)
        let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0)
        let max_dist = tf.max(tf.norm(d, 'euclidean', 0))

        // normalize scale
        let pose_size = tf.maximum(tf.mul(torso_size, torso_size_multiplier), max_dist)
        return pose_size
    }

    function normalize_pose_landmarks(landmarks) {
        let pose_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
        pose_center = tf.expandDims(pose_center, 1)
        pose_center = tf.broadcastTo(pose_center,
            [1, 17, 2]
        )
        landmarks = tf.sub(landmarks, pose_center)

        let pose_size = get_pose_size(landmarks)
        landmarks = tf.div(landmarks, pose_size)
        return landmarks
    }

    function landmarks_to_embedding(landmarks) {
        // normalize landmarks 2D
        landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0))
        let embedding = tf.reshape(landmarks, [1, 34])
        return embedding
    }
    const runMovenet = async () => {
        console.log("MoveNet IS Running");
        if(detector && poseClassifier)
        {
            interval = setInterval(() => {
                detectHumanPose(detector, poseClassifier)
            }, 100);
        }
    }
    const detectHumanPose = async (detector,poseClassifier) => {
        if (typeof (webcamRef.current) !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            console.log("We Are Est Pose Detected");
            const video = webcamRef.current.video;
            const pose = await detector.estimatePoses(video);
            const ctx = canvasRef.current.getContext('2d');
            // console.log(pose[0]);
            try{
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                const keypoints = pose[0].keypoints;
                const inputs = keypoints.map(keypoint => {
                    if (keypoint.score > 0.4) {
                        drawPoint(ctx, keypoint.x, keypoint.y, 4,skeletonColor);
                        try {
                            const connections = keyPointConnections[keypoint.name];
                            connections.map(connection => {
                                const pointName = connection.toUpperCase();
                                const tokeypoint = keypoints[POINTS[pointName]];
                                if (tokeypoint.score > 0.4) drawLine(ctx, [keypoint.x, keypoint.y], [tokeypoint.x, tokeypoint.y],skeletonColor);
                            })
                        } catch (error) {
                            // console.log(error);
                        }
                    }
                    return [keypoint.x, keypoint.y];
                })
                // Done with Drawing And Storing Inputs.
                // Its Time To make Prediction.
                const processedInput = landmarks_to_embedding(inputs)
                const classification =await poseClassifier.predict(processedInput)
                classification.array().then(res =>{
                    console.log(currentPose.name,res[0][poseKey[currentPose.name]]);
                    setAccuracy(parseInt(res[0][poseKey[currentPose.name]]*100));
                    if(res[0][poseKey[currentPose.name]]>0.97){
                        skeletonColor = 'rgb(0,255,0)';
                        if(!startValueIsSet){
                            setStartTime(new Date(Date()).getTime());
                            startValueIsSet=true;
                        }
                        audio1.play();
                        setCurrentTime(new Date(Date()).getTime());
                        fault=0;
                    }else{
                        fault++;
                        if(fault>10){
                            setCurrentTime(0);
                            startValueIsSet= false;
                            skeletonColor = 'rgb(255,255,255)';
                        }
                        
                    }
                });
            } catch (error) {
                // console.log(error);
            }
        } else {
            console.log("Web Cam Not Detected");
        }
    }
    const startModelHandler = () => {
        if(currentPose!==null){
            runMovenet();
            setmodelIsRunning(true);
        }
    };
    const stopModelHandler = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        clearInterval(interval);
        setmodelIsRunning(false);
        setCurrentTime(0);
        startValueIsSet=false;
    }
    const poseTimeHandler = (e) => {
        let time = e.target.value;
        setposeTimeDuration(time);
    }
    const poseSetHandler =(e) => {
        let sets = e.target.value;
        setPoseSets(sets);
    }
    return (
        <Layout>
            <Box className="c-black">
                <Box sx={{display: 'flex', justifyContent: 'space-between',width: '60%'}}>
                    <Typography variant="h4">Pose Time: {totalTime}s</Typography>
                    <Typography variant="h4">Set: {currentPoseSet}</Typography>
                    <Typography variant="h4">Accuracy: {accuracy}</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between',alignItems: 'center',height: '30px',width: '720px',mt:2}}>
                    <Button variant="contained" color="primary" onClick={startModelHandler} disabled={modelIsRunning}>Start Exercise</Button>
                    <Button variant="contained" color="primary" onClick={stopModelHandler} disabled={!modelIsRunning}>Stop Exercise</Button>
                    <Box sx={{width:'150px'}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Pose Time</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={poseTimeDuration}
                                    label="Pose Time"
                                    onChange={poseTimeHandler}
                                    width="100%"
                                >
                                    <MenuItem value={15}>15 sec</MenuItem>
                                    <MenuItem value={30}>30 sec</MenuItem>
                                    <MenuItem value={45}>45 sec</MenuItem>
                                    <MenuItem value={60}>60 sec</MenuItem>
                                    <MenuItem value={120}>120 sec</MenuItem>
                                </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{width:'150px'}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Pose Sets</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={poseSets}
                                    label="Pose poseSet"
                                    onChange={poseSetHandler}
                                    width="100%"
                                >
                                    <MenuItem value={1}>1 Set</MenuItem>
                                    <MenuItem value={3}>3 Set</MenuItem>
                                    <MenuItem value={5}>5 Set</MenuItem>
                                </Select>
                        </FormControl>
                    </Box>
                </Box>
                
            </Box>
            <Box sx={{mt: 6}}>
                <Box>
                    <Box sx={{outline: `15px solid #eee`, height: '480px',width: '640px',position: 'absolute',padding: 0,}}>
                        <Webcam
                            width='640px'
                            height='480px'
                            id="webcam"
                            ref={webcamRef}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                padding: '0px',
                                transform: 'rotateY(180deg)',
                            }}
                        />
                        <canvas
                            ref={canvasRef}
                            id="my-canvas"
                            width='640px'
                            height='480px'
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                zIndex: 1,
                                transform: 'rotateY(180deg)'
                            }}
                        >
                        </canvas>
                    </Box>
                </Box>
                <Box sx={{marginLeft: '688px'}}>
                    <SelectPose currentPose={currentPose} setCurrentPose={setCurrentPose}/>
                </Box>
            </Box>
        </Layout>

    )
}

export default GymMode