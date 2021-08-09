import {BaseThunkType, InferActionTypes} from "./strore";
import {moviesAPI} from "../API/API";


export type ProductionCompany = {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

const initialState = {
    isFetch: false,
    description: {
        backdrop_path: "",
        homepage: "",
        id: 10588,
        original_title: "",
        overview: "",
        poster_path: "",
        production_companies: [] as [] | Array<ProductionCompany>,
        release_date: "",
        title: "The Cat in the Hat",
    }
}

export const detailsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "TOGGLE_FETCHING": {
            return {...state, isFetch: action.value}
        }
        case "SET_MOVIES_DESCRIPTION":{
            return {...state, description: {...action.payload}}
        }
        default:
            return state
    }
}
export const actions = {
    isFetch(value: boolean) {
        return ({type: 'TOGGLE_FETCHING', value} as const)
    },
    setDetails(payload: any){
        return ({type: 'SET_MOVIES_DESCRIPTION', payload} as const)
    }


}
type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>


export const getDetailsInformation = (id:string):ThunkType => {
    return (
        async (dispatch) => {
            dispatch(actions.isFetch(true))
            try {
                const response = await moviesAPI.getDetailsById(id)
                if (response.status = 200) {
                    dispatch(actions.setDetails(response.data))
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
