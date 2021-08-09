import {BaseThunkType, InferActionTypes} from "./strore";
import {moviesAPI} from "../API/API";



export type ReviewsType = {
    author: string
    content: string,
    created_at: string,
    id:string
}



const initialState = {
    isFetch: false,
    results: [] as [] | Array<ReviewsType>,
    id: 0 as 0 | number

}

export const reviewsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "TOGGLE_FETCHING": {
            return {...state, isFetch: action.value}
        }
        case "UPDATE_RESULTS_REVIEWS": {
            return {...state, results: [...action.payload.results], id: action.payload.id}
        }
        default:
            return state
    }
}
export const actions = {
    isFetch(value: boolean) {
        return ({type: 'TOGGLE_FETCHING', value} as const)
    },
    updateResults(payload: any) {
        return({type: 'UPDATE_RESULTS_REVIEWS', payload} as const)
    }

}
type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>


export const getReviewsfromId = (id: string):ThunkType => {

    return (
        async (dispatch) => {
            dispatch(actions.isFetch(true))
            try {
                const response = await moviesAPI.getReviewsById(id)
                if (response.status = 200) {
                    dispatch(actions.updateResults(response.data))
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
