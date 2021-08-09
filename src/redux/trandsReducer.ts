import {BaseThunkType, InferActionTypes} from "./strore";
import {moviesAPI} from "../API/API";
import {filteredCards} from "./selector/filtredCard";


export type trandsItem = {
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    overview: string
    poster_path: string
    release_date: string
    title: string
    vote_average: number
}


const initialState = {
    isFetch: false,
    trands: [] as [] | Array<trandsItem>,
    page: null as null | number,
    filteredMovies: null as null | Array<trandsItem>

}

export const trandsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "TOGGLE_FETCHING": {
            return {...state, isFetch: action.value}
        }
        case "SET_MOVIES": {
            return {...state, trands: filteredCards([...state.trands, ...action.payload.results]), page: action.payload.page}
        }
        case "FILTER_MOVIES_BY_ID": {
            return {...state, filteredMovies: state.trands.filter(item => item.id === action.id)}
        }
        case "CLEAR_FILTER_MOVIES_BY_ID": {
            return {...state, filteredMovies: null}
        }
        default:
            return state
    }
}
export const actions = {
    setMovies(payload: any) {
        return ({type: 'SET_MOVIES', payload} as const)
    },
    isFetch(value: boolean) {
        return ({type: 'TOGGLE_FETCHING', value} as const)
    },
    setCurrentId(id: number){
        return({type: 'FILTER_MOVIES_BY_ID', id} as const)
    },
    clearFilter(){
       return ({type: 'CLEAR_FILTER_MOVIES_BY_ID'} as const)
    }


}
type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>


export const getMovies = (number: any): ThunkType => {
    return (
        async (dispatch) => {
            dispatch(actions.isFetch(true))
            try {
                const response = await moviesAPI.getTrands(number)
                if (response.status = 200) {
                    dispatch(actions.isFetch(false))
                    dispatch(actions.setMovies(response.data))
                }

            }catch (e) {
                dispatch(actions.isFetch(false))
            }

            dispatch(actions.isFetch(false))
        }
    )
}

