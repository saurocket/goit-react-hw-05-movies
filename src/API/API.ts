import axios from "axios";

 const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
})
const key = `aa22811eea7ebc10d78e05f0b75d5565`

export const moviesAPI = {
     getTrands(page:number) {
         return instance.get(`trending/all/day?api_key=${key}&page=${page}`)
     },
    getSearchMovies(value: string, page: number){
         return instance.get(`search/movie?api_key=${key}&language=en-US&page=${page}&include_adult=false&query=${value}`)
    },
    getDetailsById(id: string){
        return instance.get(`movie/${id}?api_key=${key}&language=en-US`)
    },
    getCastsById(id:string){
        return instance.get(`movie/${id}/credits?api_key=${key}&language=en-US`)
    },
    getReviewsById(id: string){
         return instance.get(`/movie/${id}/reviews?api_key=${key}&language=en-US`)
    }

}










