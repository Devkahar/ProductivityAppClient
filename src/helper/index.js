export const data = {
    urls:{
        contestURL: ''
    }
}

export const getDuration = (dur)=>{
    let Duration = parseInt(dur)/60;
    let str = "";
    if(parseInt(Duration/(24*60))>0){
        str = str.concat(`${parseInt(Duration/(24*60))} Days `);
        // console.log(`${parseInt(Duration/(24*60))} Days `);
        Duration = Duration%(24*60);
    }
    if(parseInt(Duration/60)>0){
        str = str.concat(`${parseInt(Duration/(60))} Hour `);
        // console.log(`${parseInt(Duration/(60))} Hour `);
        Duration =Duration%60;
    }
    if(Duration>0){
        // console.log(`${Duration} mins`);
        str = str.concat(`${Duration} mins`);
    }
    str = str.trimRight();
    return str.length>0?str:'Dev';
}

export const getDate = (selectedDate) =>{
    let date = selectedDate.toString().split(' ');
    date = date[2]+'-'+date[1]+'-'+date[3];
    return date;
}
export const POINTS = {
    NOSE : 0,
    LEFT_EYE : 1,
    RIGHT_EYE : 2,
    LEFT_EAR : 3,
    RIGHT_EAR : 4,
    LEFT_SHOULDER : 5,
    RIGHT_SHOULDER : 6,
    LEFT_ELBOW : 7,
    RIGHT_ELBOW : 8,
    LEFT_WRIST : 9,
    RIGHT_WRIST : 10,
    LEFT_HIP : 11,
    RIGHT_HIP : 12,
    LEFT_KNEE : 13,
    RIGHT_KNEE : 14,
    LEFT_ANKLE : 15,
    RIGHT_ANKLE : 16,
}

export const connections = {
    'nose': ['left_eye','right_eye'],
    'left_eye': ['left_ear'],
    'right_eye': ['right_ear'],
    'left_shoulder':['right_shoulder','left_elbow','left_hip'],
    'right_shoulder':['right_elbow','right_hip'],
    'left_elbow': ['left_wrist'],
    'right_elbow': ['right_wrist'],
    'left_hip': ['right_hip','left_knee'],
    'right_hip': ['right_knee'],
    'right_knee': ['right_ankle'],
    'left_knee': ['left_ankle']
}