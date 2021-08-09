
import {trandsItem} from "../trandsReducer";


export const filteredCards = (arr: Array<trandsItem>) => {
    return arr.filter((item,index, array) => {
        return index === array.findIndex((a => a.id === item.id))
    })
}

