import { CONTEST_DATA_ERROR, CONTEST_DATA_LOADING, CONTEST_DATA_SET } from "../constants"



const contestReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTEST_DATA_LOADING:
            return {
                loading: true
            }
        case CONTEST_DATA_SET:
            return {
                loading: false,
                data: action.payload
            }
        case CONTEST_DATA_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {}
    }

}

export{
    contestReducer
}