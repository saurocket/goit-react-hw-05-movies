import {BaseThunkType, InferActionTypes} from "./strore";
import {moviesAPI} from "../API/API";



export type CastType = {
    character: string,
    name: string,
    profile_path: string,
}



const initialState = {
    isFetch: false,
    cast: [] as [] | Array<CastType>,
    id: 0 as number

}

export const castsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "TOGGLE_FETCHING": {
            return {...state, isFetch: action.value}
        }
        case "UPLOAD_CASTS": {
            return {...state, cast: [...action.payload.cast], id: action.payload.id}
        }
        case "CLEAR_STATE_CAST":{
            return {...state, cast: [], id: 0}
        }
        default:
            return state
    }
}
export const actions = {
    isFetch(value: boolean) {
        return ({type: 'TOGGLE_FETCHING', value} as const)
    },
    uploadCasts(payload: any){
        return({type: 'UPLOAD_CASTS', payload} as const)
    },
    clearStateCast(){
        return({type: 'CLEAR_STATE_CAST'} as const)
    }

}
type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>


export const getCastsfromId = (id: string):ThunkType => {

    return (
        async (dispatch) => {
            dispatch(actions.isFetch(true))
            try {
                const response = await moviesAPI.getCastsById(id)
                if (response.status = 200) {
                    dispatch(actions.uploadCasts(response.data))
                }

            }catch (e) {
                throw e
            }
            finally {
                dispatch(actions.isFetch(false))
            }
        }
    )
}
