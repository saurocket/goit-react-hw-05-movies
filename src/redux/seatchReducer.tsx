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
    movies: [] as [] | Array<trandsItem>,
    filteredMovies: [] as [] | Array<trandsItem>,
    totalPages: null as null | number,
    page: null as null | number,
    totalResults: null as null | number,
    searchValue: ''

}

export const searchReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "TOGGLE_FETCHING": {
            return {...state, isFetch: action.value}
        }
        case "SET_MOVIES_BY_QUERY": {
            return {...state,
                movies: filteredCards([...state.movies, ...action.payload.results]) ,
                page: action.payload.page,
                totalPages: action.payload.total_pages,
                totalResults: action.payload.total_results}
        }
        case "SET_QUERY": {
            return {...state, searchValue: action.value}
        }
        case "CLEAR_ARRAY_MOVIES": {
            return {...state, movies: []}
        }
        case "FILTER_MOVIES_BY_ID": {
            return {...state, filteredMovies: state.movies.filter(item => item.id === action.id)}
        }
        default:
            return state
    }
}
export const actions = {
    setMoviesByQuery(payload: any) {
        return ({type: 'SET_MOVIES_BY_QUERY', payload} as const)
    },
    querySearch(value: string){
        return ({type: 'SET_QUERY', value} as const)
    },
    isFetch(value: boolean) {
        return ({type: 'TOGGLE_FETCHING', value} as const)
    },
    clerarMovies(){
        return ({type: 'CLEAR_ARRAY_MOVIES'} as const)
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


export const getMoviesFromInput = (value: string, page = 1):ThunkType => {

    return (
        async (dispatch) => {
            dispatch(actions.isFetch(true))
            try {
                const response = await moviesAPI.getSearchMovies(value, page)
                if (response.status = 200) {
                    dispatch(actions.setMoviesByQuery(response.data))
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
