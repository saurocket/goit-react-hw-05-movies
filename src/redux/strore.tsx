import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {trandsReducer} from "./trandsReducer";
import {searchReducer} from "./seatchReducer";
import { detailsReducer } from "./detailsReducer";
import {castsReducer} from "./castsReducer";
import {reviewsReducer} from "./reviewsReducer";




let reducers = combineReducers({
    trands: trandsReducer,
    search: searchReducer,
    details: detailsReducer,
    casts: castsReducer,
    reviews: reviewsReducer,
})



type RootReducer = typeof reducers
export type AppStateType = ReturnType<RootReducer>

export type BaseThunkType<A extends Action, R = Promise<void>> =  ThunkAction<R, AppStateType, unknown, A>
export type InferActionTypes<T> = T extends {[key: string]: (...arg:any[]) => infer U } ? U: never

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
));

export type MainStateType  = typeof store

export default store;